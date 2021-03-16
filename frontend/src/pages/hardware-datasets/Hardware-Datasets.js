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
    
    /*Things to display on hardware-datasets page */
    render(){
        return (
            <div className="full-screen-height">
                <Header />
                <Card> 
                    <Card.Header>Hardware Sets</Card.Header>
                    <Card.Body>
                        <table class="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Sets Available</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>HWSet1</td>
                                    <td>10</td>
                                </tr>
                                <tr>
                                    <td>HWSet2</td>
                                    <td>25</td>
                                </tr>
                                <tr>
                                    <td>HWSet3</td>
                                    <td>5</td>
                                </tr>
                                <tr>
                                    <td>HWSet4</td>
                                    <td>15</td>
                                </tr>
                                <tr>
                                    <td>HWSet5</td>
                                    <td>50</td>
                                </tr>
                            </tbody>
                        </table>
                    </Card.Body>
                </Card>
                <Card> 
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
                                    <td>1000 Pi Digits</td>
                                    <td>
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
