import * as React from 'react';
import {findDOMNode} from 'react-dom';
import {Todos} from '../model';

interface ILoginFormProp {
  store: Todos;
}

export class LoginForm extends React.Component<ILoginFormProp, undefined> {
  constructor (props: ILoginFormProp) {
    super(props);
    this.login = this.login.bind(this);
  }
  render () {
    return (
      <div className="login-form">
        <form onSubmit={this.login}>
          <input type="text" ref="userName" className="login-input"/>
          <input type="password" ref="password" className="login-input"/>
          <button className="login-btn" type="submit">Login in</button>
        </form>
      </div>
    );
  }
  login (e: React.FormEvent<any>) {
    e.preventDefault();
    const {store} = this.props;
    const userNameInput = findDOMNode<HTMLInputElement>(this.refs.userName);
    const passwordInput = findDOMNode<HTMLInputElement>(this.refs.password);
    const userName = userNameInput.value;
    const password = passwordInput.value;
    store.login(userName, password);
  }
}
