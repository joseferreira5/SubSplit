import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import API from '../utils/API';

class Login extends Component {
  state = {
    email: '',
    password: '',
    message: '',
    loginSuccess: false
  };

  handleSubmit = e => {
    e.preventDefault();

    const email = this.state.email.trim();
    const password = this.state.password.trim();

    if (email === '' || password === '') {
      return;
    }

    API.userLogin({
      email,
      password
    }).then(user => {
      this.props.onLogin(user);
      this.setState({
        loginSuccess: true
      });
    });
  };

  render() {
    const { email, password, loginSuccess } = this.state;

    if (loginSuccess) {
      return <Redirect to='/dashboard' />;
    }

    return (
      <LoginForm
        email={email}
        password={password}
        onEmailChange={e =>
          this.setState({
            email: e.target.value
          })
        }
        onPasswordChange={e =>
          this.setState({
            password: e.target.value
          })
        }
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default Login;
