import React from 'react';
import './nav.css';

const Navbar = props => {
  return (
    // <div className = "header clearfix container">
    //     <div className = "title"><h1>{props.children}</h1></div>
    //     <div className="login">
    //      <h3> <a href = "#" >Login/Create Account {props.login}</a></h3>
    //     </div>
    // </div>
    //

    <nav className='navbar navbar-expand-lg navbar-light container '>
      <a className='navbar-brand' href='/'>
        <h1>Sub-Split</h1>
      </a>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarNav'
        aria-controls='navbarNav'
        aria-expanded='false'
        aria-label='Toggle navigation'>
        <span className='navbar-toggler-icon'></span>
      </button>
      <div className='collapse navbar-collapse' id='navbarNav'>
        <ul className='navbar-nav ml-auto'>
          <li className='nav-item active'>
            <a className='nav-link' href='/dash'>
              Dashboard<span className='sr-only'>(current)</span>
            </a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='login'>
              Login
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
