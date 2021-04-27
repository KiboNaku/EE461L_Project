import React, { Component } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap'
import ProfileHome from './ProfileHome'
import Billing from '../../billing/Billing'
import Project from './Project'
import ProfileHardware from './ProfileHardware'
import ProfileDataset from './ProfileDataset'
import { Link } from 'react-router-dom';

const profile = "Profile";
const project = "Project";
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
        this.datasetClick = this.datasetClick.bind(this);
        this.logoutClick = this.logoutClick.bind(this);

        this.state = {
            currentPage: profile,
            pages: [profile, project, hardware, dataset, logout],
            navClick: [
                this.getNavObj(profile, this.profileClick),
                this.getNavObj(project, this.projectClick),
                this.getNavObj(hardware, this.hardwareClick),
                this.getNavObj(dataset, this.datasetClick),
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

    datasetClick() {
        this.setState({ currentPage: dataset })
    }

    logoutClick() {
        this.props.logout();
    }

    render() {
        var page
        if (this.state.currentPage === profile) {
            page = <ProfileHome />
        }
        // else if (this.state.currentPage === ) {
        //     page = <Billing />
        // }
        else if (this.state.currentPage === project) {
            page = <Project />
        }
        else if (this.state.currentPage === hardware) {
            page = <ProfileHardware />
        }
        else if (this.state.currentPage === dataset) {
            page = <ProfileDataset />
        }

        return (
            <div className="container-fluid dark-background text-light">
                <div className="row">
                    <nav className="col-2 sidebar px-0">
                        <div className="sidebar-sticky">
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
                            </ul>
                        </div>
                    </nav>

                    <main className="main mx-auto col-lg-10">
                        {page}
                    </main>
                </div>
            </div>
        )
    }
}
export default Dashboard;
