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

    render() {
        return (
            <div className="full-screen-height">
                <Header />
                <Landing />
            </div>
        )
    }
}

export default Home
