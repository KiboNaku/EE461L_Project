import React, { Component } from 'react';
import "./Landing.css"

class Landing extends Component {

    render() {
        return (
            <div className="cover-container d-flex h-100 p-3 mx-auto flex-column">
                <header className="mb-auto" />

                <main role="main" className="inner cover row mx-0 my-0">
                    <div className="cover-text mx-auto py-4">
                        <h1 className="cover-heading">Website Name</h1>
                        <p className="lead">Find your passion project here today.</p>
                        <p className="lead">
                            <a href="#" className="btn btn-lg btn-secondary">Learn more</a>
                        </p>
                    </div>
                </main>

                <footer className="mt-auto" />
            </div>
        )
    }
}

export default Landing
