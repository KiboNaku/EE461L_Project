import React, { Component } from 'react';
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import {Link} from "react-router-dom"
import * as fetch from "../../../api_calls/fetchInformation"
import DefaultLoader from "../../_utils/DefaultLoader";

class ProfileProject extends Component {

    constructor(){
        super();
        this.state = {
            loading: true,
            owned: [],
            contr: []
        }
        this.getProjectDiv = this.getProjectDiv.bind(this);
    }

    componentDidMount(){
        fetch
            .fetchUserProjects()
            .then(res => {
                this.setState({owned: res.data.owned_projects, contr: res.data.contr_projects, loading: false});
            });
    }

    getProjectDiv(projectInfo, i){
        return(
            
            <div className="mb-3" key={i}>
                <Card className="light-background profile-project mx-auto col-md-6">
                    <Card.Header>{projectInfo.name}</Card.Header>
                    <Card.Body>
                        <p><b>Owner: </b>{projectInfo.owner}</p>
                        <p>{projectInfo.description}</p>
                    </Card.Body>
                    {/** TODO:make link active to project page */}
                    <Card.Footer>
                        <Link className="a-light" to={{
                            pathname:"/project-details/" + projectInfo.id, 
                            state: { projectId: projectInfo.id }
                        }}>View Project</Link>
                    </Card.Footer>
                </Card>
            </div>
        )
    }

    render() {
        return (
            // TODO: need backend call to auto update projects that are active/completed
            <div>
                <div id="project" className="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                    <h1 className="profile-header">Projects</h1>
                </div>
                <div className="py-3">
                    <Link to="/project-add" className="btn button-primary">+ Add Project</Link>
                </div>
                <div id="owned-projects" className="mb-5">
                    <h3 className="pb-3 project-description">Owned:</h3>
                    {
                        this.state.loading? 
                            <DefaultLoader loading={this.state.loading}/>:
                            this.state.owned.map((project, i) => this.getProjectDiv(project, i))
                    }
                </div>
                <div id="contr-projects">
                    <h3 className="pb-3 project-description">Contributed:</h3>
                    {
                        this.state.loading? 
                            <DefaultLoader loading={this.state.loading}/>:
                            this.state.contr.map((project, i) => this.getProjectDiv(project, i))
                    }
                </div>
            </div>
        )
    }
}

export default ProfileProject