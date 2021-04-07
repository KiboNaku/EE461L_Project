
from flask import Flask, jsonify, request
from base import db


class Address(db.Document):
    first_name = db.StringField(required=True)
    last_name = db.StringField(required=True)
    phone_number = db.StringField(required=True)
    line1 = db.StringField(required=True)
    line2 = db.StringField()
    city = db.StringField(required=True)
    state = db.StringField(required=True)
    zipcode = db.IntField(required=True)
    default = db.BooleanField(required=True)


class PaymentInformation(db.Document):
    first_name = db.StringField(required=True)
    last_name = db.StringField(required=True)
    card_number = db.StringField(required=True)
    expiration_month = db.IntField(required=True)
    expiration_year = db.IntField(required=True)


class RentRecord(db.Document):
    # user, hardware, date rented out, date expiring
    user = db.ReferenceField("User", required=True)
    hardware = db.ReferenceField("Hardware", required=True)
    amount = db.IntField(required=True)
    date_rented = db.DateTimeField(required=True)
    date_expired = db.DateTimeField(required=True)


class User(db.Document):
    username = db.StringField(required=True)
    email = db.EmailField(required=True)
    password = db.StringField(required=True)
    rented_hardware = db.ListField(db.ReferenceField("RentRecord"))
    # cross reference list to project, one as owner, and one as contributor
    owned_projects = db.ListField(db.ReferenceField("Project"))
    contributed_projects = db.ListField(db.ReferenceField("Project"))
    # profile pic?
    # cross reference to billing, shipping address and payment info
    billing_addr = db.ReferenceField("Address")
    shipping_addr = db.ReferenceField("Address")
    payment_info = db.ReferenceField("PaymentInformation")

    # TODO: encrypt password

    def to_json(self):
        return {
            "username": self.first_name,
            "email": self.email,
            "password": self.password
        }
