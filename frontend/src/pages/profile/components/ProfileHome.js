import React, { Component } from 'react'
import Avatar from 'react-avatar';
import { Card, Tab, Table } from 'react-bootstrap';
import * as fetch from "./../../../api_calls/fetchInformation"

class ProfileHome extends Component {
    constructor() {
        super();
        this.state = {
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
                this.setState({ username: res.data.user.username, email: res.data.user.email });
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

                this.setState({ projectTitles: allNames });
            });
    }

    render() {
        console.log(this.state.projectTitles);
        return (
            <div>
                <div id="profile" className=" pb-2 mb-3 border-bottom">
                    <h1 className="h2">Profile</h1>
                </div>
                {/* TODO: need better way to implement avatar */}
                <div id="avatar" className='mb-3'>
                    <Avatar name={this.state.username} />
                </div>
                {/* TODO: fill personal info from login */}
                <div id="personal-info" className='mb-3'>
                    <Card className="light-background">
                        <Card.Header>Personal Information</Card.Header>
                        <Card.Body>
                            <Table className="text-light" borderless={true} size="sm">
                                <tbody>
                                    {/* <tr>
                                <td>First Name: </td>
                                <td>Temporary</td>
                                <td><a>Change First Name (Optional)</a></td>
                            </tr>
                            <tr>
                                <td>Last Name: </td>
                                <td>Temporary</td>
                                <td><a>Change Last Name (Optional)</a></td>
                            </tr> */}
                                    {/**Changing info is optional, need to get info from database */}
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
                {/* TODO: need to manage projects being shown */}
                <div id="personal-projects">
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
                            {/* TODO: create link to project page */}
                            <a className="a-light" href="/profile#project">View All</a>
                        </Card.Footer>
                    </Card>
                </div>
            </div>

        )
    }
}

export default ProfileHome