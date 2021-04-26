import React, { Component } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap'
import ProfileHome from './ProfileHome'
import Billing from '../../billing/Billing'
import Project from './Project'
import ProfileHardware from './ProfileHardware'
import { Link } from 'react-router-dom';

const profile = "Profile";
const project = "Projects";
const hardware = "Hardware";
const dataset = "Dataset";
const logout = "Logout";


class Dashboard extends Component {

    constructor(props) {

        super(props);

        this.getNavObj = this.getNavObj.bind(this);
        this.profileClick = this.profileClick.bind(this);
        // this.billingClick = this.billingClick.bind(this);
        this.projectClick = this.projectClick.bind(this);
        this.hardwareClick = this.hardwareClick.bind(this);
        // this.datasetClick = this.datase  tClick.bind(this);
        this.logoutClick = this.logoutClick.bind(this);

        this.state = {
            currentPage: profile,
            pages: [profile, project, hardware, logout],
            navClick: [
                this.getNavObj(profile, this.profileClick),
                this.getNavObj(project, this.projectClick),
                this.getNavObj(hardware, this.hardwareClick),
                // this.getNavObj(dataset, this.datasetClick),
                this.getNavObj(logout, this.logoutClick)
            ]
        };

    }

    getNavObj(name, call){
        return {
            name: name,
            call: call
        }
    }

    profileClick() {
        this.setState({ currentPage: profile })
    }

    projectClick() {
        this.setState({ currentPage: project })
    }

    hardwareClick() {
        this.setState({ currentPage: hardware })
    }

    // datasetClick() {
    //     this.setState({ currentPage: dataset })
    // }

    logoutClick() {
        this.props.logout();
    }

    render() {
        var page
        if (this.state.currentPage === profile) {
            page = <ProfileHome title="profHome"/>
        }
        // else if (this.state.currentPage === ) {
        //     page = <Billing />
        // }
        else if (this.state.currentPage === project) {
            page = <Project title="profProject"/>
        }
        else if (this.state.currentPage === hardware) {
            page = <ProfileHardware title="profHardware"S/>
        }
        // else if (this.state.currentPage === dataset) {
        //     page = <ProfileDataset />
        // }

        return (
            <div className="container-fluid dark-background text-light height=100%">
                <div className="row height=100%">
                    <nav className="col-md-2 d-none d-md-block bg-light sidebar px-0 height=100%">
                        <div className="sidebar-sticky height=100%" title="profPages">
                            <ul className="nav flex-column">

                                {
                                    this.state.navClick.map((nav, i)=> {
                                        return (
                                            
                                            <li className= {"nav-item" + nav.name === this.state.currentPage? " ": ""}>
                                                <a className="nav-link active a-dark" href="#menu" onClick={nav.call}>
                                                    {nav.name}
                                                </a>
                                            </li>
                                        )
                                    })
                                }
                                {/* <li className="nav-item">
                                    <a className="nav-link a-dark" href="#billing" onClick={this.billingClick}>
                                        Billing
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link a-dark" href="#project" onClick={this.projectClick} title="projectclick">
                                        Projects
                            </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link a-dark" href="#hardware" onClick={this.hardwareClick} title="hardwareClick">
                                        Hardware
                            </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link a-dark" href="#dataset" onClick={this.datasetClick}>
                                        Dataset
                            </a>
                                </li> */}
                                {/* <li className="nav-item">
                                    <a className="nav-link a-dark" to="/" onClick={this.props.logout} title="logout"> Sign Out</a>

                                </li> */}
                            </ul>
                        </div>
                    </nav>

                    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4 height=100%" title="profMain"> 
                        {page}
                    </main>
                </div>
            </div>
        )
    }
}
export default Dashboard;
