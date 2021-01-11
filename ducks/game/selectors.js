let lastTiles;
function tiles(state) {
  const { tiles, move } = state.game;
  if (!lastTiles || lastTiles.tiles !== tiles || lastTiles.move !== move) {
    lastTiles = { tiles, move };
  }
  return lastTiles;
}

export default {
  tiles,
};
