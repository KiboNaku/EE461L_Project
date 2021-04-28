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
            <div className="container-fluid dark-background text-light max-height">
                <div className="row">
                    <div className="col-lg-2 sidebar px-lg-0">
                        <div className="sidebar-sticky" title="profPages">
                                {
                                    this.state.navClick.map((nav, i)=> {
                                        return (
                                            
                                            <span className= {"nav-item" + nav.name === this.state.currentPage? " ": ""}>
                                                <a className="nav-link active a-dark" href="#menu" onClick={nav.call}>
                                                    {nav.name}
                                                </a>
                                            </span>
                                        )
                                    })
                                }
                        </div>
                    </div>
                    <main className="main mx-auto col-lg-10" title="profMain">
                        {page}
                    </main>
                </div>
            </div>
        )
    }
}
export default Dashboard;
