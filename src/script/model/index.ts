import * as mobx from 'mobx';
import * as _ from 'lodash';
import * as uuid from 'uuid/v1';
import {SHOWN_STATUS} from '../constant';
import {wilddog} from './loginModel';

const {observable, computed, autorun} = mobx;

export class Todo {
  @observable private _content: string;
  @observable private _isCompleted: boolean;
  @observable private _updateAt: Date;
  private _createAt: Date;
  private _id: string;
  constructor (opts: string|{[key: string]: any}) {
    if (typeof opts === 'string') {
      this._id = uuid();
      this._content = opts;
      this._isCompleted = false;
      this._createAt = new Date();
      this._updateAt = new Date();
    } else {
      this._id = opts.id;
      this._content = opts.content;
      this._isCompleted = opts.isCompleted;
      this._createAt = opts.createAt;
      this._updateAt = opts.updateAt;
    }
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
  @observable
  loginName: string = null;
  constructor () {
    this.title = 'Todos';
    wilddog.auth().onAuthStateChanged((user: any) => {
      if (user) {
          this.loginName = user.displayName || user.email;
      } else {
        this.loginName = null;
        this._list = [];
        this.editingTodo = null;
      }
    });
  }
  addTodo (title: string) {
    let todo = new Todo(title);
    this._list.unshift(todo);
    return this;
  }
  login (email: string, password: string) {
    wilddog.auth().signInWithEmailAndPassword(email, password)
      .catch(err => {
        alert(`Error: ${err.name}` + '\n' + `Message: ${err.message}`);
      });
  }
  logout () {
    wilddog.auth().signOut()
      .catch(err => {
        alert(`Error: ${err.name}` + '\n' + `Message: ${err.message}`);
      });
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
