import React, { Component } from 'react'
import { Button, Card, Table } from 'react-bootstrap'
import Header from "../home/components/Header"
import "../home/Home.css"

class HardwareDatasets extends Component {

    constructor() {
        super();
        this.state = {
        }
    }

    checkOut(){
        // TODO: write this function so that it accurately decrements all of the hardware sets that the user checks out,
        // as well as checking that there are enough sets to match what the user is asking for
    }
    
    /*Things to display on hardware-datasets page */
    render(){
        return (
            <div className="full-screen-height">
                <Header />
                <Card style={{margin:20}}> 
                    <Card.Header>Hardware Sets</Card.Header>
                    <Card.Body>
                        <table id="fixed-table" class="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th style={{width: 200}}>Name</th>
                                    <th style={{width: 200}}>Sets Available</th>
                                    <th style={{width: 150}}>Checkout Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>HWSet1</td>
                                    {/* TODO: fix this hardcoded value once profiles are implemented */}
                                    <td>10</td>
                                    <td>
                                        <input type="num" placeholder="Enter Number"/>
                                        <small class="form-text text-muted">How many you would like to checkout.</small>
                                    </td>
                                </tr>
                                <tr>
                                    <td>HWSet2</td>
                                    {/* TODO: fix this hardcoded value once profiles are implemented */}
                                    <td>25</td>
                                    <td>
                                        <input type="num" placeholder="Enter Number"/>
                                        <small class="form-text text-muted">How many you would like to checkout.</small>
                                    </td>
                                </tr>
                                <tr>
                                    <td>HWSet3</td>
                                    {/* TODO: fix this hardcoded value once profiles are implemented */}
                                    <td>5</td>
                                    <td>
                                        <input type="num" placeholder="Enter Number"/>
                                        <small class="form-text text-muted">How many you would like to checkout.</small>
                                    </td>
                                </tr>
                                <tr>
                                    <td>HWSet4</td>
                                    {/* TODO: fix this hardcoded value once profiles are implemented */}
                                    <td>15</td>
                                    <td>
                                        <input type="num" placeholder="Enter Number"/>
                                        <small class="form-text text-muted">How many you would like to checkout.</small>
                                    </td>
                                </tr>
                                <tr>
                                    <td>HWSet5</td>
                                    {/* TODO: fix this hardcoded value once profiles are implemented */}
                                    <td>50</td>
                                    <td>
                                        <input type="num" placeholder="Enter Number"/>
                                        <small class="form-text text-muted">How many you would like to checkout.</small>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Card.Body>
                    <button type="button" class="btn btn-primary btn-md" onClick="checkout()">Checkout</button>
                </Card>
                <Card style={{margin:20}}> 
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
