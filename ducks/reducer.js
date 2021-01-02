import themeReducer from './theme/reducer.js';

export default function reducer(state, action) {
  return { ...state, theme: themeReducer(state.theme, action) };
}
