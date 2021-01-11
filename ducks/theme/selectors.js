import symbols from './symbols.js';

function effectiveTheme(state) {
  const { theme, systemTheme } = state.theme;
  return theme === symbols.THEME_SYSTEM ? systemTheme : theme;
}

function theme(state) {
  return state.theme.theme;
}

export default {
  effectiveTheme,
  theme,
};
