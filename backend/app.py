
from flask import Flask, request
from flask_cors import CORS

def create_app():
    new_app = Flask(__name__)
    return new_app


app = create_app()
CORS(app)

@app.route("/api/register", methods=["POST"])
def register():

    # initialize return value
    r_val = {"email": None, "success": 0, "error": None}

    # get args from front end
    first_name = request.get_json()["firstName"]
    last_name = request.get_json()["lastName"]
    email = request.get_json()["email"]
    password = request.get_json()["password"]

    # debug: print to screen
    app.logger.debug("Received register for: {first_name} {last_name} with email {email}".format(
        first_name = first_name, last_name=last_name, email=email)
        )

    return r_val


@app.route("/api/login", methods=["POST"])
def login():

    # initialize return value
    r_val = {"email": None, "success": 0, "error": None}

    # get args from front end
    email = request.get_json()["email"]
    password = request.get_json()["password"]

    r_val["email"] = email

    # debug: print to screen
    app.logger.debug("Received login for: {email}".format(email=email))

    return r_val


if __name__ == "__main__":
    app.run(debug=True, port=5000)
