# from flask import Flask, jsonify, request

# class User:
#     def get_json():

#         # get args from front end
#         first_name = request.get_json().get("firstName", None)
#         last_name = request.get_json().get("lastName", None)
#         email = request.get_json().get("email", None)
#         password = request.get_json().get("password", None)


#         return {
#             "email": {"$regex": email}
#         }, {
#             "first_name": first_name,
#             "last_name": last_name,
#             "email": email,
#             "password": password,
#         }

from flask import Flask, jsonify, request
from base import db
from project import Project

class User(db.Document):
    first_name = db.StringField(required=True)
    last_name = db.StringField(required=True)
    email = db.EmailField(required=True)
    password = db.StringField(required=True)
    projects = db.ListField(db.ReferenceField(Project))

    # TODO: encrypt password

    def to_json(self):
        return {
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "password": self.password
        }
