import * as actions from './actions.js';

export default function reducer(state, action) {
  switch (action.type) {
    case actions.Theme:
      return { ...state, theme: action.theme };
    case actions.SystemTheme:
      return { ...state, systemTheme: action.theme };
  }
  return state;
}
