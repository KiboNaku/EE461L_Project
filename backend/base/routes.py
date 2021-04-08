from models.user import RentRecord
from flask import Flask, jsonify, request
from base import app, db
from models.user import User, RentRecord
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


@app.route("/api/fetch-user-hardware", methods=["POST"])
@token_required
def fetch_user_hardware(token_data):

    r_val = {"error": None, "rented_hardware": []}
    user = User.objects(username=token_data['user']).first()
    rented = user.rented_hardware

    for r in rented:
        r_val["rented_hardware"].append(
            r.to_json()
        )

    return r_val


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

@app.route("/api/rent-hardware", methods=["POST"])
@token_required
def rent_hardware(token_data):
    first = True
    hardware_list = Hardware.objects() 
    r_val = {"success": 0, "error": None, "data": ""}
    wanted_hardware = request.get_json()["hardware"]
    user = User.objects(username=token_data['user']).first()
    r_val["data"] = "User " + str(user.username) + " rented the following hardware:"
    if user:
        if(enough_available_hardware(wanted_hardware)):
            for ware in range(5):
                check = "HWSet" + str(ware + 1)
                if(int(wanted_hardware[check]) > 0):
                    if not first:
                        r_val["data"] += ", " + wanted_hardware[check] + " of " + check
                    else: 
                        r_val["data"] += " " + wanted_hardware[check] + " of " + check
                        first = False

                    hw = Hardware.objects(hardware_name=check).first()
                    old_record = RentRecord.objects(hardware=hw.pk, user=user.pk).first()
                    print(old_record)
                    if old_record != None:
                        old_value = old_record.amount
                        old_record.update(set__amount=old_value + int(wanted_hardware[check]))
                        old_record.save()
                    else:
                        today = datetime.date.today()
                        expiration = datetime.date(today.year + (today.month + 6)//12, (today.month + 6) % 12, today.day)
                        record = RentRecord(
                            user=user.to_dbref(),
                            hardware=Hardware.objects(hardware_name=check).first().to_dbref(),
                            amount=wanted_hardware[check],
                            date_rented=today,
                            date_expired=expiration
                        )
                        record.save()
                        user.update(add_to_set__rented_hardware=[record.to_dbref()])
                    hwset = Hardware.objects(hardware_name=check).first()
                    hwset.update(set__available_count=hardware_list[ware].available_count - int(wanted_hardware[check]))
                    hwset.reload()
        else:
            r_val["success"] = -1
            r_val["error"] = "You cannot rent more hardware than is currently available."
            return r_val
        return r_val

def enough_available_hardware(hardware):
    hardware_list = Hardware.objects()
    for ware in range(5):
        check = "HWSet" + str(ware + 1)
        if int(hardware[check]) > int(hardware_list[ware].available_count):
            return False
    return True

@app.route("/api/return-hardware", methods=["POST"])
@token_required # DO NOT TRUST THIS FUNCTION!!!! It is currently broken
def return_hardware(token_data):
    return_hardware = request.get_json()["hardware"]
    hardware_list = Hardware.objects()
    r_val = { "success": 0, "error": None }
    user = User.objects(username=token_data['user']).first()
    if user:
        user_hw = get_user_hw(user)
        print(user_hw)
        for hardware in return_hardware:
            # the following lines are a huge issue. they increase the num of hw the user has each time, idk why
            print("user has " + str(user_hw[int(get_hardware_digit(hardware))-1]) + " of " + hardware)
            if int(return_hardware[hardware]) <= user_hw[int(get_hardware_digit(hardware))-1]:
                hardware_list[int(get_hardware_digit(hardware))-1].update(set__available_count=
                    hardware_list[int(get_hardware_digit(hardware))]
                    .available_count + int(return_hardware[hardware]))
                hw = Hardware.objects(hardware_name=hardware).first()
                old_record = RentRecord.objects(hardware=hw.pk, user=user.pk).first()
                old_record.update(set__amount=user_hw[int(get_hardware_digit(hardware))-1] - int(return_hardware[hardware]))
                old_record.reload()
            else:
                r_val["success"] = -1
                r_val["error"] = "You cannot rent more hardware than is currently available."
                return r_val
    return r_val

def get_user_hw(user):  # may be wrong
    rented = user.rented_hardware
    user_hw = [0, 0, 0, 0, 0]
    for r in rented:
        digit = get_hardware_digit(r)
        user_hw[int(digit)] += r.amount
    return user_hw

def get_hardware_digit(r):  # may be wrong
    print(r)
    for char in r:
        if char.isdigit():
            print(char)
            return char
    return 0

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


@app.route("/api/fetch-project-info", methods=["POST"])
def fetch_project_info():
    project_id = request.get_json()["project_id"]
    project = Project.objects(pk=project_id).first()
    return {"project": project.to_json()}
