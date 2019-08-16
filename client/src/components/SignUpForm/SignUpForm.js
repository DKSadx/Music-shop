import React from 'react';
import { Tween } from 'react-gsap';
import './SignUpForm.scss';

export default function SignUpForm(props) {
  return (
    <div className="sign-up-page">
      <Tween
        from={{
          y: 100,
          opacity: 0
        }}
        to={{
          y: -350,
          opacity: 1
        }}
        duration={0.5}
      >
        <form className="sign-up-form" action="">
          <i className="far fa-times-circle" onClick={() => props.close()} />
          <h2>Sign Up</h2>
          <input type="text" placeholder="Username" pattern="([A-Za-z]|[0-9]|_)+$" required />
          <p>This will be your username. It will be public for everyone.</p>
          <input type="email" placeholder="Email" required />
          <p>We need your email address to verify your account.</p>
          <input type="password" placeholder="Password" pattern=".{6,}" required />
          <p>Make sure it's at least 6 character.</p>
          <input type="password" placeholder="Repeat password" pattern=".{6,}" required />
          <p>Repeat the same password.</p>
          <p className="a-like" onClick={() => props.show('signIn')}>
            Already have an account?
          </p>
          <button className="form-submit-btn">Sign Up</button>
        </form>
      </Tween>
    </div>
  );
}
