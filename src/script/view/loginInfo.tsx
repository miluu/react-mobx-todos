import * as React from 'react';
import {Todos} from '../model';

interface ILoginInfoProp {
  store: Todos;
}

export class LoginInfo extends React.Component<ILoginInfoProp, undefined> {
  constructor (props: ILoginInfoProp) {
    super();
    this.logout = this.logout.bind(this);
  }
  render () {
    const {store} = this.props;
    return (
      <div className="login-info">
        <span>Welcom, </span>
        <span>{store.loginName}. </span>
        <a href="javascript: void (0);" className="login-out-link" onClick={this.logout}>Login out</a>
      </div>
    );
  }
  logout () {
    const {store} = this.props;
    store.logout();
  }
}
