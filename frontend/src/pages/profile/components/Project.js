import React, { Component } from 'react'
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import * as fetch from "./../../../api_calls/fetchInformation"

 class Project extends Component {

    componentDidMount(){
        fetch.fetchUserProjects();
    }

    render() {
        return (
            // TODO: need backend call to auto update projects that are active/completed
            <div>
                <div id="Project" className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                    <h1 className="h2">Projects</h1>
                </div>
                <div id="In Progress" class="mb-5">
                    <h3 >In Progress:</h3>
                    <div class="mb-3">
                        <Card className="light-background" style={{ marginInline:"auto", width: "60%", height: "auto" }}>
                            <Card.Header>Project 1</Card.Header>
                            <Card.Body>
                                <p>Some info about project</p>
                            </Card.Body>
                            {/** TODO:make link active to project page */}
                            <Card.Footer><a className="a-light" href="#">Project Page</a></Card.Footer>
                        </Card>
                    </div>
                    <div class="mb-3">
                        <Card className="light-background" style={{ marginInline:"auto", width: "60%", height: "auto" }}>
                            <Card.Header>Project 2</Card.Header>
                            <Card.Body>
                                <p>Some info about project</p>
                            </Card.Body>
                            {/** TODO:make link active to project page */}
                            <Card.Footer><a className="a-light" href="#">Project Page</a></Card.Footer>
                        </Card>
                    </div>
                    <div class="mb-3">
                        <Card className="light-background" style={{ marginInline:"auto", width: "60%", height: "auto" }}>
                            <Card.Header>Project 3</Card.Header>
                            <Card.Body>
                                <p>Some info about project</p>
                            </Card.Body>
                            {/** TODO:make link active to project page */}
                            <Card.Footer><a className="a-light" href="#">Project Page</a></Card.Footer>
                        </Card>
                    </div>
                    <div class="mb-3">
                        <Card className="light-background" style={{ marginInline:"auto", width: "60%", height: "auto" }}>
                            <Card.Header>Project 4</Card.Header>
                            <Card.Body>
                                <p>Some info about project</p>
                            </Card.Body>
                            {/** TODO:make link active to project page */}
                            <Card.Footer><a className="a-light" href="#">Project Page</a></Card.Footer>
                        </Card>
                    </div>
                </div>
                <div id="Completed">
                    <h3>Completed:</h3>
                    <div class="mb-3">
                        <Card className="light-background" style={{ marginInline:"auto", width: "60%", height: "auto" }}>
                            <Card.Header>Project 5</Card.Header>
                            <Card.Body>
                                <p>Some info about project</p>
                            </Card.Body>
                            {/** TODO:make link active to project page */}
                            <Card.Footer><a className="a-light" href="#">Project Page</a></Card.Footer>
                        </Card>
                    </div>
                    <div class="mb-3">
                        <Card className="light-background" style={{ marginInline:"auto", width: "60%", height: "auto" }}>
                            <Card.Header>Project 6</Card.Header>
                            <Card.Body>
                                <p>Some info about project</p>
                            </Card.Body>
                            {/** TODO:make link active to project page */}
                            <Card.Footer><a className="a-light" href="#">Project Page</a></Card.Footer>
                        </Card>
                    </div>
                    <div class="mb-3">
                        <Card className="light-background" style={{ marginInline:"auto", width: "60%", height: "auto" }}>
                            <Card.Header>Project 7</Card.Header>
                            <Card.Body>
                                <p>Some info about project</p>
                            </Card.Body>
                            {/** TODO:make link active to project page */}
                            <Card.Footer><a className="a-light" href="#">Project Page</a></Card.Footer>
                        </Card>
                    </div>
                    <div class="mb-3">
                        <Card className="light-background" style={{ marginInline:"auto", width: "60%", height: "auto" }}>
                            <Card.Header>Project 8</Card.Header>
                            <Card.Body>
                                <p>Some info about project</p>
                            </Card.Body>
                            {/** TODO:make link active to project page */}
                            <Card.Footer><a className="a-light" href="#">Project Page</a></Card.Footer>
                        </Card>
                    </div>
                </div>  
            </div>
        )
    }
}
export default Project