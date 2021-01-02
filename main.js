import State, { connect } from './ducks/state.js';
import Store from './store.js';
import reducer from './ducks/reducer.js';

import Grid from './blocks/grid/grid.js';
import ThemeChooser from './blocks/theme-chooser/theme-chooser.js';

import { getDocumentStylePropertyValue } from './style.js';

async function main() {
  // Work around a race condition (between JS and CSS loading) by waiting until
  // global styles are loaded before initializing state or components.
  await getDocumentStylePropertyValue('--border-radius');

  // Prevent scrolling on mobile Safari.  This is in addition to the relevant
  // meta tags in index.html and setting `overflow: hidden` in index.css.
  //
  // For a tangentially relevant discussion, see:
  // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Improving_scrolling_performance_with_passive_listeners
  const body = document.body;
  body.addEventListener('touchmove', event => {
    event.preventDefault()
  }, { passive: false });

  const store = Store(reducer, State());
  connect(store);

  const grid = Grid(8, 8);
  const themeChooser = ThemeChooser(store);

  body.append(grid.node(), themeChooser.node());
}

main();
