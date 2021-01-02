import ThemeState, { connect as connectTheme } from './theme/state.js';

export default function State() {
  return {
    theme: ThemeState(),
  };
}

export function connect(store) {
  connectTheme(store);
}
