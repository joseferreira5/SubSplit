import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import API from '../../utils/API';
import './style.css';

class Navbar extends Component {
  handleLogout = e => {
    e.preventDefault();

    API.userLogout().then(() => {
      this.props.onLogout();
    });
  };

  renderUnauth() {
    return (
      <Fragment>
        <li className='nav-item'>
          <Link className='nav-link' id='login-link' to='/login'>
            LOG IN
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' id='register-link' to='/register'>
            SIGN UP
          </Link>
        </li>
      </Fragment>
    );
  }

  renderAuth() {
    const { user } = this.props;

    return (
      <Fragment>
        <span className='navbar-text mr-4'>Welcome, {user.name}</span>
        <li className='nav-item'>
          <Link className='nav-link' id='dashboard-link' to='/dashboard'>
            DASHBOARD
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            className='nav-link'
            id='logout-link'
            to='/'
            onClick={this.handleLogout}>
            LOG OUT
          </Link>
        </li>
      </Fragment>
    );
  }

  render() {
    const { user } = this.props;

    return (
      <nav className='navbar sticky-top navbar-expand-lg navbar-light'>
        <Link className='navbar-brand ml-5' id='brand' to='/'>
          <h1>
            <strong>SubSplit</strong>
          </h1>
        </Link>
        <ul className='nav ml-auto' id='nav'>
          {user ? this.renderAuth() : this.renderUnauth()}
        </ul>
      </nav>
    );
  }
}

export default Navbar;
