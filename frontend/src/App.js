import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import ProjectDetails from './pages/project-details/ProjectDetails';
import Browse from './pages/browse/Browse';
import Hardware from './pages/hardware-datasets/Hardware-Datasets';
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
					<Route path="/profile">
						<Profile />
					</Route>
					<Route path="browse">
						<Browse />
					<Route path="/hardware">
						<Hardware />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
