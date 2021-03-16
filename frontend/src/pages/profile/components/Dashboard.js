import React, { Component } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap'
 
class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
        }
    }

    render() {
        function toggle(id){
            const target = document.getElementById(id);
            if(!target) return
            const divs = document.querySelectorAll('.div');
            for (const div of divs){
                div.style.display = 'none';

            }
            target.style.display = 'block';
        }
        
        return (
            <div class="container-fluid">
                <div class="row">
                    <nav class="col-md-2 d-none d-md-block bg-light sidebar">
                    <div class="sidebar-sticky">
                        <ul class="nav flex-column">
                        <li class="nav-item">
                            <a class="nav-link active" href="#menu" onclick="toggle('Menu');">
                            <span data-feather="home"></span>
                            Menu <span class="sr-only">(current)</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#billing" onclick="toggle('Billing');">
                            <span data-feather="file"></span>
                            Billing
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#project" onclick="toggle('Project');">
                            <span data-feather="shopping-cart"></span>
                            Project
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="hardware" onclick="toggle('Hardware');">
                            <span data-feather="users"></span>
                            Hardware
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#dataset" onclick="toggle('Dataset');">
                            <span data-feather="bar-chart-2"></span>
                            Dataset
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">
                            <span data-feather="bar-chart-2"></span>
                            Sign Out
                            </a>
                        </li>
                        </ul>
                    </div>
                    </nav>

                    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                    <div id="Menu" class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                        <h1 class="h2">Menu</h1>
                        {/* <div class="btn-toolbar mb-2 mb-md-0">
                        <div class="btn-group mr-2">
                            <button class="btn btn-sm btn-outline-secondary">Share</button>
                            <button class="btn btn-sm btn-outline-secondary">Export</button>
                        </div>
                        <button class="btn btn-sm btn-outline-secondary dropdown-toggle">
                            <span data-feather="calendar"></span>
                            This week
                        </button>
                        </div> */}
                    </div>
                    <div id="Billing" class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                        <h1 class="h2">Billing</h1>
                    </div>

                    </main>
                </div>
            </div>  
        )
    }
}
export default Dashboard;
