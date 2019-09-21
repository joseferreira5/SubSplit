import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard';
import Wrapper from './components/Wrapper';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Wrapper>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/about' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Registration} />
            <ProtectedRoute exact path='/dashboard' component={Dashboard} />
          </Switch>
        </Wrapper>
      </div>
    </Router>
  );
}

export default App;
