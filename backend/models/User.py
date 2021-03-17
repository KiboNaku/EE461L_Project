from flask import Flask, jsonify, request

class User:
    def get_json():

        # get args from front end
        first_name = request.get_json()["firstName"]
        last_name = request.get_json()["lastName"]
        email = request.get_json()["email"]
        password = request.get_json()["password"]

        # TODO: encrypt password
        
        return {
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "password": password,
        }
