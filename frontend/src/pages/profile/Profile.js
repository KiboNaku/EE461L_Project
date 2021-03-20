import React, { Component } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import Header from "../home/components/Header"
import Dashboard from "./components/Dashboard";
import "../home/Home.css"
import "./components/Dashboard.css"

class Profile extends Component {

    constructor() {
        super();
        this.state = {
        }
    }
    /*Things to display on profile page */
    render(){
        return (
            <div className="full-screen-height">
                <Dashboard />
            </div>
        )  
    }
}

export default Profile