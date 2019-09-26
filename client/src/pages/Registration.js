import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import RegForm from '../components/RegForm';
import API from '../utils/API';

class Registration extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: '',
    regComplete: false
  };

  handleSubmit = e => {
    e.preventDefault();

    const { firstName, lastName, email, password, password2 } = this.state;

    API.userRegistration({
      firstName,
      lastName,
      email,
      password,
      password2
    }).then(() => {
      this.setState({
        regComplete: true
      });
    });
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      password,
      password2,
      regComplete
    } = this.state;

    if (regComplete) {
      return <Redirect to='/login' />;
    }

    return (
      <RegForm
        firstName={firstName}
        lastName={lastName}
        email={email}
        password={password}
        password2={password2}
        onFirstNameChange={e =>
          this.setState({
            firstName: e.target.value
          })
        }
        onLastNameChange={e =>
          this.setState({
            lastName: e.target.value
          })
        }
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
        onPassword2Change={e =>
          this.setState({
            password2: e.target.value
          })
        }
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default Registration;
