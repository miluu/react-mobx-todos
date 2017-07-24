import * as React from 'react';
import {findDOMNode} from 'react-dom';
import {Todos} from '../model';

interface INewTodoPorps {
  store: Todos;
}

export class NewTodo extends React.Component<INewTodoPorps, undefined> {
  constructor (props: INewTodoPorps) {
    super(props);
    this.onKeyDown = this.onKeyDown.bind(this);
  }
  render () {
    return (
      <div className="new-todo">
        <input
          ref="newTodoInput"
          type="text"
          className="new-todo-input"
          placeholder="Add Todo."
          onKeyDown={this.onKeyDown}
        />
      </div>
    );
  }
  onKeyDown (event: React.KeyboardEvent<any>) {
    let input = findDOMNode<HTMLInputElement>(this.refs.newTodoInput);
    let store = this.props.store;
    let title: string;
    if (event.keyCode === 13) {
      title = input.value.trim();
      input.value = '';
      store.addTodo(title);
    }
  }
}
