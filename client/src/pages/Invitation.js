import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import API from '../utils/API';
import auth from '../utils/auth';

export default class Invitation extends Component {
  state = {
    inviteAccepted: false
  };

  componentDidMount() {
    const { token, onInviteAccepted, onInviteRequested } = this.props;

    if (auth.getToken()) {
      API.acceptInvite(token).then(() => {
        this.setState({
          inviteAccepted: true
        });

        onInviteAccepted();
      });
    } else {
      onInviteRequested(token);
    }
  }

  render() {
    if (this.state.inviteAccepted) {
      return <Redirect to='/dashboard' />;
    }

    return (
      <div className='container mt-5'>
        <h3 className='text-center'>Welcome to SubSplit</h3>

        <p className='text-center mt-3'>
          Already have an account? <Link to='/login'>Log in</Link>
        </p>

        <p className='text-center mt-3'>or</p>

        <p className='text-center mt-3'>
          <Link to='/register'>Create an Account</Link>
        </p>
      </div>
    );
  }
}
