import chess from '../../chess.js';

export default function Tile(chessman) {
  const tile = document.createElement('span');
  tile.classList.add('tile');
  tile.append(chessman);

  return {
    node() {
      return tile;
    },
  }
}
