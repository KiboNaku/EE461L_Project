import React, { Component } from 'react'
import { Form, Card, Table, Dropdown, DropdownButton } from "react-bootstrap";
import * as fetch from "./../../../api_calls/fetchInformation"
import * as handleHardware from '../../../api_calls/handleHardware'
import DefaultLoader from "./../../_utils/DefaultLoader";

class ProfileHardware extends Component {

    constructor() {
        super();
        this.state = {
            hwLoading: true,
            projLoading: true,
            rented: [],
            price_per_unit: [20, 10, 50, 15, 5], // currently unused
            errorString: "",
            projects: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleHwChange = this.handleHwChange.bind(this);
        this.fixString = this.fixString.bind(this);
        this.getFormInfo = this.getFormInfo.bind(this);
        this.returnHW = this.returnHW.bind(this);
        this.assignHW = this.assignHW.bind(this);
        this.handleAssignChange = this.handleAssignChange.bind(this);
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
                let projects = res.data.owned_projects;
                for(let i=0; i<projects.length; i++){
                    projects[i].selectedHw = null;
                }
                this.setState({ projects: projects, projLoading: false });
            });
    }

    handleChange(event){
        this.setState({ [event.target.name]: event.target.value });
    }

    handleHwChange(i, event) {
        let projects = [...this.state.projects];
        let project = {...projects[i]};
        project.selectedHw = event.target.value;
        projects[i] = project;

        this.setState({ projects: projects });
    }

    fixString(hardware) {
        if (!hardware) {
            return "0";
        }
        else {
            return hardware
        }
    }

    getFormInfo() {
        var hw = {};
        this.state.rented.map((item) => (
            hw[item.name] = this.fixString(this.state[item.name])
        ))
        return hw;
    }

    returnHW() {
        this.state.errorString = "";
        var returnList = this.getFormInfo();
        this.setState({hwLoading: true});
        handleHardware.returnHW({
            returnHW: returnList
        }).then(res => {
            if (res.data.success === 0) {
                fetch.fetchUserHardware().then(res => {
                    this.setState({ rented: res.data.rented_hardware, hwLoading: false });
                });
            } else {
                this.setState({ errorString: res.data.error, hwLoading: false });
            }
        })
    }

    handleAssignChange = index => (event) => {
        let assigned = {
            "project": this.state.projects[index],
            "hw": this.state.projects[index].selectedHw,
            "num": event.target.value,
        }

        this.setState({ assigned: this.state.assigned.concat(assigned) })
    }

    assignHW() {
        handleHardware.assignHW(localStorage.getItem("token"), this.state.assigned).then(res => {
            if (res.error) {
                alert(res.error)
            }
        })
    }

    render() {
        
        return (
            <div>
                <div id="ProfileHardware" className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                    <h1 className="h2">Hardware</h1>
                </div>
                <Card className="mb-3 light-background">
                    {this.state.errorString != "" && <Card.Text className="text-danger">Error: {this.state.errorString}</Card.Text>}
                    <Card.Header>Checked Out Hardware</Card.Header>
                    <Card.Body>
                        <Table className="text-light profile-table" bordered >
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Return</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.hwLoading ?

                                        <tr>
                                            <td colspan="4"><DefaultLoader loading={this.state.hwLoading} /></td>
                                        </tr> :
                                        this.state.rented.map((hw, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{hw.name}</td>
                                                    <td>{hw.amount}</td>
                                                    {/* TODO: make this display the actual cost of the rented HW */}
                                                    <td id="hw_price">$$$</td>
                                                    <td>
                                                        <Form>
                                                            <Form.Control name={hw.name} type="number" placeholder="Desired Return Amount" min="0" max={hw.amount} 
                                                            onChange={this.handleChange} />
                                                        </Form>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                }
                            </tbody>
                        </Table>
                        <button type="button" className="btn button-primary" onClick={this.returnHW}>Return Hardware</button>
                    </Card.Body>
                </Card>
                {/* <Card className="mb-3 light-background">
                    <Card.Header>Projects</Card.Header>
                    <Card.Body>
                        <Table className="text-light profile-table" bordered >
                            <thead>
                                <tr>
                                    <th>Project</th>
                                    <th>Hardware</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.projLoading ?

                                    <tr>
                                        <td colspan="3"><DefaultLoader loading={this.state.hwLoading} /></td>
                                    </tr> :
                                    this.state.projects.map((project, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{project.name}</td>
                                                <td>
                                                    <select className="form-select form-select-lg" name="selectValue" value={this.state.projects[i].selectedHw}
                                                        onChange={(event) => {this.handleHwChange(i, event)}}>
                                                        <option value="default">Choose hardware</option>
                                                        {
                                                            this.state.rented.map((hw) => {
                                                                return (
                                                                    <option value={hw.name}>{hw.name}</option>
                                                                );
                                                            })
                                                        }
                                                    </select>
                                                </td>
                                                <td>
                                                    <Form>
                                                        <Form.Control name={project.name} type="number" placeholder="Amount to Assign" min="0" onChange={this.handleAssignChange(i)} />
                                                    </Form>
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </Table>
                        <button type="button" className="btn button-primary" onClick={this.assignHW}>Assign</button>
                    </Card.Body>
                </Card> */}
                {/* <Card className="light-background">
                    <Card.Header>Hardware Wishlist</Card.Header>
                    <Card.Body>
                        <Table className="text-light profile-table" bordered>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>HWSet1</td>
                                    <td>1</td>
                                    <td>$$$</td>
                                </tr>
                                <tr>
                                    <td>HWSet2</td>
                                    <td>1</td>
                                    <td>$$$</td>
                                </tr>
                                <tr>
                                    <td>HWSet3</td>
                                    <td>3</td>
                                    <td>$$$</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>Total: $$$</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card> */}
            </div>
        )
    }
}
export default ProfileHardware
