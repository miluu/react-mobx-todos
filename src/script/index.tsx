import * as React from 'react';
import {render} from 'react-dom';
import {Todos} from './view/todos';
import Devtools from 'mobx-react-devtools';

import * as model from './model';

const domNode = document.querySelector('.container');
const store = new model.Todos();

render(
  <div>
    <Todos store={store} />
    <Devtools />
  </div>,
  domNode
);
