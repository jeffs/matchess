import ducks from './ducks/ducks.js';
import Store from './store.js';

import Grid from './blocks/grid/grid.js';
import ThemeChooser from './blocks/theme-chooser/theme-chooser.js';

import { cssLoaded } from './style.js';

/**
 * Prevent scrolling on mobile Safari.  This is in addition to the relevant
 * meta tags in index.html and setting `overflow: hidden` in root.css.
 *
 * For a tangentially relevant discussion, see:
 * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Improving_scrolling_performance_with_passive_listeners
 */
function preventScrollOnTouch() {
  document.documentElement.addEventListener('touchmove', event => {
    event.preventDefault()
  }, { passive: false });
}

/**
 * Sets body dimensions to fit viewport.  This is shockingly tricky because of
 * a mobile Safari bug that Apple claims is a feature, because mobile Chrome is
 * buggy as hell, and because Apple now requires that even Firefox on iOS use
 * WebKit instead of Gecko.
 *
 * For partial history, see:
 * https://medium.com/@susiekim9/how-to-compensate-for-the-ios-viewport-unit-bug-46e78d54af0d
 */
function fitViewport() {
  // If we update the body dimensions immediately (rather than on timeout),
  // mobile Firefox sometimes ignores them.
  window.setTimeout(() => {
    document.body.style.height = `${window.innerHeight}px`;
    document.body.style.width = `${window.innerWidth}px`;
    window.scrollTo(0, 1);
  });
}

async function main() {
  await cssLoaded();
  preventScrollOnTouch();
  window.setTimeout(fitViewport);
  window.addEventListener('resize', fitViewport);

  const grid = Grid();
  const themeChooser = ThemeChooser();
  app.append(grid.node(), themeChooser.node());

  const store = Store(ducks.reducer, ducks.State());
  ducks.connect(store);

  grid.connect(store);
  themeChooser.connect(store);
}

main();
