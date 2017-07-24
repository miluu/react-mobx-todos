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
  componentDidMount() {
    let input = findDOMNode<HTMLInputElement>(this.refs.newTodoInput);
    input.focus();
  }
  render () {
    return (
      <div className="new-todo">
        <input
          ref="newTodoInput"
          type="text"
          className="new-todo-input"
          placeholder="Add todo here."
          onKeyDown={this.onKeyDown}
        />
      </div>
    );
  }
  onKeyDown (event: React.KeyboardEvent<any>) {
    let input = findDOMNode<HTMLInputElement>(this.refs.newTodoInput);
    let store = this.props.store;
    let title: string;
    if (event.keyCode === 13) { // Enter
      title = input.value.trim();
      input.value = '';
      if (title) {
        store.addTodo(title);
      }
    } else if (event.keyCode === 27) { // ESC
      input.value = '';
    }
  }
}
