import * as mobx from 'mobx';
import * as _ from 'lodash';
import * as uuid from 'uuid/v1';
import {SHOWN_STATUS} from '../constant';

const {observable, computed, autorun} = mobx;

export class Todo {
  @observable private _content: string;
  @observable private _isCompleted: boolean;
  @observable private _updateAt: Date;
  private _createAt: Date;
  private _id: string;
  constructor (title: string) {
    this._id = uuid();
    this._content = title;
    this._isCompleted = false;
    this._createAt = new Date();
    this._updateAt = new Date();
  }
  get content () {
    return this._content;
  }
  set content (title: string) {
    this._content = title;
    this._updateAt = new Date();
  }

  public get isCompleted(): boolean {
    return this._isCompleted;
  }

  public set isCompleted(isCompleted: boolean) {
    this._isCompleted = isCompleted;
    this._updateAt = new Date();
  }

  public get id(): string {
    return this._id;
  }

}

export class Todos {
  @observable
  private _list: Todo[] = [];
  @observable
  title: string;
  @observable
  private _selected: string;
  @observable
  shownStatus: number = SHOWN_STATUS.ALL;
  @observable
  editingTodo: Todo = null;
  constructor () {
    this.title = 'Todos';
  }
  addTodo (title: string) {
    let todo = new Todo(title);
    this._list.unshift(todo);
    return this;
  }
  removeTodo (todo: Todo) {
    _.pull(this._list, todo);
    return this;
  }
  @computed get allCount () {
    return this._list.length;
  }
  @computed get activeCount () {
    return this._list.filter(todo => !todo.isCompleted).length;
  }
  @computed get completedCount () {
    return this.allCount - this.activeCount;
  }
  public get list (): Todo[] {
    return this._list;
  }
  public get shownList (): Todo[] {
    let list: Todo[];
    switch (this.shownStatus) {
      case SHOWN_STATUS.ACTIVE:
        list = this._list.filter(todo => !todo.isCompleted);
        break;
      case SHOWN_STATUS.COMPLETED:
        list = this._list.filter(todo => todo.isCompleted);
        break;
      default:
        list = this._list;
    }
    return list;
  }
}
