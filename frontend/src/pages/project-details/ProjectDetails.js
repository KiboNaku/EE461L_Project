import React, { Component } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-dom'
import * as fetch from "./../../api_calls/fetchInformation"
import './project-details.css'

class ProjectDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogin: true,
            projectName: "",
            members: "",
            tags: [],
            description: "",
            checkedHw: []
        };
    }

    componentDidMount() {
        console.log(this.props)
        fetch
            .fetchProjectInfo(this.props.location.state.projectId)
            .then(res => {
                let project = res.data.project
                let mems = project.contributers
                mems.unshift(project.owner)
                this.setState({
                    
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
            <div className="w-100 dark-background max-height overflow-hidden text-left px-0 py-0 mx-0 my-0 h-100">

                <div className="project-title-panel block-color-title px-5 py-5 w-100 h-50  mx-0 my-0">
                    <div className="col-6 float-left justify-content-center align-items-center row h-100">
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
                    <div className="col-6 float-left justify-content-center align-items-center row h-100">
                        <div className="px-5 py-5">
                            <h4>Description:</h4>
                            <p>{this.state.description}</p>
                        </div>
                    </div>
                </div>

                {/* List of HW items */}
                <div className="light-background px-5 py-5 w-100 justify-content-center row mx-0 my-0">
                    <table className="table borderless col-7 text-light">
                        <thead>
                            <tr>
                                <th scope="col">Checked</th>
                                <th scope="col">Count</th>
                                {/* <th scope="col">Wishlist</th>
                                <th scope="col"></th> */}
                            </tr>
                        </thead>
                        <tbody>

                            {
                                this.state.checkedHw.map((hwInfo, i) => {
                                    <tr>
                                        <td>{hwInfo.name}</td>
                                        <td>{hwInfo.amount}</td>
                                    </tr>
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
                </div>
            </div>
        );
    }
}

export default ProjectDetails
