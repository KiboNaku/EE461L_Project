
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
    first_name = request.args.get("firstName")
    last_name = request.args.get("lastName")
    email = request.args.get("email")
    password = request.args.get("password")

    # debug: print to screen
    app.logger.debug("Received register for: {first_name} {last_name} with email {email}")

    return r_val


if __name__ == "__main__":
    app.run(debug=True, port=5000)
