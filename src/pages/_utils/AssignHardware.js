import { Component } from "react";
import { Form, Card, Table, Dropdown, DropdownButton, Row, Col } from "react-bootstrap";
import * as fetch from "../../api_calls/fetchInformation"
import * as handleHardware from '../../api_calls/handleHardware'
import DefaultLoader from "./DefaultLoader";

class AssignHardware extends Component {

    constructor(props) {
        super(props);

        this.state = {
            errorString: "",
            hwLoading: true,
            projLoading: true,
            rented: [],
            projects: [],
            assign: {
                project: null,
                hw: null,
                amount: 0,
            }
        }

        this.updateAssign = this.updateAssign.bind(this);
        this.assignHW = this.assignHW.bind(this);   
    }


    componentDidMount() {
        fetch
            .fetchUserHardware()
            .then(res => {
                this.setState({ rented: res.data.rented_hardware, hwLoading: false });
            });

        fetch
            .fetchUserProjects()
            .then(res => {
                this.setState({ projects: res.data.owned_projects, projLoading: false });
            });
    }

    updateAssign(key, value) {
        this.setState((prevState) =>
        ({
            assign: {
                ...prevState.assign,
                [key]: value
            }
        })
        )
    }

    assignHW() {

        if(!this.state.assign.project){
            this.setState({errorString: "You must select a valid project"});
        } else if(!this.state.assign.hw){
            this.setState({errorString: "You must select a valid hardware"});
        } else if(this.state.assign.amount < 1){
            this.setState({errorString: "You must enter a valid hardware amount (>=1)"});
        } else {

            this.setState({hwLoading: true});

            handleHardware.assignHW(localStorage.getItem("token"), this.state.assign).then(res => {
                if (res.error) {
                    alert(res.error)
                } else {
                    this.props.assignHw();
                    this.setState({hwLoading: false});
                    alert("You have successfully assigned " + this.state.assign.amount + "x " + this.state.assign.hw.name + " to " + this.state.assign.project.name );
                }
            })
        }
    }

    render() {
        return (
            <Form>

                {this.state.projLoading || this.state.hwLoading ?
                    <DefaultLoader loading={this.state.hwLoading || this.state.projLoading} /> :
                    <div>
                        <p className="text-danger">{this.state.errorString}</p>
                        <Form.Group as={Row}>
                            <Form.Label column sm="5" className="a-dark">Project</Form.Label>
                            <Col sm="5">
                                <div className="dropdown">
                                    <button className="btn button-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {this.state.assign.project == null ? "Choose a project" : this.state.assign.project.name}
                                    </button>
                                    <div className="dropdown-menu">

                                        {
                                            this.state.projects.map((project) => {
                                                return (
                                                    <a className="dropdown-item" key={project} value={project.name} onClick={
                                                        (e) => {
                                                            this.updateAssign("project", project);
                                                        }
                                                    }>{project.name}</a>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="5" className="a-dark">Hardware</Form.Label>
                            <Col sm="5">
                                <div className="dropdown">
                                    <button className="btn button-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {this.state.assign.hw == null ? "Choose a hardware" : this.state.assign.hw.name}
                                    </button>
                                    <div className="dropdown-menu">

                                        {
                                            this.state.rented.map((hw) => {
                                                return (
                                                    <a className="dropdown-item" key={hw} value={hw.name} onClick={
                                                        (e) => {
                                                            this.updateAssign("hw", hw);
                                                        }
                                                    }>{hw.name}</a>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="5" className="a-dark">How many?</Form.Label>
                            <Col sm="5">
                                <Form.Control className="textbox" type="number" placeholder="Number to assign" onChange={
                                    (e) => {
                                        this.updateAssign("amount", e.target.value)
                                    }
                                }/>
                            </Col>
                        </Form.Group>

                        <button type="button" className="btn button-primary" onClick={this.assignHW}>Assign</button>
                    </div>
                }
            </Form>
        );
    }
}

export default AssignHardware;