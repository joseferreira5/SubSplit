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
    <div className='container register-form mt-5 '>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <div className='row justify-content-center'>
            <div className='col-md'></div>

            <div className='col-md secondcon rounded pb-3'>
              <h3 className='text-center'>Sign Up to SubSplit</h3>
              {/* first name */}
              <label className='empas mt-2' htmlFor='firstName'>
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
              <label className='empas mt-2' htmlFor='exampleInputEmail1'>
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
              <label className='empas mt-2' htmlFor='exampleInputEmail1'>
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
              <label className='empas mt-2' htmlFor='exampleInputPassword1'>
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
              <label className='empas mt-2' htmlFor='exampleInputPassword1'>
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

              <button type='submit' className='btn btn-primary btn-block mt-2'>
                Register
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
