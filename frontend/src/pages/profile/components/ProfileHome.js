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
                <div id="profile" className=" pb-2 mb-3 border-bottom">
                    <h1 className="h2">Profile</h1>
                </div>
                {/* TODO: need better way to implement avatar */}
                <div id="avatar" className='mb-3'>
                    <Avatar name="User Name" />
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
                                        <td>Temporary</td>
                                        <td><input type="text" placeholder="Change Username (Optional)"/></td>
                                    </tr>
                                    <tr>
                                        <td>Password: </td>
                                        <td>Temporary</td>
                                        <td><input type="text" placeholder="Change Password (Optional)"/></td>
                                    </tr>
                                    <tr>
                                        <td>Email: </td>
                                        <td>Temporary</td>
                                        <td><input type="text" placeholder="Change Email (Optional)"/></td>
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
                            <a className="a-light" href="/profile#project">View All</a>
                        </Card.Footer>
                    </Card>
                </div>
            </div>

        )
    }
}

export default ProfileHome