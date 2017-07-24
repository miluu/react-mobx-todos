import * as mobx from 'mobx';
import * as _ from 'lodash';
import * as uuid from 'uuid/v1';

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
  constructor () {
    this.title = 'Todos';
  }
  addTodo (title: string) {
    let todo = new Todo(title);
    this._list.push(todo);
    return this;
  }
  removeTodo (todo: Todo) {
    _.pull(this._list, todo);
    return this;
  }

  public get list() : Todo[] {
    return this._list;
  }

}
