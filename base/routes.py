from models.user import RentRecord
from flask import Flask, jsonify, request
from base import app, db
from models.user import User, RentRecord
from models.project import AssignedRecord, Project, Tag
from models.hardware import Hardware
from models.dataset import Dataset
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
    r_val = {"token": None, "success": 0, "error": None}

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
        r_val["token"] = create_token(record["username"])
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
            r_val["token"] = create_token(user["username"])

    return r_val


def create_token(username):
    token = jwt.encode(
                {
                    'user': username,
                    'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)
                },
                app.config['SECRET_KEY'])
    return token.decode('UTF-8')


@app.route("/api/logout", methods=["POST"])
def logout():
    # TODO: consider making a list of blacklisted tokens for logged out users
    return {}


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
    # print(project["contributors"])
    if not project:
        r_val["success"] = -1
        r_val["error"] = "No project found on query."
    elif not user:
        r_val["success"] = -1
        r_val["error"] = "No user found."
    else:
        if project["owner"] == user:
            r_val["success"] = -1
            r_val["error"] = "You are the owner of the project."
        elif user in project["contributors"]:
            # print("here")
            r_val["success"] = -1
            r_val["error"] = "You are already a contributor of the project."
        else:
            project.update(add_to_set__contributors=[user])
            user.update(add_to_set__contributed_projects=[project])

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
    wanted_list = wanted_hardware["rentHardware"]
    user = User.objects(username=token_data['user']).first()
    r_val["data"] = "User " + str(user.username) + \
        " rented the following hardware:"
    if user:
        if(enough_available_hardware(wanted_list)):
            for i, hardware in enumerate(hardware_list):
                name = hardware.hardware_name
                digit = i
                if(int(wanted_list[digit]) > 0):
                    if not first:
                        r_val["data"] += ", " + \
                            wanted_list[digit] + " of " + name
                    else:
                        r_val["data"] += " " + \
                            wanted_list[digit] + " of " + name
                        first = False
                    hw = Hardware.objects(hardware_name=name).first()
                    old_record = RentRecord.objects(
                        hardware=hw.pk, user=user.pk).first()
                    if old_record != None:
                        old_value = old_record.amount
                        old_record.update(
                            set__amount=old_value + int(wanted_list[digit]))
                        old_record.save()
                    else:
                        today = datetime.date.today()
                        expiration = datetime.date(
                            today.year + (today.month + 6)//12, (today.month + 6) % 12, today.day)
                        record = RentRecord(
                            user=user.to_dbref(),
                            hardware=Hardware.objects(
                                hardware_name=name).first().to_dbref(),
                            amount=wanted_list[digit],
                            date_rented=today,
                            date_expired=expiration
                        )
                        record.save()
                        user.update(add_to_set__rented_hardware=[
                                    record.to_dbref()])
                    hwset = Hardware.objects(hardware_name=name).first()
                    hwset.update(
                        set__available_count=hardware_list[digit].available_count 
                            - int(wanted_list[digit]))
                    hwset.reload()
        else:
            r_val["success"] = -1
            r_val["error"] = "You cannot rent more hardware than is currently available."
            return r_val
    return r_val


def enough_available_hardware(asked):
    hardware_list = Hardware.objects()
    for i, hardware in enumerate(hardware_list):
        if int(asked[i]) > int(hardware.available_count):
            return False
    return True


@app.route("/api/return-hardware", methods=["POST"])
@token_required
def return_hardware(token_data):
    full_return = request.get_json()["hardware"]
    return_hardware =full_return["returnHW"]
    print(return_hardware)
    hardware_list = Hardware.objects()
    r_val = {"success": 0, "error": None}
    user = User.objects(username=token_data['user']).first()
    if user:
        user_hw = get_user_hw(user)
        for i, hardware in enumerate(return_hardware):
            if int(return_hardware[hardware]) > 0:
                if int(return_hardware[hardware]) <= user_hw[hardware]:
                    found_hardware = Hardware.objects(hardware_name=hardware).first()
                    # print(found_hardware)
                    # print(found_hardware.hardware_name)
                    found_hardware.update(set__available_count=found_hardware
                        .available_count + int(return_hardware[hardware]))
                    # hw = Hardware.objects(hardware_name=hardware).first()
                    record = RentRecord.objects(
                        hardware=found_hardware.pk, user=user.pk).first()
                    record.update(set__amount=user_hw[hardware] - int(return_hardware[hardware]))
                    record.reload()
                else:
                    r_val["success"] = -1
                    r_val["error"] = "You cannot return more hardware than you own."
                    return r_val
    return r_val


def get_user_hw(user):
    hardware_list = Hardware.objects()
    rented = user.rented_hardware
    user_hw = {}
    for hardware in hardware_list:
        user_hw[hardware.hardware_name] = 0
    for r in rented:
        user_hw[r.hardware.hardware_name] = r.amount
    return user_hw

@app.route("/api/fetch-datasets", methods=["GET"])
def fetch_datasets():
    dataset_list = Dataset.objects()

    datasets = []
    for dataset in dataset_list:
        datasets.append(dataset.to_json())

    result = jsonify({"Datasets": datasets})
    return result


@app.route("/api/add-project", methods=["POST"])
@token_required
def add_project(token_data):
    r_val = {"error": None, "id": ""}
    project = request.get_json()["project"]

    print(project["tags"])
    user = User.objects(username=token_data['user']).first()
    if user:
        tags = []
        for tag in project["tags"]:
            t = Tag(
                tag_name=tag,
                tag_type="1"
            )
            t.save()
            tags.append(t)
        print(tags)
        project = Project(
            project_name=project["name"],
            owner=user.to_dbref(),
            description=project["description"],
            tags=tags
            # tags=project["tags"]
        )
        # TODO: add hardware references and find total cost
        project.total_cost = 0
        project.save()

        r_val["id"] = str(project.id)

        user.update(add_to_set__owned_projects=[project.to_dbref()])
        return r_val

    else:
        app.logger.debug("Username is invalid. Could not add project.")
        r_val["error"] = "Username is invalid"
        return r_val, 403

@app.route("/api/remove-project", methods=["POST"])
@token_required
def remove_project(token_data):
    r_val = {"error": None, "id": ""}
    p_id = request.get_json()["id"]
    user = User.objects(username=token_data['user']).first()
    project = Project.objects(pk=p_id).first()

    if user and project.owner.username == token_data['user']:
        # project.owner.

        contrs = project.contributors




        project.delete()
        return r_val
    else:
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


@app.route("/api/assign-hardware", methods=["POST"])
@token_required
def assign_hardware(token_data):
    r_val = {"success": 0, "error": None}
    data = json.loads(request.data)
    user = User.objects(username=token_data['user']).first()
    assign_record = data.get("records")

    if not user:
        r_val["success"] = -1
        r_val["error"] = "No user found."
    else:
        project = Project.objects(pk=assign_record["project"]["id"]).first()
        hardware = Hardware.objects(hardware_name=assign_record["hw"]["name"]).first()
        rent_record = RentRecord.objects(user=user, hardware=hardware).first()
        amount = int(assign_record["amount"])
        if rent_record.amount < amount:
            r_val["success"] = -1
            r_val["error"] = "Not enough hardware to assign"
        else:
            existing_record = AssignedRecord.objects(project=project, hardware=hardware).first()
            num = 0
            if not existing_record:
                r = AssignedRecord(
                    # user=user,
                    project=project,
                    hardware=hardware,
                    amount=amount
                )
                r.save()
                project.update(add_to_set__rented_hardware=[r])
            else:
                num = existing_record.amount
                existing_record.update(set__amount=amount+num)
            old_amount = rent_record.amount
            rent_record.update(set__amount=old_amount-amount)

    return r_val

@app.route("/api/unassign-hardware", methods=["POST"])
@token_required
def unassign_hardware(token_data):
    r_val = {"success": 0, "error": None}
    data = json.loads(request.data)
    user = User.objects(username=token_data['user']).first()
    assign_record = data.get("records")

    if not user:
        r_val["success"] = -1
        r_val["error"] = "No user found."
    else:
        project = Project.objects(pk=assign_record["project"]["id"]).first()
        hardware = Hardware.objects(hardware_name=assign_record["hw"]["name"]).first()

        rent_record = RentRecord.objects(user=user, hardware=hardware).first()
        
        amount = int(assign_record["amount"])
        # if rent_record.amount < amount:
        #     r_val["success"] = -1
        #     r_val["error2"].append(record["project"])
        #else:
        existing_record = AssignedRecord.objects(project=project, hardware=hardware).first()
        num = 0
        if not existing_record:
                r_val["success"] = -1
                r_val["error"] = "Hardware isn't assigned to this project"
        else:
            if existing_record.amount < amount:
                r_val["success"] = -1
                r_val["error"] = "Not enough hardware to unassign"
            else:
                num = (existing_record.amount - amount)
                existing_record.update(set__amount=num)
                old_amount = rent_record.amount
                rent_record.update(set__amount=old_amount+amount)
            
    return r_val