import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap'
import * as projects from './../../api_calls/editProject'
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
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit() {
        projects.addProject(
            {
                name: this.state.name,
                description: this.state.description,
                checked_list: this.state.checked_list,
                wish_list: this.state.wish_list,
                tags: this.state.tags
            }
        )
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
        if (!this.props.loggedIn) {
            return <Redirect to='/' />
        }

        return (
            <div className="dark-background max-height text-left px-0 py-0 mx-0 my-0 container">
                {/* <Form> */}
                <div className="project-title-panel block-color-title px-2 px-sm-5 py-5 mx-0 my-0 row">
                    <div className="align-items-center col-xl-6">
                        <div className="px-sm-5 py-5">
                            <input type="text" className="project-name-input text-left custom-input" placeholder="Project Name" name="name" value={this.state.name} onChange={this.handleGeneralChange} />
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
                                <div id="add-tag" onClick={this.addNewTag}>
                                    <AddIcon />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="align-items-center col-xl-6">
                        <div className="px-sm-5 py-5 w-100">
                            <h4>Description:</h4>
                            <textarea className="custom-input w-100" rows="3" placeholder="Description of your project" name="description" value={this.state.description} onChange={this.handleGeneralChange} />
                        </div>
                    </div>
                </div>
                <div className="justify-content-center text-center px-5 py-5 mx-0 my-0">
                    <Button onClick={this.onSubmit} className="w-50 button-primary">
                        Submit
                    </Button>
                </div>

                {/* List of HW items */}
                {/* <div className="light-background px-5 py-5 w-100 justify-content-center row mx-0 my-0"> */}
                {/* <table className="table borderless col-7 text-light">
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
                    </table> */}

                {/* </div> */}
                {/* </Form> */}
            </div>
        );
    }
}

export default ProjectAdd
