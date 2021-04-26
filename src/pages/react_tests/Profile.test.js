import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, queryByTitle } from "react-router-dom";
import {render, fireEvent} from "@testing-library/react"
import Profile from "../profile/Profile"
import Dashboard from "../profile/components/Dashboard"
import App from "../../App"
import ProfileHardware from '../profile/components/ProfileHardware';
import ProfileHome from '../profile/components/ProfileHome';
import Project from '../profile/components/Project';

test("Dummy Test", () => {
    expect(true).toBeTruthy();
})

it("Check Dashboard Render", () => {
    const {queryByTitle} = render(<Profile loggedIn={true}/>);
    const dash = queryByTitle("dashboard");
    expect(dash).toBeTruthy();
})

// test if it were individual anchors instead of map
describe('Page Changes', () => {
    it("onClick", () => {
        const ReactDOM = render(
            <BrowserRouter>
                const {queryByTitle} = render(<Dashboard loggedIn={true}/>);
                const dash = queryByTitle("profPages");
                expect(dash).toBeTruthy();

                const main = queryByTitle("profMain");
                expect(main).toBeTruthy();

                const page = queryByTitle("profHome");
                expect(main.nodeValue).toBe(page);
                
                {/* // const pageProject = queryByTitle("profProject")
                // fireEvent.change(main, {target: {nodeValue: pageProject }})
                // expect(main.nodeValue).toBe("profProject") */}

                fireEvent.click(queryByTitle("projectClick"))

                const pageProject = queryByTitle("profProject")
                expect(main.nodeValue).toBe(pageProject)

                fireEvent.click(queryByTitle("hardwareClick"))

                const pageHardware = queryByTitle("profHardware")
                expect(main.nodeValue).toBe(pageHardware)

                fireEvent.click(queryByTitle("projectClick"))

                const pageHome = queryByTitle("profHome")
                expect(main.nodeValue).toBe(pageHome)
            </BrowserRouter>

        )
    })
})

describe("Logout", () => {
    it("onClick", () => {
        const ReactDOM = render(
            <BrowserRouter>
                const {queryByTitle} = render(<App/>, <Dashboard loggedIn = {true}/>)
                expect(this.loggedIn).toBeTruthy()
                fireEvent.click(queryByTitle("logout"))
                expect(this.loggedIn).toBeFalsy()
            </BrowserRouter>
        )
        
    })
})
