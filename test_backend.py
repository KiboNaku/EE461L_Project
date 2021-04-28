import base.routes
from base.routes import login
from base.routes import create_token
from base.routes import fetch_project
from base.routes import fetch_hardware
from base.routes import fetch_user_hardware
from base.routes import *
import models.user
import models.hardware
import models.project
from base.__init__ import app
import os
from flask import json
import pytest_check as check
import pytest
import requests
import base.__init__
from flask_cors import CORS

def test_register():
    db = base.__init__.create_mongo()
    app = base.__init__.create_app()
    CORS(app)

    response = app.test_client().post(
        "/api/register",
        data = json.dumps({'username': 'helloworld', 'email' : 'helloworld@gmail.com', 'password' : '1'})
    )
    print(response)
    # data = json.loads(response.get_data(as_text=True))
    # assertEqual(data['error'], "An account with the email already exists." )
    # assert response.status.code == 200

    # assert data['error'] == b"An account with the email already exists."
    # print(data.json())

    # json_response = response.json()
    # print(json_response)

def test_login():
    db = base.__init__.create_mongo()
    app = base.__init__.create_app()
    CORS(app)

    response = app.test_client().post(
        "/api/login",
        data = json.dumps({'username': 'helloworld', 'email' : 'helloworld@gmail.com', 'password' : '1'})
    )
    print(response)
    # data = json.loads(response.get_data(as_text=True))

def test_create_token():
    result = create_token("hello")
    y = hasattr(result,"hello")
    check.equal(y, False)

def test_fetch_project():
    result = fetch_project()
    check.equal(bool(result), True)
    print(result)

def test_join_project():
    return 0

#need set up application??
def test_fetch_hardware():
    result = fetch_hardware()
    check.equal(bool(result), True)
    print(result)

#need active http request??
def test_fetch_user_hardware():
    db = base.__init__.create_mongo()
    app = base.__init__.create_app()
    CORS(app)

    token = create_token("nakukibo")
    result = fetch_user_hardware(token)
    print(result)
    return 0

#need active http request??
def test_fetch_user_project():
    token = create_token("dummy")
    result = fetch_user_hardware(token)
    print(result)
    return 0

def test_rent_hardware():
    return 0

def test_enough_hardware():
    return 0

def test_return_hardware():
    return 0

#no attribute string??
def test_get_user_hardware():
    userHardware = get_user_hw("nakukibo")
    print(userHardware)
    return 0

#need set up application??
def test_fetch_datasets():
    datasets = fetch_datasets()
    print(datasets)

def test_add_project():
    return 0

#need active http request??
def test_user_info():
    token = create_token("dummy")
    info = user_info(token)
    print(info)
    return 0

def test_fetch_project_info():
    response = app.test_client().post(
        "/api/fetch-project-info",
        data = json.dumps({'projectId': '6088e495eeb28906f6e83c1d'})
    )
    print(response)
    data = json.loads(response.get_data(as_text=True))
    return 0

def test_assign_hardware():
    return 0

test_fetch_user_hardware()