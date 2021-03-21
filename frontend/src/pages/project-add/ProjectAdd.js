import React, { Component } from 'react'
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap'
import '../project-details/project-details.css'

class ProjectAdd extends Component {

    constructor() {
        super();
        this.state = {
            name: "",
            description: "",
            checked_list: [],
            wish_list: [],
            tags: [],
        };
        this.handleGeneralChange = this.handleGeneralChange.bind(this);
        this.addNewTag = this.addNewTag.bind(this);
        this.addNewWish = this.addNewWish.bind(this);
        this.handleTagChange = this.handleTagChange.bind(this);
        this.handleWishChange = this.handleWishChange.bind(this);
    }

    onSubmit() {
        // TODO: send to backend
    }

    handleGeneralChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    addNewTag(event) {
        if (this.state.tags.length > 0 && this.state.tags[this.state.tags.length - 1].trim() == "") return;
        this.setState(prevState => {
            return {
                tags: [...prevState.tags, ""]
            };
        });
    }

    addNewWish(event) {
        if (this.state.wish_list.length > 0 && this.state.wish_list[this.state.wish_list.length - 1].trim() == "") return;
        this.setState(prevState => {
            return {
                wish_list: [...prevState.wish_list, ""]
            };
        });
    }

    handleTagChange(event) {
        let index = parseInt(event.target.name);
        this.setState(prevState => {
            let prevTags = prevState.tags;
            prevTags[index] = event.target.value;
            return {
                ...prevState,
                tags: prevTags
            };
        });
    }

    handleWishChange(event) {
        let index = parseInt(event.target.name);
        this.setState(prevState => {
            let prevTags = prevState.wish_list;
            prevTags[index] = event.target.value;
            return {
                ...prevState,
                wish_list: prevTags
            };
        });
    }

    render() {

        return (
            <div className="w-100 block-color-purple max-height overflow-hidden text-left px-0 py-0 mx-0 my-0 h-100">

                {/* <Form> */}

                <div className="project-title-panel block-color-title px-5 py-5 w-100 h-50  mx-0 my-0">
                    <div className="col-6 float-left justify-content-center align-items-center row h-100">
                        <div className="">
                            <input type="text" className="project-name text-left custom-input" placeholder="Project Name" name="name" value={this.state.name} onChange={this.handleGeneralChange} />
                            <div className="project-members">You</div>
                            <div className="project-tags">
                                <p>Add some tags:</p>
                                {
                                    this.state.tags.map((tag, i) => {
                                        return (
                                            <input type="text" value={tag} name={i} className="project-tag custom-input new-tag" onChange={this.handleTagChange} placeholder="new tag" />
                                        );
                                    })
                                }
                                <div id="add-tag" onClick={this.addNewTag}>+</div>
                            </div>
                        </div>

                    </div>
                    <div className="col-6 float-left justify-content-center align-items-center row h-100">
                        <div className="px-5 py-5 w-100">
                            <h4>Description:</h4>
                            <textarea className="custom-input w-100" rows="3" placeholder="Description of your project" name="description" value={this.state.description} onChange={this.handleGeneralChange} />
                        </div>
                    </div>
                </div>

                {/* List of HW items */}
                <div className="block-color-blue px-5 py-5 w-100 justify-content-center row mx-0 my-0">
                    <table className="table borderless col-7">
                        <thead>
                            <tr>
                                <th scope="col">Wishlist</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.wish_list.map((wish, i) => {
                                    return (
                                        <tr>
                                            <td><input type="text" value={wish} name={i} className="custom-input" onChange={this.handleWishChange} placeholder="new wish" /></td>
                                            <td></td>
                                        </tr>

                                    );
                                })
                            }
                            <tr>
                                <td>
                                    <div id="new-tag" onClick={this.addNewWish}>+</div>
                                </td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Total:</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    <Button variant="primary" onClick={this.onSubmit} className="w-100">
                        Submit
                    </Button>
                </div>
                {/* </Form> */}
            </div>
        );
    }
}

export default ProjectAdd
