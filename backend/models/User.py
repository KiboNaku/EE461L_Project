from flask import Flask, jsonify, request

class User:
    def get_json():

        # get args from front end
        first_name = request.get_json().get("firstName", None)
        last_name = request.get_json().get("lastName", None)
        email = request.get_json().get("email", None)
        password = request.get_json().get("password", None)

        # TODO: encrypt password
        
        return {
            "email": {"$regex": email}
        }, {
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "password": password,
        }
