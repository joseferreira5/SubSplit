import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
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
          <Link className='nav-link' to='/login'>
            Login
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/register'>
            Register
          </Link>
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
          <Link className='nav-link' to='/dashboard'>
            Dashboard
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/' onClick={this.handleLogout}>
            Logout
          </Link>
        </li>
      </Fragment>
    );
  }

  render() {
    const { user } = this.props;

    return (
      <nav className='navbar sticky-top navbar-expand-lg navbar-light'>
        <div className='container'>
          <Link className='navbar-brand' to='/'>
            <h1>Sub-Split</h1>
          </Link>
          <ul className='nav justify-content-end'>
            {user ? this.renderAuth() : this.renderUnauth()}
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
