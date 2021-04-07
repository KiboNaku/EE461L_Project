from flask import Flask, jsonify, request
from bson import json_util
from base import db


class Tag(db.Document):
    tag_name = db.StringField(required=True)
    # limit number of types somewhere
    tag_type = db.StringField(required=True)


class Project(db.Document):
    project_name = db.StringField(required=True, max_length=50)
    owner = db.ReferenceField("User", required=True)
    contributors = db.ListField(db.ReferenceField("User"))
    created_time = db.DateTimeField()
    last_edited_time = db.DateTimeField()
    description = db.StringField(max_length=1000)
    tags = db.ListField(db.ReferenceField("Tag"))
    total_cost = db.FloatField(required=True)
    wishlisted_hardware = db.ListField(db.ReferenceField("RentRecord"))
    rented_hardware = db.ListField(db.ReferenceField("RentRecord"))

    def to_json(self):

        json_data = {
            "id": str(self.pk),
            "name": self.project_name,
            "owner": self.owner.username,
            "created_time": str(self.created_time),
            "last_edited_time": str(self.last_edited_time),
            "description": self.description,
            "total_cost": self.total_cost,
            "contributers": self.contributors,
            "tags": json_util.dumps(self.tags),
            "wishlisted_hardware": self.wishlisted_hardware,
            "rented_hardware": self.rented_hardware
        }

        return json_data
