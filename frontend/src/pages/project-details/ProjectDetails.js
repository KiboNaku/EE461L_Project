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
            <div className="w-100 block-color-purple max-height overflow-hidden text-left px-0 py-0 mx-0 my-0 h-100">

                <div className="project-title-panel block-color-title px-5 py-5 w-100 h-50  mx-0 my-0">
                    <div className="col-6 float-left justify-content-center align-items-center row h-100">
                        <div className="">
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

                    </div>
                    <div className="col-6 float-left justify-content-center align-items-center row h-100">
                        <div className="px-5 py-5">
                            <h4>Description:</h4>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing</p>
                        </div>
                    </div>
                </div>

                {/* List of HW items */}
                <div className="block-color-blue px-5 py-5 w-100 justify-content-center row mx-0 my-0">
                    <table className="table borderless col-7">
                        <thead>
                            <tr>
                                <th scope="col">Checked</th>
                                <th scope="col"></th>
                                <th scope="col">Wishlist</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Item 1</td>
                                <td>$20</td>
                                <td>Wish 1</td>
                                <td>$20</td>
                            </tr>
                            <tr>
                                <td>Item 2</td>
                                <td>$20</td>
                                <td>Wish 2</td>
                                <td>$20</td>
                            </tr>
                            <tr>
                                <td>Item 3</td>
                                <td>$10</td>
                                <td>Wish 3</td>
                                <td>$20</td>
                            </tr>
                            <tr>
                                <td>Item 4</td>
                                <td>$1</td>
                                <td>Wish 4</td>
                                <td>$20</td>
                            </tr>
                            {/* <tr>
                                <td>Item 5</td>
                                <td>$1000</td>
                                <td>Wish 5</td>
                                <td>$20</td>
                            </tr>
                            <tr>
                                <td>Item 6</td>
                                <td>$20000</td>
                                <td>Wish 6</td>
                                <td>$20</td>
                            </tr> */}
                            <tr>
                                <td className="font-weight-bold">Total:</td>
                                <td>$20000</td>
                                <td></td>
                                <td>$200</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ProjectDetails
