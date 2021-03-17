from flask import Flask, jsonify, request
from base import app, mongo
from models.user import User

@app.route("/api/register", methods=["POST"])
def register():

    # initialize return value
    r_val = {"email": None, "success": 0, "error": None}

    # get user info
    user = User.get_json()

    # debug: print to screen
    app.logger.debug("Received register for: {first_name} {last_name} with email {email}".format(
        first_name = user['first_name'], last_name=user['last_name'], email=user["email"])
    )

    # TODO: check to see if email exists

    # add user to database
    users_collection = mongo.db.user
    users_collection.insert_one(user)

    return r_val


@app.route("/api/login", methods=["POST"])
def login():

    # initialize return value
    r_val = {"email": None, "success": 0, "error": None}

    # get args from front end
    email = request.get_json()["email"]
    password = request.get_json()["password"]

    r_val["email"] = email

    # debug: print to screen
    app.logger.debug("Received login for: {email}".format(email=email))

    return r_val
