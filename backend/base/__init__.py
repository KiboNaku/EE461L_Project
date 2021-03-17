
import os
from flask import Flask, request
from flask_cors import CORS
from flask_pymongo import PyMongo

def create_mongo():
    mongo = PyMongo()
    return mongo


def create_app():
    new_app = Flask(__name__)
    new_app.config['MONGO_URI'] = 'mongodb+srv://ee461L-user:dXFeMfeocMJnIygo@cluster0.5n8qc.mongodb.net/db?retryWrites=true&w=majority'
    
    mongo.init_app(new_app)
    
    return new_app


mongo = create_mongo()
app = create_app()
CORS(app)
