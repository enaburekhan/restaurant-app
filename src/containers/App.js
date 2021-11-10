import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Signup';

import Login from './Login';
// import NavBar from '../components/NavBar';

// import Home from '../components/Home';

function App() {
  return (

    <div className="container">
      <div className="row">
        <Router>
          <div className="col-3">
            {/* <NavBar /> */}
          </div>
          <Switch>
            <div className="col-9">
              <Route exact path="/Signup" component={Signup} />
              <Route exact path="/Login" component={Login} />

              {/* <Route exact path="/" component={Home} /> */}

            </div>
          </Switch>
        </Router>
      </div>

    </div>

  );
}

export default App;
