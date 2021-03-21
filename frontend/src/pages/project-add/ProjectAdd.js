import React, { Component } from 'react'
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap'
import '../project-details/project-details.css'

class ProjectAdd extends Component {

    constructor() {
        super();
        this.state = {
            name: "",
            tags: [],
            description: "",
            checked_list: [],
            wish_list: [],
        };
    }

    render() {
        return (
            <div className="w-100 block-color-purple max-height overflow-hidden text-left px-0 py-0 mx-0 my-0 h-100">

                {/* <Form> */}

                    <div className="project-title-panel block-color-title px-5 py-5 w-100 h-50  mx-0 my-0">
                        <div className="col-6 float-left justify-content-center align-items-center row h-100">
                            <div className="">
                                <input type="text" className="project-name text-left custom-input" placeholder="Project Name"/>
                                <div className="project-members">You</div>
                                <div className="project-tags">
                                    <p>Add some tags:</p>
                                    <span className="project-tag">+</span>
                                </div>
                            </div>

                        </div>
                        <div className="col-6 float-left justify-content-center align-items-center row h-100">
                            <div className="px-5 py-5 w-100">
                                <h4>Description:</h4>
                                <textarea className="custom-input w-100" rows="3" placeholder="Description of your project"/>
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
                    <Button variant="primary" onClick={this.onSubmit} className="w-100">
                        Submit
                    </Button>
                {/* </Form> */}
            </div>
        );
    }
}

export default ProjectAdd
