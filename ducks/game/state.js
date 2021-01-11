import chess from '../../chess.js';
import phases from './phases.js';

function randomElement(array) {
  return array[Math.floor(array.length * Math.random())];
}

function TileFactory() {
  let tileID = 0;
  return {
    random() {
      return { id: ++tileID, chessman: randomElement(chess.men) };
    },
  }
}

function randomBoard() {
  let board = [];
  let tiler = TileFactory();
  for (const rank of chess.ranks) {
    for (const file of chess.files) {
      const tile = tiler.random();
      const place = { rank, file };
      board.push({ tile, place });
    }
  }
  return board;
}

/** Returns initial state for the Matchess game logic duck. */
export default function State() {
  return {
    phase: phases.PHASE_READY,
    tiles: randomBoard(),
    move: null, // most recent move
    next: null,
  };
}

export function connect(store) {
  // TODO
}
