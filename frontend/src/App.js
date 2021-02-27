import Home from './pages/home/Home'
import Login from './pages/login/Login';
import ProjectDetails from './pages/project-details/ProjectDetails';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
	return (
		<Router>
			<div className="App">
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/project-details">
						<ProjectDetails />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
