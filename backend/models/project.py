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
    tags = db.ListField(db.ReferenceField(Tag))
    total_cost = db.FloatField(required=True)
    wishlisted_hardware = db.ListField(db.ReferenceField("RentRecord"))
    rented_hardware = db.ListField(db.ReferenceField("RentRecord"))

    def to_json(self):

        json_data = {
            "name": self.project_name,
            "owner": self.owner.username,
            "created_time": str(self.created_time),
            "last_edited_time": str(self.last_edited_time),
            "description": self.description,
            "total_cost": self.total_cost,
            "contributers": [],
            "tags": [],
            "wishlisted_hardware": [],
            "rented_hardware": []
        }

        for contributor in self.contributors:
            json_data["contributers"].apppend(contributer.username)

        # TODO: deal with tags
        # for tag in self.tags:
        #     json_data["tags"].append({
        #             "tag": {
        #                 "tag_name": tag.name,
        #                 "tag_type": tag.type
        #             }
        #     })

        # TODO: write out details for hardware sets

        return json_data
