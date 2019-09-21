import React from 'react';
import './style.css';

const RegForm = ({
  firstName,
  lastName,
  email,
  password,
  password2,
  onFirstNameChange,
  onLastNameChange,
  onEmailChange,
  onPasswordChange,
  onPassword2Change,
  onSubmit
}) => {
  return (
    // <div className="body" background="background.jpg">
    <div className='container register-form'>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <div className='row justify-content-center'>
            <div className='col-md'></div>
            <div className='col-md secondcon rounded'>
              <h3 className='text-center'>Please Sign up!</h3>
              {/* first name */}
              <label className='empas' htmlFor='firstName'>
                First Name
              </label>
              <input
                type='name'
                className='form-control'
                id='firstName'
                aria-describedby='name'
                placeholder='Enter Your First Name'
                value={firstName}
                onChange={onFirstNameChange}
              />
              {/* last name */}
              <label className='empas' htmlFor='exampleInputEmail1'>
                Last Name
              </label>
              <input
                type='name'
                className='form-control'
                id='LastName'
                aria-describedby='name'
                placeholder='Enter Your Last Name'
                value={lastName}
                onChange={onLastNameChange}
              />
              {/* email */}
              <label className='empas' htmlFor='exampleInputEmail1'>
                Email address
              </label>
              <input
                type='email'
                className='form-control'
                id='email'
                aria-describedby='emailHelp'
                placeholder='Enter email'
                value={email}
                onChange={onEmailChange}
              />
              <small id='emailHelp' className='form-text text-muted'>
                We'll never share your email with anyone else.
              </small>
              {/* Password */}
              <label className='empas' htmlFor='exampleInputPassword1'>
                Password
              </label>
              <input
                type='password'
                className='form-control'
                id='password'
                placeholder='Password'
                value={password}
                onChange={onPasswordChange}
              />
              <label className='empas' htmlFor='exampleInputPassword1'>
                Confirm Password
              </label>
              <input
                type='password'
                className='form-control'
                id='password2'
                placeholder='Password'
                value={password2}
                onChange={onPassword2Change}
              />
              <button type='submit' className='submit'>
                Submit
              </button>
            </div>
            <div className='col-md'></div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegForm;
