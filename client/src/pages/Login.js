import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Wrapper from '../components/Wrapper';
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
      const { inviteToken, onLogin, onInviteAccepted } = this.props;
      const onSuccess = () =>
        this.setState({
          loginSuccess: true
        });

      onLogin(user);

      if (inviteToken) {
        API.acceptInvite(inviteToken).then(() => {
          onInviteAccepted();
          onSuccess();
        });
      } else {
        onSuccess();
      }
    });
  };

  render() {
    const { email, password, loginSuccess } = this.state;

    if (loginSuccess) {
      return <Redirect to='/dashboard' />;
    }

    return (
      <Wrapper>
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
      </Wrapper>
    );
  }
}

export default Login;
