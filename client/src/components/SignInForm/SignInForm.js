import React from 'react';
import './SignInForm.scss';

export default function SignUpForm(props) {
  return (
    <div className="sign-in-page">
      <form className="sign-in-form" action="">
        <i className="far fa-times-circle" onClick={() => props.close()} />
        <h2>Sign in</h2>
        <input type="text" placeholder="Username" pattern="([A-Za-z]|[0-9]|_)+$" required />
        <input type="password" placeholder="Password" pattern=".{6,}" required />
        <p className="a-like" onClick={() => props.show('signUp')}>
          Don't have an account?
        </p>
        <button className="form-submit-btn">Log In</button>
      </form>
    </div>
  );
}
