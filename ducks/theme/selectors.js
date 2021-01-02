import { SYSTEM } from './symbols.js';

export function theme(state) {
  return state.theme.theme;
}

export function effectiveTheme(state) {
  const { theme, systemTheme } = state.theme;
  return theme === SYSTEM ? systemTheme : theme;
}
