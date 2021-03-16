from flask import Flask, jsonify, request
from bcr
import uuid

class User:
    def signup(self, first_name, last_name, email, password):

        # get args from front end
        first_name = request.get_json()["firstName"]
        last_name = request.get_json()["lastName"]
        email = request.get_json()["email"]
        password = request.get_json()["password"]

        # create user object
        user = {
            "_id": uuid.uuid4.hex,
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "password": password,
        }

        # encrypt password

        
        return jsonify(user), 200
