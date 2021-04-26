import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Router} from "react-router-dom";
import {render, fireEvent} from "@testing-library/react"
import Browse from '../browse/Browse';
import App from '../../App';

test('Fake Test', () =>{
    expect(true).toBeTruthy();
  })

  it("browse render", () => {
    const {queryByTitle} = render(<BrowserRouter><App/><Browse loggedIn={true}/></BrowserRouter> );
    const browse = queryByTitle("browse");
    expect(browse).toBeTruthy();
  }) 
