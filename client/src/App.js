import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Loginpage from './pages/Loginpage';
import CreateAcc from './pages/CreateAcc';
import Dash from './pages/Dash';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/about' component={Home} />
          <Route exact path='/login' component={Loginpage} />
          <Route exact path='/create' component={CreateAcc} />
          <Route exact path='/dash' component={Dash} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
