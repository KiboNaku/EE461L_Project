import React from 'react'
import ReactDom from 'react-dom'
import {render, fireEvent, cleanup} from "@testing-library/react"
import Login from "../login/Login"


afterEach(cleanup)

it("Check login render", () => {
    const {queryByTitle} = render(<Login/>);
    const loginCont = queryByTitle("loginContainer");
    expect(loginCont).toBeTruthy();
})