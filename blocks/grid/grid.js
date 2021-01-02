import Tile from '../tile/tile.js';

/**
 * Returns the top or left value of a cell preceded by the specified
 * `multiplier` number of rows or columns, respectively.
 */
function calcOffset(multiplier) {
  return `calc(var(--grid-gutter) + (var(--tile-size) + var(--grid-gutter)) * ${multiplier})`;
}

/**
 * Invokes the specified callback when the specified node is mounted (at most once).
 * Note that this does not, in practice, poll the DOM at 60 Hz.  See:
 * https://swizec.com/blog/how-to-wait-for-dom-elements-to-show-up-in-modern-browsers
 */
function onMount(node, callback) {
  if (document.body.contains(node)) {
    callback();
  } else {
    window.requestAnimationFrame(() => onMount(node, callback));
  }
}

function dropTiles(tiles, m, n) {
  for (let j = 0; j < n; ++j) {
    let dt = 0;
    for (let i = m; i-- > 0;) {
      dt += 0.6 + 0.3 * Math.random() * i;
      const tile = tiles[i][j];
      const dy = `calc(${-tile.offsetTop}px + ${calcOffset(i)})`;
      tile.style.transform = `translate3d(0, ${dy}, 0)`;
      tile.style.transition = `transform ${2 * dt / m}s ease-in`;
    }
  }
}

// * Add tiles for each column at random (but ordered) heights.
// * Wait until the grid is mounted.
//   - rAF: https://swizec.com/blog/how-to-wait-for-dom-elements-to-show-up-in-modern-browsers
// * Schedule a callback to move the tiles into place.
function addTiles(div, m, n) {
  div.style.height = calcOffset(m);
  div.style.width = calcOffset(n);
  const tiles = Array(m).fill().map(() => Array(n));
  for (let j = 0; j < n; ++j) {
    let altitude = 0;
    for (let i = m; i-- > 0;) {
      // +1 so tiles never overlap.
      altitude += Math.floor(Math.random() * m * 2) + 1;
      const tile = tiles[i][j] = Tile().node();
      tile.classList.add('grid__tile', 'tile--dp2');
      tile.style.top = calcOffset(-altitude);
      tile.style.left = calcOffset(j);
      div.append(tile);
    }
  }
  onMount(div, () => dropTiles(tiles, m, n));
}

/** Returns a grid of m rows by n columns. */
export default function Grid(m, n) {
  const div = document.createElement('div');
  div.classList.add('grid');
  addTiles(div, m, n);

  return {
    node() {
      return div;
    },
  };
}
