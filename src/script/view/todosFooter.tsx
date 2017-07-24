import * as React from 'react';
import {Todos} from '../model';
import {SHOWN_STATUS} from '../constant';
import {observer} from 'mobx-react';

interface ITodosProp {
  store: Todos;
}
@observer
export class TodosFooter extends React.Component<ITodosProp, undefined> {
  render () {
    const {store} = this.props;
    return (
      <div className="todos-footer">
        <div className="todos-count">Active Todos: {store.activeCount} / {store.allCount}</div>
        <div className="shown-status">
          <span className={`status${this.props.store.shownStatus === SHOWN_STATUS.ALL ? ' active' : ''}`} onClick={() => this.changeShownStatus(SHOWN_STATUS.ALL)}>All</span>
          <span className={`status${this.props.store.shownStatus === SHOWN_STATUS.ACTIVE ? ' active' : ''}`} onClick={() => this.changeShownStatus(SHOWN_STATUS.ACTIVE)}>Active</span>
          <span className={`status${this.props.store.shownStatus === SHOWN_STATUS.COMPLETED ? ' active' : ''}`} onClick={() => this.changeShownStatus(SHOWN_STATUS.COMPLETED)}>Completed</span>
        </div>
      </div>
    );
  }
  changeShownStatus (status: number) {
    const {store} = this.props;
    store.shownStatus = status;
  }
}
