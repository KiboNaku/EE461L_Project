
from base import app
from base.routes import *
from models.hardware import Hardware
from flask import Flask, render_template,send_from_directory,request, jsonify, make_response
from flask_cors import CORS

app = Flask(__name__ 
    ,static_folder='../frontend/build',static_url_path='')
cors = CORS(app)

@app.rout('/')
def serve():
    return send_from_directory(app.static_folder,'index.html')

if __name__ == "__main__":
    app.run(debug=True, port=5000)



    # hardware = Hardware(
    #         hardware_name="HWSet1",
    #         price_per_unit="20",
    #         total_count="10",
    #         available_count="10",
    #         extra_time_rate="30"
    # )
    # hardware.save()
    # hardware = Hardware(
    #         hardware_name="HWSet2",
    #         price_per_unit="10",
    #         total_count="25",
    #         available_count="25",
    #         extra_time_rate="15"
    # )
    # hardware.save()
    # hardware = Hardware(
    #         hardware_name="HWSet3",
    #         price_per_unit="50",
    #         total_count="5",
    #         available_count="5",
    #         extra_time_rate="60"
    # )
    # hardware.save()
    # hardware = Hardware(
    #         hardware_name="HWSet4",
    #         price_per_unit="15",
    #         total_count="15",
    #         available_count="15",
    #         extra_time_rate="20"
    # )
    # hardware.save()
    # hardware = Hardware(
    #         hardware_name="HWSet5",
    #         price_per_unit="5",
    #         total_count="50",
    #         available_count="50",
    #         extra_time_rate="6"
    # )
    # hardware.save()
