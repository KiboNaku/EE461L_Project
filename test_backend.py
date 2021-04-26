import base.routes
import models.user
import models.hardware
import models.project
import os
import pytest_check as check

def test_backend():
    dummyPerson = {
        "username": dummy,
        "email" : dummy@gmail.com,
        "password" : 123456,
        #rented_hardware = db.ListField(db.ReferenceField("RentRecord"))
        # cross reference list to project, one as owner, and one as contributor
        #owned_projects = db.ListField(db.ReferenceField("Project"))
        #contributed_projects = db.ListField(db.ReferenceField("Project"))
    }
    return 0