
from flask import Flask

def create_app():
    new_app = Flask(__name__)
    return new_app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000)
