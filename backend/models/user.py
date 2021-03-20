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
from .hardware import Hardware


class User(db.Document):
    username = db.StringField(required=True)
    email = db.EmailField(required=True)
    password = db.StringField(required=True)
    # fix dictfield input
    rented_hardware = db.ListField(db.ReferenceField(RentRecord))
    # cross reference list to project, one as owner, and one as contributor
    # profile pic?
    # cross reference to billing, shipping address and payment info

    # TODO: encrypt password

    def to_json(self):
        return {
            "username": self.first_name,
            "email": self.email,
            "password": self.password
        }


class Address(db.Document):
    pass


class PaymentInformation(db.Document):
    pass


class RentRecord(db.Document):
    # user, hardware, date rented out, date expiring 
    pass
