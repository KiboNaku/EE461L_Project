from flask import Flask, jsonify, request
from base import app, db
from models.user import User
from models.project import Project
import json


@app.route("/api/register", methods=["POST"])
def register():

    #     # initialize return value
    r_val = {"email": None, "success": 0, "error": None}

#     # get user info
#     validator, user = User.get_json()
    record = json.loads(request.data)
    app.logger.debug(record)
    exist_user = User.objects(email=record['email']).first()

    if not exist_user:
        user = User(
            username=record["username"],
            email=record["email"],
            password=record["password"],
        )
        user.save()
    else:
        r_val["success"] = -1
        r_val["error"] = "An account with the email already exists."


#     # debug: print to screen
#     app.logger.debug("Received register for: {first_name} {last_name} with email {email}".format(
#         first_name = user['first_name'], last_name=user['last_name'], email=user["email"])
#     )

#     # add user to database
#     users_collection = mongo.db.user

#     # TODO: check to see if email exists
#     found_user = users_collection.find_one(validator)
#     app.logger.debug("found user {user}".format(user=found_user))
#     if found_user:
#         r_val["success"] = -1
#         r_val["error"] = "An account with the email already exists."
#     else:
#         users_collection.insert_one(user)

    return r_val


@app.route("/api/login", methods=["POST"])
def login():

    # initialize return value
    r_val = {"success": 0, "error": None}

#     # get args from front end
#     validator, user = User.get_json()
    record = json.loads(request.data)
    user = User.objects(email=record['email']).first()
    # app.logger.debug(record["password"])

#     # debug: print to screen
#     app.logger.debug("Received login for: {email}".format(email=user["email"]))

#     # check if email exists and if password correct
#     found_user = mongo.db.user.find_one(validator)
#     app.logger.debug("user=", user, "found_user=", found_user)
#     if found_user:
#         if found_user["password"] != user["password"]:
#             r_val["success"] = -1
#             r_val["error"] = "Invalid email and password combination."

#     else:
#         r_val["success"] = -1
#         r_val["error"] = "Invalid email. No account exists."

    if not user:
        r_val["success"] = -1
        r_val["error"] = "Invalid email. No account exists."
    else:
        if record["password"] != user["password"]:
            r_val["success"] = -1
            r_val["error"] = "Invalid email and password combination."

    return r_val


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
