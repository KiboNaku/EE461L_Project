import React, { Component } from 'react';
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import {Link} from "react-router-dom"
import * as fetch from "./../../../api_calls/fetchInformation"

class Project extends Component {

    constructor(){
        super();
        this.state = {
            owned: [],
            contr: []
        }
        this.getProjectDiv = this.getProjectDiv.bind(this);
    }

    componentDidMount(){
        fetch
            .fetchUserProjects()
            .then(res => {
                this.setState({owned: res.data.owned_projects, contr: res.data.contr_projects});
            });
    }

    getProjectDiv(projectInfo, i){
        return(
            
            <div className="mb-3" key={i}>
                <Card className="light-background" style={{ marginInline:"auto", width: "60%", height: "auto" }}>
                    <Card.Header>{projectInfo.name}</Card.Header>
                    <Card.Body>
                        <p><b>Owner:</b>{projectInfo.owner}</p>
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
                <div id="Project" className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                    <h1 className="h2">Projects</h1>
                </div>
                <div className="mb-3">
                    <Link to="/project-add" className="btn button-primary">+ Add Project</Link>
                </div>
                <div id="owned-projects" className="mb-5">
                    <h3 >Owned:</h3>
                    {
                        this.state.owned.map((project, i) => this.getProjectDiv(project, i))
                    }
                </div>
                <div id="contr-projects">
                    <h3>Contributed:</h3>
                    {
                        this.state.contr.map((project, i) => this.getProjectDiv(project, i))
                    }
                </div>
            </div>
        )
    }
}
export default Project