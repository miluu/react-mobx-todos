import * as React from 'react';
import {observer} from 'mobx-react';
import * as model from '../model';
import {Todo} from './todo';
import {NewTodo} from './newTodo';
import {TodosFooter} from './todosFooter';

interface ITodosProp {
  store: model.Todos;
}

@observer
export class Todos extends React.Component<ITodosProp, undefined> {
  render () {
    const {store} = this.props;
    return (
      <div className="todos">
        <h1 className="todos-title">{store.title}</h1>
        <div className="todos-content">
          <NewTodo store={store} />
          <div className="list">
            {
              store.shownList.map(todo => <Todo key={todo.id} todo={todo} store={store} />)
            }
          </div>
          <TodosFooter store={store} />
        </div>
      </div>
    );
  }
}
