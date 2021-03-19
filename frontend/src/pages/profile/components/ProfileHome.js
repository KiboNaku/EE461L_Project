import React, { Component } from 'react'
import Avatar from 'react-avatar';
import { Card, Tab, Table } from 'react-bootstrap';

class ProfileHome extends Component {
    constructor() {
        super();
        this.state = {
        }
        /* TODO: Need to get info from database*/
    }

    render() {
        return (
            <div>
                <div id="profile" class=" pb-2 mb-3 border-bottom">
                    <h1 class="h2">Profile</h1>
                </div>
                {/* TODO: need better way to implement avatar */}
                <div id="avatar" class='mb-3'>
                    <Avatar name="Temporary name" />
                </div>
                {/* TODO: fill personal info from login */}
                <div id="personal-info" class='mb-3'>
                <Card>
                    <Card.Header>Personal Information</Card.Header>
                    <Card.Body>
                    <Table borderless={true} size="sm">
                        <tbody>
                            <tr>
                                <td>First Name: </td>
                                <td>Temporary</td>
                                <td><a>Change First Name</a></td>
                            </tr>
                            <tr>
                                <td>Last Name: </td>
                                <td>Temporary</td>
                                <td><a>Change Last Name</a></td>
                            </tr>
                            <tr>
                                <td>Username: </td>
                                <td>Temporary</td>
                                <td><a>Change Username</a></td>
                            </tr>
                            <tr>
                                <td>Password: </td>
                                <td>Temporary</td>
                                <td><a>Change Password</a></td>
                            </tr>
                            <tr>
                                <td>Email: </td>
                                <td>Temporary</td>
                                <td><a>Change Email</a></td>
                            </tr>
                        </tbody>
                    </Table>
                    </Card.Body>
                </Card>
                </div>
                {/* TODO: need to manage projects being shown */}
                <div id="personal-projects">
                <Card>
                    <Card.Header>Current Projects</Card.Header>
                    <Card.Body>
                    <Table borderless={true} size="sm">
                        <tbody>
                            <tr>
                                <td>Project 1</td>
                            </tr>
                            <tr>
                                <td>Project 2</td>
                            </tr>
                            <tr>
                                <td>Project 3</td>
                            </tr>
                            <tr>
                                <td>Project 4</td>
                            </tr>
                        </tbody>
                    </Table>
                    </Card.Body>
                    <Card.Footer>
                        {/* TODO: create link to project page */}
                        <a>View All</a>
                        </Card.Footer>
                </Card>
                </div>  
            </div>
            
        )
    }
}

export default ProfileHome