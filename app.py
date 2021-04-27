
from base import app
from base.routes import *
import os
# from flask import Flask, render_template,send_from_directory,request, jsonify, make_response
# from flask_cors import CORS

# if __name__ == "__main__":
#     app.run(debug=True, port=5000)

if __name__ == "__main__":
    app.run(host='0.0.0.0')