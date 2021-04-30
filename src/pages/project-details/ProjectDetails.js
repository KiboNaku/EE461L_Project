import React, { Component } from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { Link } from 'react-dom'
import * as fetch from "./../../api_calls/fetchInformation"
import './project-details.css'
import DefaultLoader from "./../_utils/DefaultLoader";
import AssignHardware from "./../_utils/AssignHardware"
import jwt from 'jwt-decode';
import $ from "jquery";

class ProjectDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOwner: false,
            loading: true,
            isLogin: true,
            projectName: "",
            members: "",
            tags: [],
            description: "",
            checkedHw: []
        };

        this.addHwSets = this.addHwSets.bind(this);
    }

    addHwSets() {
        $("#add-hw-modal").modal("hide");
    }

    componentDidMount() {
        fetch
            .fetchProjectInfo(this.props.location.state.projectId)
            .then(res => {
                let project = res.data.project
                let mems = project.contributors
                mems.unshift(project.owner)
                
                let isOwner = false;
                // if(this.props.loggedIn) {
                //     isOwner = jwt(localStorage.getItem("token")).user === project.owner;
                // }

                this.setState({
                    isOwner: isOwner,
                    loading: false,
                    projectName: project.name,
                    members: mems.join(", "),
                    // TODO: add functionality for tags
                    description: project.description,
                    checkedHw: project.rented_hardware
                });
            })
    }

    render() {
        return (
            <div className="w-100 dark-background max-height text-left px-0 py-0 mx-0 my-0">

                {this.state.loading ?

                    <div className="full-screen py-5">
                        <DefaultLoader />
                    </div>

                    :
                    <div>
                        <div className="project-title-panel block-color-title px-5 py-5 w-100 h-50  mx-0 my-0">
                            <div className="col-md-6 float-left justify-content-center align-items-center row h-100">
                                <div className="">
                                    <div className="project-name text-left">{this.state.projectName}</div>
                                    <div className="project-members">{this.state.members}</div>
                                    <div className="project-tags">
                                        <p>Tags:</p>
                                        {
                                            this.state.tags.map((tag, i) => {
                                                return (
                                                    <span key={i} className="project-tag">{tag}</span>
                                                )
                                            })
                                        }
                                    </div>
                                </div>

                            </div>
                            <div className="col-md-6 float-right justify-content-center align-items-center row h-100">
                                <div className="px-md-5 pb-5 pt-4">
                                    <h4>Description:</h4>
                                    <p>{this.state.description}</p>
                                </div>
                            </div>
                        </div>

                        {/* List of HW items */}
                        <div className="light-background px-5 py-5 w-100 justify-content-center row mx-0 my-0">
                            <table className="table project-hardware-table borderless col-7 text-light">
                                <thead>
                                    <tr>
                                        <th scope="col">Checked Hardware</th>
                                        <th scope="col">Count</th>
                                        {/* <th scope="col">Wishlist</th>
                                <th scope="col"></th> */}
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        this.state.checkedHw.map((hwInfo, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{hwInfo.hw_name}</td>
                                                    <td>{hwInfo.amount}</td>
                                                </tr>
                                            )
                                        })
                                    }

                                    {/* <tr>
                                <td className="font-weight-bold">Total:</td>
                                <td>$20000</td>
                                <td></td>
                                <td>$200</td>
                            </tr> */}
                                </tbody>
                            </table>

                            {
                                this.props.loggedIn ?

                                    (this.state.isOwner ?
                                        <Button data-toggle="modal" data-target="#add-hw-modal" className="w-50 button-primary">Add Hardware Sets</Button> : ""
                                    ) :
                                    <div>
                                        Are you the owner? Please < Link to="/login" className="btn button-primary">login</Link> to assign hardware sets.
                                    </div>

                            }
                        </div>
                    </div>
                }

                <div id="add-hw-modal" className="modal">
                    <div className="modal-dialog">
                        <div className="modal-content dark-background">
                            <div className="modal-header">
                                <h4 className="mx-auto a-dark">Add Project</h4>
                            </div>
                            <div className="modal-body">
                                <AssignHardware assignHw={this.addHwSets}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProjectDetails
