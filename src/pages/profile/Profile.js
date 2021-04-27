import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Dashboard from "./components/Dashboard";
import "../home/Home.css";
import "./Profile.css";

class Profile extends Component {

    constructor() {
        super();
        this.state = {
        }
    }
    /*Things to display on profile page */
    render(){
        
        if(!this.props.loggedIn){
            return <Redirect to='/' />
        }

        return (
            <div title="dashboard">
                <Dashboard logout ={this.props.logout}/>
            </div>
        )  
    }
}

export default Profile