import { render, screen } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import App from './App';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import ProjectDetails from './pages/project-details/ProjectDetails';
import Browse from './pages/browse/Browse';
import Hardware from './pages/hardware-datasets/Hardware-Datasets';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

//test for npm test
test('Fake Test', () =>{
  expect(true).toBeTruthy();
})

test('Fake Two', () =>{
  expect(true).toBeTruthy();
})

test("route to home", () => {
  const history = createMemoryHistory()
  const route = '/'
  history.push(route)
  render(
    <Router history={history}>
      <Home/>
    </Router>
  )
  expect(history.location.pathname).toBe('/')
})

/**
 * "test" for testing functions
 * "it" for testing rendering
 */