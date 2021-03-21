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
    rented_hardware = db.ListField(db.ReferenceField("RentRecord"))

    # def to_json(self):
    #     data = self.to_mongo()
    #     data["owner"] = {
    #         "User": {
    #             "username": self.owner.username,
    #         }
    #     }

    #     # I don't actually know if this works
    #     for contributor in data["contributors"]:
    #         contributor = {
    #             "User": {
    #                 "first_name": contributor.first_name,
    #                 "last_name": contributor.last_name
    #             }
    #         }

    #     for tag in data["tags"]:
    #         tag = {
    #             "Tag": {
    #                 "tag_name": tag.tag_name,
    #                 "tag_type": tag.tag_type
    #             }
    #         }

    #     # write out details for hardware sets

    #     return json_util.dumps(data)
