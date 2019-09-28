import React from 'react';
import './style.css';

const LoginForm = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit
}) => {
  return (
    <div className='container' id='form-container'>
      <div className='card m-auto' style={{ width: '50%' }}>
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
              value='SIGN IN'
              className='btn btn-primary btn-block'
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
