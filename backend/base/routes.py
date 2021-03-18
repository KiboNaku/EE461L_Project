from flask import Flask, jsonify, request
from base import app, mongo
from models.user import User

@app.route("/api/register", methods=["POST"])
def register():

    # initialize return value
    r_val = {"email": None, "success": 0, "error": None}

    # get user info
    validator, user = User.get_json()

    # debug: print to screen
    app.logger.debug("Received register for: {first_name} {last_name} with email {email}".format(
        first_name = user['first_name'], last_name=user['last_name'], email=user["email"])
    )

    # add user to database
    users_collection = mongo.db.user

    # TODO: check to see if email exists
    found_user = users_collection.find_one(validator)
    app.logger.debug("found user {user}".format(user=found_user))
    if found_user:
        r_val["success"] = -1
        r_val["error"] = "An account with the email already exists."
    else:
        users_collection.insert_one(user)

    return r_val


@app.route("/api/login", methods=["POST"])
def login():

    # initialize return value
    r_val = {"success": 0, "error": None}

    # get args from front end
    validator, user = User.get_json()

    # debug: print to screen
    app.logger.debug("Received login for: {email}".format(email=user["email"]))

    # check if email exists and if password correct
    found_user = mongo.db.user.find_one(validator)
    app.logger.debug("user=", user, "found_user=", found_user)
    if found_user:
        if found_user["password"] != user["password"]:
            r_val["success"] = -1
            r_val["error"] = "Invalid email and password combination."

    else:
        r_val["success"] = -1
        r_val["error"] = "Invalid email. No account exists."

    return r_val
