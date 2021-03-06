import React, { Component } from 'react'
import Avatar from 'react-avatar';
import { Card, Tab, Table } from 'react-bootstrap';
import * as fetch from '../../../api_calls/fetchInformation'
import { Link } from "react-router-dom"
import DefaultLoader from "./../../_utils/DefaultLoader";

class ProfileHome extends Component {
    constructor() {
        super();
        this.state = {
            infoLoading: true,
            projLoading: true,
            username: "",
            password: "*********",
            email: "",
            projectTitles: [],
        }
    }

    componentDidMount() {
        fetch
            .userInfo()
            .then(res => {
                this.setState({ username: res.data.user.username, email: res.data.user.email, infoLoading: false });
            });
        fetch
            .fetchUserProjects()
            .then(res => {

                let owned = res.data.owned_projects;
                let contr = res.data.contr_projects;
                let allNames = [];

                for (let i = 0; i < owned.length; i++) {
                    allNames.push(owned[i].name);
                }

                for (let i = 0; i < contr.length; i++) {
                    allNames.push(contr[i].name);
                }

                this.setState({ projectTitles: allNames, projLoading: false });
            });
    }

    render() {
        return (
            <div>
                <div id="profile" className=" pb-2 mb-3 border-bottom">
                    <h1 className="profile-header">Profile</h1>
                </div>
                {
                    this.state.infoLoading ?

                        <DefaultLoader loading={this.state.infoLoading} /> :
                        <div>
                            <div id="avatar" className='pt-3 pb-5'>
                                <Avatar name={this.state.username} />
                            </div>
                            <div id="personal-info" className='mb-3'>
                                <Card className="light-background">
                                    <Card.Header>Personal Information</Card.Header>
                                    <Card.Body className="personal-info">
                                        <Table className="text-light" borderless={true} size="sm">
                                            <tbody>
                                                <tr>
                                                    <td>Username: </td>
                                                    <td>{this.state.username}</td>
                                                    {/* <td><input type="text" placeholder="Change Username (Optional)"/></td> */}
                                                </tr>
                                                <tr>
                                                    <td>Password: </td>
                                                    <td>{this.state.password}</td>
                                                    {/* <td><input type="text" placeholder="Change Password (Optional)"/></td> */}
                                                </tr>
                                                <tr>
                                                    <td>Email: </td>
                                                    <td>{this.state.email}</td>
                                                    {/* <td><input type="text" placeholder="Change Email (Optional)"/></td> */}
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                }
                {/* TODO: need to manage projects being shown */}
                {/* <div id="personal-projects">
                    <Card className="light-background">
                        <Card.Header>Current Projects</Card.Header>
                        <Card.Body>
                            <Table className="text-light" borderless={true} size="sm">
                                <tbody>
                                    {
                                        this.state.projectTitles.map((title) => {
                                            return (
                                                <tr>
                                                    <td>{title}</td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </Table>
                        </Card.Body>
                        <Card.Footer>
                            <Link className="a-light" to="/profile#project">View All</Link>
                        </Card.Footer>
                    </Card>
                </div> */}
            </div>

        )
    }
}

export default ProfileHome