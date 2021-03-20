from flask import Flask, jsonify, request
from bson import json_util
from base import db

class Hardware(db.Document):
    # price per unit, name, total num, num avaliable, extra rate? 
    pass
