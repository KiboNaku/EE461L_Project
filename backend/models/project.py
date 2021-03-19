from flask import Flask, jsonify, request
from base import db
from user import User

class Project(db.Document):

    project_name = db.StringField(required=True, max_length=50)
    owner = db.ReferenceField(User, required=True)
    contributors = db.ListField(db.ReferenceField(User))
    created_time = db.DateTimeField()
    last_edited_time = db.DateTimeField()
    description = db.StringField(max_length=1000)
    tags = db.ListField(db.StringField(max_length=20))
    total_cost = db.FloatField(required=True)
    rented_hardware = db.ListField(db.ReferenceField(Hardware))

    def to_json(self):
        return {
            "project_name": self.project_name,
        }


class Hardware(db.Document):
    pass