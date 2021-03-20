import React, { Component } from "react";
import Header from "./components/Header";
import Landing from "./components/Landing";

import "./Home.css"

class Home extends Component {

    constructor() {
        super();
        this.state = {
        }
    }

    /*Objects to be shown on Homepage*/
    render() {
        return (
            <div className="full-screen-height">
                <Landing />
            </div>
        )
    }
}

export default Home
