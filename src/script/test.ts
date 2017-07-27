import * as wd from 'wilddog';
import * as $ from 'jquery';

const form = $('#form');
const input = $('#input');
const clearBtn = $('#clear');
const pool = $('.labels-pool');
let labels: {
  [key: string]: JQuery;
} = {};
input.focus();
const config = {
  syncURL: 'https://hello-world-miluu.wilddogio.com/labelClound'
};
wd.initializeApp(config);
const ref = wd.sync().ref();
(<any>window).ref = ref;
(<any>window).randomColor = randomColor;

ref.on('child_added', snap => {
  if (!snap) {
    return;
  }
  addLabel(snap.key(), snap.val());
});
ref.on('child_removed', snap => {
  if (!snap) {
    return;
  }
  removeLabel(snap.key());
});

function addLabel (key: string, val: string) {
  let transform = `translate(${Math.random() * 400 + 50}px,${Math.random() * 290}px)`;
  console.log(transform);
  let newLabel = $(`<div class="label">${val}</div>`);
  newLabel.css({
    color: randomColor(),
    transform: transform,
    fontSize: `${randomScale() * 20}px`
  });
  labels[key] = newLabel;
  pool.append(newLabel);
  newLabel.on('dblclick', () => {
    ref.child(key).remove();
  });
}
function removeLabel (key: string) {
  const label = labels[key];
  label.off().remove();
  delete labels[key];
}
function randomColor () {
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += random16();
  }
  return color;
}
function random16 () {
  const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
  const r = Math.floor(Math.random() * 16);
  return arr[r] || '0';
}
function randomRotation () {
  return Math.random() * 180 - 90;
}
function randomScale () {
  return Math.random() * 1.5 + 0.5;
}
form.on('submit', (e) => {
  e.stopPropagation();
  const val = (<string>input.val()).trim();
  input.val('');
  if (val) {
    ref.push(val).catch(e => console.error(e));
  }
  return false;
});
clearBtn.on('click', () => {
  ref.remove().catch(e => console.error(e));
});
