import React, { Component } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import './project-details.css'

class ProjectDetails extends Component {

    constructor() {
        super();
        this.state = {
            isLogin: true,
        };
    }

    render() {
        return (
            <div className="w-100 boring-background max-height overflow-hidden text-left">
                <Container fluid className="justify-content-center mx-5 my-5 px-5 py-5">

                    <div className="project-title-panel my-5">
                        <div className="project-name text-left">Project Name</div>
                        <div className="project-members">Owner, User 1, User 2, ...</div>
                        <div className="project-tags">
                            <p>Tags:</p>
                            <span className="project-tag">tag1</span>    
                            <span className="project-tag">tag2</span>    
                            <span className="project-tag">tag3</span>    
                            <span className="project-tag">tag4</span>    
                            <span className="project-tag">tag5</span>    
                        </div>
                    </div>

                    <div className="project-description my-3">
                        <h4>Description:</h4>
                        <p>Project description</p>
                    </div>

                    {/* List of HW items */}
                    <div className="project-materials my-3">
                        <h4>Materials</h4>

                        <div className="mx-3">
                            {/* Checked out items */}
                            <h5>Checked Out:</h5>
                            <div className="mx-4">
                                <p>Material 1</p>
                                <p>Material 1</p>
                                <p>Material 1</p>
                                <p>Material 1</p>
                                <p>Material 1</p>
                                <p>Material 1</p>
                                <p>Material 1</p>
                                <p>Material 1</p>
                            </div>
                        </div>
                        
                        <div className="mx-3">
                            {/* Wishlist items */}
                            <h5>Wishlist:</h5>
                            <div className="mx-4">
                                <p>Material 1</p>
                                <p>Material 1</p>
                                <p>Material 1</p>
                                <p>Material 1</p>
                                <p>Material 1</p>
                                <p>Material 1</p>
                                <p>Material 1</p>
                                <p>Material 1</p>
                            </div>
                        </div>
                        <div className="mx-3">
                            <h5>Total:</h5>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}

export default ProjectDetails
