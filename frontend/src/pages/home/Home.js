import React, { Component } from "react";
import Header from "./components/Header";

import "./Home.css"

class Home extends Component {

    constructor() {
        super();
        this.state = {
        }
    }

    render() {
        return (
            <div className="">
                <Header />
            </div>
        )
    }
}

export default Home
