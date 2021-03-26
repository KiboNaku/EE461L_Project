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
            return jsonify({'error' : 'Token is missing!'}), 403

        try: 
            data = jwt.decode(token, app.config['SECRET_KEY'])
        except:
            return jsonify({'error' : 'Token is invalid!'}), 403

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

    result = jsonify({"projects": projects})

    return result


@app.route("/api/join-project", methods=["POST"])
def join_project():
    r_val = {"success": 0, "error": None}

    user_request = json.loads(request.data["user"])
    user = User.objects(email=user_request['email']).first()
    project_request = json.loads(request.data["project"])
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


@app.route("/api/fetch-hardware", methods=["POST"])
def fetch_hardware():
    hardware_list = Hardware.objects()

    hardware_sets = []
    for hardware in hardware_list:
        hardware_sets.append(hardware.to_json())

    result = jsonify({"HWSets": hardware_sets})
    return result
