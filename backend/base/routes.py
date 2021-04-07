from models.user import RentRecord
from flask import Flask, jsonify, request
from base import app, db
from models.user import User
from models.project import Project
from models.hardware import Hardware
import json
import jwt
import datetime
from functools import wraps


def token_required(function):
    @wraps(function)
    def decorated(*args, **kwargs):
        token = request.get_json()["token"]

        if not token:
            app.logger.debug("Token is missing")
            return jsonify({'error': 'Token is missing!'}), 403

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'])
        except Exception as e:
            app.logger.debug("Token is invalid", e)
            return jsonify({'error': 'Token is invalid!'}), 403

        return function(*args, **kwargs, token_data=data)

    return decorated


@app.route("/api/validate-token", methods=["POST"])
@token_required
def validate_token(token_data):
    r_val = {"email": None, "success": 0, "error": None}
    return r_val


@app.route("/api/register", methods=["POST"])
def register():

    #     # initialize return value
    r_val = {"email": None, "success": 0, "error": None}

#     # get user info
#     validator, user = User.get_json()
    record = request.get_json()
    exist_email = User.objects(email=record['email']).first()
    exist_username = User.objects(username=record['username']).first()

    if not exist_email and not exist_username:
        user = User(
            username=record["username"],
            email=record["email"],
            password=record["password"],
        )
        user.save()
    else:
        r_val["success"] = -1
        if exist_email:
            r_val["error"] = "An account with the email already exists."
        else:
            r_val["error"] = "An account with the username already exists."

    return r_val


@app.route("/api/login", methods=["POST"])
def login():

    # initialize return value
    r_val = {"success": 0, "error": None, "token": None}

#     # get args from front end
    record = json.loads(request.data)
    user = User.objects(email=record['email']).first()

    if not user:
        r_val["success"] = -1
        r_val["error"] = "Invalid email. No account exists."
    else:
        if record["password"] != user["password"]:
            r_val["success"] = -1
            r_val["error"] = "Invalid email and password combination."
        else:
            token = jwt.encode(
                {
                    'user': user["username"],
                    'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)
                },
                app.config['SECRET_KEY'])
            r_val["token"] = token.decode('UTF-8')

    return r_val


@app.route("/api/logout", methods=["POST"])
def logout():
    # TODO: consider making a list of blacklisted tokens for logged out users
    pass


@app.route("/api/fetch-project", methods=["GET"])
def fetch_project():
    project_list = Project.objects()
    projects = []
    for project in project_list:
        projects.append(project.to_json())

    result = {"projects": projects}

    return result


@app.route("/api/join-project", methods=["POST"])
@token_required
def join_project(token_data):
    r_val = {"success": 0, "error": None}
    data = json.loads(request.data)
    user = User.objects(username=token_data['user']).first()
    project_request = data.get("project")
    project = Project.objects(id=project_request['id']).first()

    if not project:
        r_val["success"] = -1
        r_val["error"] = "No project found."
    elif not user:
        r_val["success"] = -1
        r_val["error"] = "No user found."
    else:
        project.update(add_to_set__contributors=[user])

    return r_val


@app.route("/api/fetch-hardware", methods=["GET"])
def fetch_hardware():
    hardware_list = Hardware.objects()

    hardware_sets = []
    for hardware in hardware_list:
        hardware_sets.append(hardware.to_json())

    result = jsonify({"HWSets": hardware_sets})
    return result


@app.route("/api/fetch-user-projects", methods=["POST"])
@token_required
def fetch_user_projects(token_data):

    r_val = {"error": None, "owned_projects": [], "contr_projects": []}
    user = User.objects(username=token_data['user']).first()
    owned_projects = user.owned_projects
    contr_projects = user.contributed_projects

    for project in owned_projects:
        r_val["owned_projects"].append(project.to_json())

    for project in contr_projects:
        r_val["contr_projects"].append(project.to_json())

    return r_val

# the below function is what i worked on
# it seems to effectively rent out hw to the logged in user but does not save the changed hw available count
# also, we need to implement a way for users to return hardware that they rent out, currently they
# will own that hardware indefinitely
@app.route("/api/rent-hardware", methods=["POST"])
@token_required
def rent_hardware(token_data):
    first = True
    hardware_list = Hardware.objects()  # This all works from what i can tell
    r_val = {"success": 0, "error": None, "data": ""}
    hardware = request.get_json()["hardware"]
    user = User.objects(username=token_data['user']).first()
    r_val["data"] = "User " + str(user.username) + " rented the following hardware:"
    if user:
        for ware in range(5):
            check = "HWSet" + str(ware + 1)
            if(int(hardware[check]) > 0):
                if(int(hardware[check]) <= int(hardware_list[ware].available_count)):
                    if not first:
                        r_val["data"] += ", " + hardware[check] + " of " + check
                    else: 
                        r_val["data"] += " " + hardware[check] + " of " + check
                        first = False
                record = RentRecord(
                    user=token_data["user"],
                    hardware=check,
                    amount=hardware[check],
                    date_rented=datetime.date.today(),
                    date_expired=datetime.date.today()  # this should be edited to a future date, maybe
                )                                       # a month from today 
                record.save()
                user.update(add_to_set__rented_hardware=[record.to_dbref()])
                hardware_list[ware].available_count -= int(hardware[check])
                # currently does not accurately save the new hardware availability
    return r_val


@app.route("/api/add-project", methods=["POST"])
@token_required
def add_project(token_data):
    r_val = {"error": None}
    project = request.get_json()["project"]

    user = User.objects(username=token_data['user']).first()
    if user:
        project = Project(
            project_name=project["name"],
            owner=user.to_dbref(),
            description=project["description"],
            tags=project["tags"]
        )
        # TODO: add hardware references and find total cost
        project.total_cost = 0
        project.save()

        user.update(add_to_set__owned_projects=[project.to_dbref()])
        return r_val

    else:
        app.logger.debug("Username is invalid. Could not add project.")
        r_val["error"] = "Username is invalid"
        return r_val, 403


@app.route("/api/user-info", methods=["POST"])
@token_required
def user_info(token_data):
    user_request = token_data["user"]
    user = User.objects(username=user_request).first()
    return {"user": user.to_json()}
