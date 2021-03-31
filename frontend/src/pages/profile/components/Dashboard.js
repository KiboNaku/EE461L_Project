import React, { Component } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap'
import ProfileHome from './ProfileHome'
import Billing from '../../billing/Billing'
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
            <div className="container-fluid dark-background text-light height=100%">
                <div className="row height=100%">
                    <nav className="col-md-2 d-none d-md-block bg-light sidebar px-0 height=100%">
                    <div className="sidebar-sticky height=100%">
                        <ul className="nav flex-column">
                        <li className="nav-item">
                            <a className="nav-link active a-dark" href="#menu" onClick={this.profileClick}>
                            Profile <span className="sr-only">(current)</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link a-dark" href="#billing" onClick={this.billingClick}>
                            Billing
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link a-dark" href="#project" onClick={this.projectClick}>
                            Projects
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link a-dark" href="#hardware" onClick={this.hardwareClick}>
                            Hardware
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link a-dark" href="#dataset" onClick={this.datasetClick}>
                            Dataset
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link a-dark" href="#" onClick={this.props.logout}>
                            Sign Out
                            </a>
                        </li>
                        </ul>
                    </div>
                    </nav>

                    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4 height=100%">
                        {page}
                    </main>
                </div>
            </div>  
        )
    }
}
export default Dashboard;
