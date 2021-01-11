import game from './game/game.js';
import theme from './theme/theme.js';

const ducks = {
  game,
  theme,
};

function map(f) {
  return Object.fromEntries(
    Object.entries(ducks).map(([key, duck]) => [key, f(duck, key)])
  );
}

function State() {
  return map(duck => duck.State());
}

function connect(store) {
  map(duck => duck.connect(store));
}

function reducer(state, action) {
  const updates = map((duck, key) => duck.reducer(state[key], action));
  return { ...state, ...updates };
}

export default {
  State,
  connect,
  reducer,
};
