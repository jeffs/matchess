import * as actions from './actions.js';
import * as selectors from './selectors.js';
import parse from './parse.js';
import { SYSTEM, LIGHT, DARK } from './symbols.js';

const query = window.matchMedia('(prefers-color-scheme: dark)');

/** Returns initial state for the theme duck. */
export default function State() {
  const theme = window.localStorage.getItem('theme');
  return {
    theme: theme ? parse(theme) : SYSTEM,
    systemTheme: query.matches ? DARK : LIGHT,
  };
}

export function connect(store) {
  query.addEventListener('change', event => {
    store.dispatch(actions.SystemTheme(event.matches ? DARK : LIGHT));
  });
  store.subscribe(selectors.theme, theme => {
    window.localStorage.setItem('theme', theme.description);
  });
  store.subscribe(selectors.effectiveTheme, theme => {
    document.documentElement.setAttribute('data-theme', theme.description);
  });
}
