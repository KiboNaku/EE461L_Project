import React, { Component } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import Header from "../home/components/Header"
import "../home/Home.css"
import "./components/Dashboard.css"

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
            </div>
        )  
    }
}

export default Profile