import React from 'react';
import { Link } from 'react-router-dom';

const LoginForm = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit
}) => {
  return (
    <div className='container' id='firstcon'>
      <div className='d-flex justify-content-center h-100'>
        <div className='card '>
          <div className='card-header'>
            <h3>Sign In</h3>
          </div>
          <div className='card-body'>
            <form onSubmit={onSubmit}>
              <div className='input-group form-group'>
                <div className='input-group-prepend'>
                  <span className='input-group-text'></span>
                </div>
                <input
                  type='text'
                  className='form-control'
                  placeholder='E-mail'
                  value={email}
                  onChange={onEmailChange}
                />
              </div>
              <div className='input-group form-group'>
                <div className='input-group-prepend'>
                  <span className='input-group-text'></span>
                </div>
                <input
                  type='password'
                  className='form-control'
                  placeholder='Password'
                  value={password}
                  onChange={onPasswordChange}
                />
              </div>
              <div className='form-group'>
                <input
                  type='submit'
                  value='Login'
                  className='btn login_btn'
                  id='signinbtn'
                />
              </div>
            </form>
          </div>
          <div className='card-footer'>
            <div className='d-flex justify-content-center'>
              <p>Don't have an account?</p>{' '}
              <Link to='/register'>Register Here</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
