import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard';
import Invitation from './pages/Invitation';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import auth from './utils/auth';
import API from './utils/API';
import './App.css';

class App extends Component {
  state = {
    user: null,
    inviteToken: null
  };

  componentDidMount() {
    if (this.state.user === null && auth.getToken()) {
      API.getUserInfo().then(user => {
        this.setState({
          user
        });
      });
    }
  }

  handleLogin = user => {
    this.setState({ user });
  };

  handleLogout = () => {
    this.setState({ user: null });
  };

  handleInviteAccepted = () => {
    this.setState({
      inviteToken: null
    });
  };

  render() {
    const { user, inviteToken } = this.state;

    return (
      <Router>
        <React.Fragment>
          <Navbar user={user} onLogout={this.handleLogout} />
          <AnimatedSwitch
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}
            className='switch-wrapper container'>
            <Route exact path='/' component={Home} />
            <Route exact path='/about' component={Home} />
            <Route
              exact
              path='/login'
              render={() => (
                <Login
                  inviteToken={inviteToken}
                  onLogin={this.handleLogin}
                  onInviteAccepted={this.handleInviteAccepted}
                />
              )}
            />
            <Route
              path='/invite/:token'
              render={({ match }) => (
                <Invitation
                  token={match.params.token}
                  onInviteAccepted={this.handleInviteAccepted}
                  onInviteRequested={t =>
                    this.setState({
                      inviteToken: t
                    })
                  }
                />
              )}
            />
            <Route exact path='/register' component={Registration} />
            <ProtectedRoute exact path='/dashboard' component={Dashboard} />
          </AnimatedSwitch>
          <Footer />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
