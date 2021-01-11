import query from './query.js';
import selectors from './selectors.js';
import symbols from './symbols.js';

export default function connect(store) {
  query.dark.addEventListener('change', event => {
    const value = event.matches ? symbols.THEME_DARK : symbols.THEME_LIGHT;
    const action = actions.SystemTheme(value);
    store.dispatch(action);
  });
  store.subscribe(selectors.theme, theme => {
    window.localStorage.setItem('theme', theme.description);
  });
  store.subscribe(selectors.effectiveTheme, theme => {
    document.documentElement.setAttribute('data-theme', theme.description);
  });
}
