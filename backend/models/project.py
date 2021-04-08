from flask import Flask, jsonify, request
from bson import json_util
from base import db


class Tag(db.Document):
    tag_name = db.StringField(required=True)
    # limit number of types somewhere
    tag_type = db.StringField(required=True)

    def to_json(self):
        return {
            "name": self.tag_name,
            "type": self.tag_type
        }


class AssignedRecord(db.Document):
    project = db.ReferenceField("Project", required=True)
    hardware = db.ReferenceField("Hardware", required=True)
    amount = db.IntField(required=True)

    def to_json(self):
        return {
            "hw_name": self.hardware.hardware_name,
            "amount": self.amount
        }


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
    rented_hardware = db.ListField(db.ReferenceField("AssignedRecord"))

    def to_json(self):

        contr_names = []
        for contr in self.contributors:
            contr_names.append(contr.username)

        # tags = []
        # for tag in self.tags:
        #     tags.append(tag.to_json())

        rented_hw = []
        for rented in self.rented_hardware:
            rented_hw.append(rented.to_json())

        json_data = {
            "id": str(self.pk),
            "name": self.project_name,
            "owner": self.owner.username,
            "created_time": str(self.created_time),
            "last_edited_time": str(self.last_edited_time),
            "description": self.description,
            "total_cost": self.total_cost,
            "contributers": contr_names,
            # "tags": tags,
            # "wishlisted_hardware": self.wishlisted_hardware,
            "rented_hardware": rented_hw
        }

        return json_data
