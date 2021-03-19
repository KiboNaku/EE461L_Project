import { useRadioGroup } from '@material-ui/core'
import React, { Component } from 'react'
import { Button, Card, Modal, Table } from 'react-bootstrap'
import Header from "../home/components/Header"
import "../home/Home.css"
import CheckCart from "./components/CheckCart.js"
import "./components/Modal.css"
import $ from "jquery";

class HardwareDatasets extends Component {

    constructor() {
        super();
        this.state = {
        }
        this.displayCart = this.displayCart.bind(this);
        this.checkOut = this.checkOut.bind(this);
    }

    displayCart() {
        var btn = document.getElementById("modalButton");
        var modal = document.getElementById("CheckCart");
        btn.onclick = function () {
            let hwSet1String = "0 of HWSet1";
            let hwSet2String = "0 of HWSet2";
            let hwSet3String = "0 of HWSet3";
            let hwSet4String = "0 of HWSet4";
            let hwSet5String = "0 of HWSet5";
            // Error strings can be used to track any errors with inputs and display them to the user
            // if errors exist, the errormessage modal should show up instead of checkCart
            let errorBool = false;
            let hwSet1Error = "";
            let hwSet2Error = "";
            let hwSet3Error = "";
            let hwSet4Error = "";
            let hwSet5Error = "";
            // Add check for whether or not their ask exceeds the availability in the backend
            if (!document.getElementById("hwSet1").value.length == 0) {
                if (!isNaN(document.getElementById("hwSet1").value)) {
                    hwSet1String = document.getElementById("hwSet1").value + " of HWSet1";
                }
            }
            // Add check for whether or not their ask exceeds the availability in the backend
            if (!document.getElementById("hwSet2").value.length == 0) {
                if (!isNaN(document.getElementById("hwSet2").value)) {
                    hwSet2String = document.getElementById("hwSet2").value + " of HWSet2";
                }
            }
            // Add check for whether or not their ask exceeds the availability in the backend
            if (!document.getElementById("hwSet3").value.length == 0) {
                if (!isNaN(document.getElementById("hwSet3").value)) {
                    hwSet3String = document.getElementById("hwSet3").value + " of HWSet3";
                }
            }
            // Add check for whether or not their ask exceeds the availability in the backend
            if (!document.getElementById("hwSet4").value.length == 0) {
                if (!isNaN(document.getElementById("hwSet4").value)) {
                    hwSet4String = document.getElementById("hwSet4").value + " of HWSet4";
                }
            }
            // Add check for whether or not their ask exceeds the availability in the backend
            if (!document.getElementById("hwSet5").value.length == 0) {
                if (!isNaN(document.getElementById("hwSet5").value)) {
                    hwSet5String = document.getElementById("hwSet5").value + " of HWSet5";
                }
            }

            document.getElementById("hwSet1Info").innerHTML = hwSet1String;
            document.getElementById("hwSet2Info").innerHTML = hwSet2String;
            document.getElementById("hwSet3Info").innerHTML = hwSet3String;
            document.getElementById("hwSet4Info").innerHTML = hwSet4String;
            document.getElementById("hwSet5Info").innerHTML = hwSet5String;
            if (!errorBool) {
                // modal.style.display = "block";
                // $("#CheckCart").modal("show");
            }
            document.getElementById("hwSet1").value = "";
            document.getElementById("hwSet2").value = "";
            document.getElementById("hwSet3").value = "";
            document.getElementById("hwSet4").value = "";
            document.getElementById("hwSet5").value = "";
        }
    }

    checkOut() {
        // TODO: write this function so that it accurately decrements all of the hardware sets that the user checks out,
        // as well as checking that there are enough sets to match what the user is asking for
    }

    /*Things to display on hardware-datasets page */
    render() {
        return (
            <div className="full-screen-height">
                <Header />
                <Card style={{ margin: 20 }}>
                    <Card.Header>Hardware Sets</Card.Header>
                    <Card.Body>
                        <table id="fixed-table" class="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th style={{ width: 200 }}>Name</th>
                                    <th style={{ width: 200 }}>Sets Available</th>
                                    <th style={{ width: 150 }}>Checkout Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>HWSet1</td>
                                    {/* TODO: fix this hardcoded value once profiles are implemented */}
                                    <td>10</td>
                                    <td>
                                        <input type="num" placeholder="Enter Number" id="hwSet1" />
                                        <small class="form-text text-muted">How many you would like to checkout.</small>
                                    </td>
                                </tr>
                                <tr>
                                    <td>HWSet2</td>
                                    {/* TODO: fix this hardcoded value once profiles are implemented */}
                                    <td>25</td>
                                    <td>
                                        <input type="num" placeholder="Enter Number" id="hwSet2" />
                                        <small class="form-text text-muted">How many you would like to checkout.</small>
                                    </td>
                                </tr>
                                <tr>
                                    <td>HWSet3</td>
                                    {/* TODO: fix this hardcoded value once profiles are implemented */}
                                    <td>5</td>
                                    <td>
                                        <input type="num" placeholder="Enter Number" id="hwSet3" />
                                        <small class="form-text text-muted">How many you would like to checkout.</small>
                                    </td>
                                </tr>
                                <tr>
                                    <td>HWSet4</td>
                                    {/* TODO: fix this hardcoded value once profiles are implemented */}
                                    <td>15</td>
                                    <td>
                                        <input type="num" placeholder="Enter Number" id="hwSet4" />
                                        <small class="form-text text-muted">How many you would like to checkout.</small>
                                    </td>
                                </tr>
                                <tr>
                                    <td>HWSet5</td>
                                    {/* TODO: fix this hardcoded value once profiles are implemented */}
                                    <td>50</td>
                                    <td>
                                        <input type="num" placeholder="Enter Number" id="hwSet5" />
                                        <small class="form-text text-muted">How many you would like to checkout.</small>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="row justify-content-center">
                            <button id="modalButton" type="button" className="btn btn-primary btn-md"
                                data-toggle="modal" data-target="#CheckCart" onClick={this.displayCart}>
                                Checkout
                            </button>
                            <CheckCart />
                        </div>
                    </Card.Body>
                </Card>
                <Card style={{ margin: 20 }}>
                    <Card.Header>DataSets</Card.Header>
                    <Card.Body>
                        <table class="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Download Link</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {/* TODO: fix this to list a real dataset later on */}
                                    <td>1000 Pi Digits</td>
                                    <td>
                                        {/* TODO: fix to download a real dataset from our site later on */}
                                        <a href="/resources/1000Pi.txt" download="1000Pi.txt">Click to download</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default HardwareDatasets
