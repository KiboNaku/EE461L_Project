from flask import Flask, jsonify, request
from bson import json_util
from base import db
from .user import User
from .hardware import Hardware


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
        data = self.to_mongo()
        data["owner"] = {
            "User": {
                "first_name": self.owner.first_name,
                "last_name": self.owner.last_name
            }
        }

        # I don't actually know if this works 
        for contributor in data["contributors"]:
            contributor = {
                "User": {
                    "first_name": contributor.first_name,
                    "last_name": contributor.last_name
                }
            }
        
        # write out details for hardware sets 

        return json_util.dumps(data)
