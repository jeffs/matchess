import State from './state.js';
import actions from './actions.js';
import connect from './connect.js';
import reducer from './reducer.js';
import selectors from './selectors.js';
import symbols from './symbols.js';

export default {
  State,
  actions,
  connect,
  selectors,
  reducer,
  symbols,
};

/*
parse.js:export default function parse(name) {
reducer.js:export default function reducer(state, action) {
actions.js:export function Theme(theme) {
actions.js:export function SystemTheme(theme) {
*/
