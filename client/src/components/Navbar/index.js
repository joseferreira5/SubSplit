import React, { Component, Fragment } from 'react';
import API from '../../utils/API';
import './nav.css';

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
          <a className='nav-link' href='/login'>
            Login
          </a>
        </li>
        <li className='nav-item'>
          <a className='nav-link' href='/register'>
            Register
          </a>
        </li>
      </Fragment>
    );
  }

  renderAuth() {
    const { user } = this.props;

    return (
      <Fragment>
        <li className='nav-text'>Welcome {user.name}</li>
        <li className='nav-item'>
          <a className='nav-link' href='/dashboard'>
            Dashboard
          </a>
        </li>
        <li className='nav-item'>
          <a className='nav-link' href='/' onClick={this.handleLogout}>
            Logout
          </a>
        </li>
      </Fragment>
    );
  }

  render() {
    const { user } = this.props;

    return (
      <nav className='navbar sticky-top navbar-expand-lg navbar-light'>
        <div className='container'>
          <a className='navbar-brand' href='/'>
            <h1>Sub-Split</h1>
          </a>
          <ul className='nav justify-content-end'>
            {user ? this.renderAuth() : this.renderUnauth()}
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
