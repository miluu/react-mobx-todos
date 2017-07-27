import * as React from 'react';

export class LoginForm extends React.Component {
  render () {
    return (
      <div className="login-form">
        <form>
          <input type="text" ref="userName" className="login-input"/>
          <input type="password" ref="password" className="login-input"/>
          <button className="login-btn">Login in</button>
        </form>
      </div>
    );
  }
}
