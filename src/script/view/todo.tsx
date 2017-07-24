import * as React from 'react';
import * as model from '../model';
import {observer} from 'mobx-react';
import {findDOMNode} from 'react-dom';

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
    this.onKeyDown = this.onKeyDown.bind(this);
    this.edit = this.edit.bind(this);
  }
  render () {
    const {todo, store} = this.props;
    const isEditing = store.editingTodo === todo;
    return (
      <div
        className={`todo-item${this.props.todo.isCompleted ? ' completed' : ''}`}
        title={isEditing ? '' : todo.content}
      >
        {
          isEditing
          ? this.renderEditor()
          : this.renderContent()
        }
      </div>
    );
  }
  componentDidUpdate () {
    if (this.refs.todoEditorInput) {
      let input = findDOMNode<HTMLInputElement>(this.refs.todoEditorInput);
      input.focus();
    }
  }
  renderEditor () {
    return (
      <div className="todo-editor">
        <input
          type="text"
          className="todo-editor-input"
          onKeyDown={this.onKeyDown}
          defaultValue={this.props.todo.content}
          ref="todoEditorInput"
        />
      </div>
    );
  }
  renderContent () {
    const {todo} = this.props;
    return (
      <div>
        <div
          className={`checkbox${this.props.todo.isCompleted ? ' checked' : ''}`}
          onClick={this.toggleCompleted}
        ></div>
        <div className="todo-content" onDoubleClick={this.edit}>{todo.content}</div>
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
  onKeyDown (event: React.KeyboardEvent<any>) {
    const {todo, store} = this.props;
    const input = findDOMNode<HTMLInputElement>(this.refs.todoEditorInput);
    let newContent: string;
    if (event.keyCode === 13) {
      newContent = input.value.trim();
      store.editingTodo = null;
      if (newContent) {
        todo.content = newContent;
      }
    } else if (event.keyCode === 27) {
      store.editingTodo = null;
    }
  }
  edit () {
    const {todo, store} = this.props;
    store.editingTodo = todo;
  }
}
