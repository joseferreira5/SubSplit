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
    <div className='container m-5'>
      <div className='d-flex justify-content-center h-100'>
        <div className='card'>
          <div className='card-header text-center'>
            <h3>Log In to SubSplit</h3>
          </div>
          <div className='card-body'>
            <form onSubmit={onSubmit}>
              <div className='input-group form-group'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='E-mail'
                  value={email}
                  onChange={onEmailChange}
                />
              </div>
              <div className='input-group form-group'>
                <input
                  type='password'
                  className='form-control'
                  placeholder='Password'
                  value={password}
                  onChange={onPasswordChange}
                />
              </div>
              <input
                type='submit'
                value='Sign in'
                className='btn btn-primary'
              />
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
