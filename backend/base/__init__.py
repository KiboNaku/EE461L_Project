
import os
from flask import Flask, request
from flask_cors import CORS
from flask_pymongo import PyMongo

def create_app():
    mongo = PyMongo()
    new_app = Flask(__name__)
    
    new_app.config['MONGO_URI'] = os.environ.get('MONGO_URI')
    # new_app.logger.debug(os.environ.get('MONGO_URI'))

    # mongo.init_app(new_app)
    
    return new_app


app = create_app()
CORS(app)
