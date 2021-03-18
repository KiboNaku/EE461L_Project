import React, { Component } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap'
import ProfileHome from './ProfileHome'
import Billing from './Billing'
import Project from './Project'
import ProfileHardware from './ProfileHardware'
import ProfileDataset from './ProfileDataset'
 
class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            currentPage: 0,
        }
        this.profileClick = this.profileClick.bind(this);
        this.billingClick = this.billingClick.bind(this);
        this.projectClick = this.projectClick.bind(this);
        this.hardwareClick = this.hardwareClick.bind(this);
        this.datasetClick = this.datasetClick.bind(this);

    }
    profileClick(){
        this.setState({ currentPage: 0 })
    }
    billingClick(){
        this.setState({ currentPage: 1 })
    }
    projectClick(){
        this.setState({ currentPage: 2})
    }
    hardwareClick(){
        this.setState({ currentPage: 3})
    }
    datasetClick(){
        this.setState({ currentPage: 4})
    }

    render() {
        var page
        if(this.state.currentPage == 0){
            page = <ProfileHome/>
        }
        else if(this.state.currentPage == 1){
            page = <Billing/>
        }
        else if(this.state.currentPage == 2){
            page = <Project/>
        }
        else if(this.state.currentPage == 3){
            page = <ProfileHardware/>
        }
        else if(this.state.currentPage == 4){
            page = <ProfileDataset/>
        }
        
        return (
            <div class="container-fluid">
                <div class="row">
                    <nav class="col-md-2 d-none d-md-block bg-light sidebar">
                    <div class="sidebar-sticky">
                        <ul class="nav flex-column">
                        <li class="nav-item">
                            <a class="nav-link active" href="#menu" onClick={this.profileClick}>
                            Profile <span class="sr-only">(current)</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#billing" onClick={this.billingClick}>
                            Billing
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#project" onClick={this.projectClick}>
                            Projects
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#hardware" onClick={this.hardwareClick}>
                            Hardware
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#dataset" onClick={this.datasetClick}>
                            Dataset
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">
                            Sign Out
                            </a>
                        </li>
                        </ul>
                    </div>
                    </nav>

                    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                        {page}
                    </main>
                </div>
            </div>  
        )
    }
}
export default Dashboard;
