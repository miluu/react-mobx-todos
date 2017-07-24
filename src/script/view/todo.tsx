import * as React from 'react';
import * as model from '../model';
import {observer} from 'mobx-react';

interface ITodoProp {
  todo: model.Todo;
  store: model.Todos;
}

@observer
export class Todo extends React.Component<ITodoProp, undefined> {
  constructor (props: ITodoProp) {
    super(props);
    this.removeTodo = this.removeTodo.bind(this);
    this.toggleCompleted = this.toggleCompleted.bind(this);
  }
  render () {
    const {todo} = this.props;
    return (
      <div
        className={`todo-item${this.props.todo.isCompleted ? ' completed' : ''}`}
        title={todo.content}
      >
        <div
          className={`checkbox${this.props.todo.isCompleted ? ' checked' : ''}`}
          onClick={this.toggleCompleted}
        ></div>
        <div className="todo-content">{todo.content}</div>
        <button
          className="delete"
          onClick={this.removeTodo}
        >×</button>
      </div>
    );
  }
  removeTodo () {
    const {store, todo} = this.props;
    store.removeTodo(todo);
  }
  toggleCompleted () {
    const {todo} = this.props;
    todo.isCompleted = !todo.isCompleted;
  }
}
