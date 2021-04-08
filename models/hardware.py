from flask import Flask, jsonify, request
from bson import json_util
from base import db


class Hardware(db.Document):
    # price per unit, name, total num, num available, extra rate?
    hardware_name = db.StringField(required=True, max_length=50)
    price_per_unit = db.FloatField(required=True)
    total_count = db.IntField(required=True)
    available_count = db.IntField(required=True)
    extra_time_rate = db.FloatField()

    def to_json(self):
        return {
            "hardware_name": self.hardware_name,
            "price_per_unit": self.price_per_unit,
            "total_count": self.total_count,
            "available_count": self.available_count, 
            "extra_time_rate": self.extra_time_rate
        }
