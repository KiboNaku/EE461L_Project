from flask import Flask, jsonify, request
from bson import json_util
from base import db


class Dataset(db.Document):
    dataset_name = db.StringField(required=True)
    download_link = db.StringField(required=True)

    def to_json(self):
        return {
            "dataset_name": self.dataset_name,
            "download_link": self.download_link
        }