import Header from './pages/home/components/Header'
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import ProjectDetails from './pages/project-details/ProjectDetails';
import Browse from './pages/browse/Browse';
import Hardware from './pages/hardware-datasets/Hardware-Datasets';
import ProjectAdd from './pages/project-add/ProjectAdd';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Project from './pages/profile/components/Project';

function App() {
	return (
		<Router>
			<div className="App">
                <Header />
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
					<Route path="/project-add">
						<ProjectAdd />
					</Route>
					<Route path="/profile">
						<Profile />
					</Route>
					<Route path="/browse">
						<Browse />
					</Route>
					<Route path="/hardware">
						<Hardware />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
