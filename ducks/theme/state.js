import actions from './actions.js';
import parse from './parse.js';
import query from './query.js';
import selectors from './selectors.js';
import symbols from './symbols.js';

/** Returns initial state for the theme duck. */
export default function State() {
  const stored = window.localStorage.getItem('theme');
  const parsed = stored && parse(stored);
  return {
    theme: parsed || symbols.THEME_SYSTEM,
    systemTheme: query.dark.matches ? symbols.THEME_DARK : symbols.THEME_LIGHT,
  };
}
