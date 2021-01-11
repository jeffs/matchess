import Tile from '../tile/tile.js';
import chess from '../../chess.js';
import game from '../../ducks/game/game.js';

function placesDiffer(a, b) {
  return a.rank !== b.rank || a.file !== b.file;
}

function createBoard() {
  const rows = chess.ranks.map(() => {
    const cells = chess.files.map(() => {
      const cell = document.createElement('td')
      cell.classList.add('grid__cell');
      return cell;
    });
    const row = document.createElement('tr');
    row.classList.add('grid__row');
    row.append(...cells);
    return row;
  });
  const board = document.createElement('table');
  board.classList.add('grid__board');
  board.append(...rows);
  return board;
}

function addTile(board, node, place) {
  const i = chess.rankIndex(place.rank);
  const j = chess.fileIndex(place.file);
  const cell = board.children[i].children[j];
  if (cell.firstChild) {
    cell.firstChild.replaceWith(node);
  } else {
    cell.append(node);
  }
}

function addTiles(board, tiles) {
  const components = [];
  for (const { tile, place } of tiles) {
    const component = Tile(tile.chessman);
    const node = component.node();
    node.classList.add('grid__tile', 'grid__tile--nodisplay');
    addTile(board, node, place);
    function track(event) {
      const where = event.touches ? event.touches[0] : event;
      const x = where.clientX - node.offsetWidth / 2;
      const y = where.clientY - node.offsetHeight / 2;
      const id = tile.id;
      node.style.top = `${y}px`;
      node.style.left = `${x}px`;
      event.preventDefault();
    }
    node.addEventListener('mousedown', event => {
      const orig = node.getBoundingClientRect();
      node.classList.add('grid__tile--drag');
      track(event);
      document.body.addEventListener('mousemove', track);
      document.body.addEventListener('mouseup', () => {
        const dx = orig.left - node.offsetLeft;
        const dy = orig.top - node.offsetTop;
        const dt = Math.sqrt(dx * dx + dy * dy);
        node.style.transition = `top ${dt}ms, left ${dt}ms`;
        node.style.top = `${orig.top}px`;
        node.style.left = `${orig.left}px`;
        window.setTimeout(() => {
          node.style.transition = '';
          node.classList.remove('grid__tile--drag');
        }, dt);
        document.body.removeEventListener('mousemove', track);
      });
    });
    const impassive = { passive: false };
    node.addEventListener('touchstart', event => {
      node.classList.add('grid__tile--drag');
      track(event);
      document.body.addEventListener('touchmove', track, impassive);
      function cancel() {
        node.classList.remove('grid__tile--drag');
        document.body.removeEventListener('touchmove', track);
      }
      document.body.addEventListener('touchend', cancel, impassive);
      document.body.addEventListener('touchcancel', cancel, impassive);
    }, impassive);
    components.push({ id: tile.id, component: { component, place } });
  }
  return components;
}

function groupByFile(nodes) {
  const fileMap = new Map;
  for (const nodePlace of nodes) {
    const { place } = nodePlace;
    const file = fileMap.get(place.file);
    if (file) {
      file.push(nodePlace);
    } else {
      fileMap.set(place.file, [nodePlace]);
    }
  }
  return fileMap;
}

/* nodes are { Node, Place } objects */
function animateDrop(nodes) {
  const files = Array.from(groupByFile(nodes).values());
  for (const file of files) {
    let altitude = 600 + 120 * chess.ranks.length;
    for (const { node } of file) {
      node.style.transform = `translate(0, ${-altitude}px)`;
      altitude -= 60 * (1 + Math.random());
      const time = altitude - 600;
      window.setTimeout(() => {
        node.classList.remove('grid__tile--nodisplay');
        node.style.transition = `transform ${time}ms ease-in`;
        window.setTimeout(() => node.style.transform = '');
        window.setTimeout(() => node.style.transition = '', time);
      });
    }
  }
}

function mapTileData(tiles) {
  const dataMap = new Map;
  for (const tilePlace of tiles) {
    dataMap.set(tilePlace.tile.id, tilePlace);
  }
  return dataMap;
}

function bucketTiles(tileMap, dataMap) {
  const oldIDs = Array.from(tileMap.keys());
  const newIDs = Array.from(dataMap.keys());
  return {
    old: oldIDs,
    new: newIDs,
    born: newIDs.filter(id => !tileMap.has(id)),
    dead: oldIDs.filter(id => !dataMap.has(id)),
    live: oldIDs.filter(id => {
      const oldTile = tileMap.get(id);
      const newTile = dataMap.get(id);
      return newTile && placesDiffer(oldTile.place, newTile.place);
    }),
  };
}

function handleMove(tileMap, move) {
  const source = tileMap.get(move.source.id);
  const target = tileMap.get(move.target.id);
  if (!source || !target) {
    console.trace('bad move', update.move);
  }
  // TODO: Animate move.
}

function extendTileMap(tileMap, components) {
  for (const { id, component } of components) {
    tileMap.set(id, component);
  }
}

function componentPlacesToNodePlaces(components) {
  return components.map(({ component: componentPlace }) => {
    const { component, place } = componentPlace;
    return { node: component.node(), place };
  });
}

export default function Grid() {
  const board = createBoard();
  const grid = document.createElement('div');
  grid.classList.add('grid');
  grid.append(board); // TODO: Label ranks and files

  const tileMap = new Map;  // ID -> { Component, Place }

  function onTiles(update) {
    const dataMap = mapTileData(update.tiles);
    const ids = bucketTiles(tileMap, dataMap);
    if (update.move) {
      handleMove(tileMap, update.move);
    }
    // TODO: Animate annihilations.
    // TODO: Transition existing tiles.
    const components = addTiles(board, ids.born.map(id => dataMap.get(id)));
    extendTileMap(tileMap, components);
    animateDrop(componentPlacesToNodePlaces(components));
  }

  return {
    connect(store) {
      store.subscribe(game.selectors.tiles, onTiles);
    },

    node() {
      return grid;
    },
  };
}
