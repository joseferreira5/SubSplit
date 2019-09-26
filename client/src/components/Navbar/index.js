import React, { Component, Fragment } from 'react';
import auth from '../../utils/auth';
import './nav.css';

class Navbar extends Component {
  state = {
    authState: false
  };

  componentDidMount() {
    if (auth.isAuthenthicated()) {
      this.setState({ authState: true });
    }
  }

  render() {
    const unauthNav = (
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

    const authNav = (
      <Fragment>
        <li className='nav-item'>
          <a className='nav-link' href='/'>
            Logout
          </a>
        </li>
      </Fragment>
    );

    return (
      <nav className='navbar navbar-expand-lg navbar-light'>
        <div className='container'>
          <a className='navbar-brand' href='/'>
            <h1>Sub-Split</h1>
          </a>
          <ul className='navbar-nav ml-auto'>
            {this.state.authState ? authNav : unauthNav}
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
