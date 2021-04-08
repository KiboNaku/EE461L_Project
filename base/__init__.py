
import os
from flask import Flask, request, send_from_directory
from flask_cors import CORS
# from flask_pymongo import PyMongo
from flask_mongoengine import MongoEngine


def create_mongo():
    #     mongo = PyMongo()
    db = MongoEngine()
    return db


def create_app():
    new_app = Flask(__name__,static_folder='frontend/build',static_url_path='')
    # new_app.config['MONGO_URI'] = 'mongodb+srv://ee461L-user:dXFeMfeocMJnIygo@cluster0.5n8qc.mongodb.net/db?retryWrites=true&w=majority'

    # mongo.init_app(new_app)
    new_app.config['MONGODB_SETTINGS'] = {
        'host': 'mongodb+srv://ee461L-user:dXFeMfeocMJnIygo@cluster0.5n8qc.mongodb.net/db?retryWrites=true&w=majority'
    }
    new_app.config['SECRET_KEY'] = 'lmoAJD3xkayPSsR1eZce]>8t!qhhe/Ce#dq'
    db.init_app(new_app)
    return new_app


db = create_mongo()
app = create_app()
CORS(app)

@app.route('/')
def index():
    return send_from_directory(app.static_folder,'index.html')

# @app.errorhandler(404)
# def not_found(e):
#     return app.send_static_file('index.html')