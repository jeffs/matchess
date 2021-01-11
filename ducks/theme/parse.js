import symbols from './symbols.js';

/**
 * Returns the theme having the specified description, or undefined if no theme
 * matches the description.
 */
export default function parse(description) {
  for (const theme of Object.values(symbols)) {
    if (theme.description === description) {
      return theme;
    }
  }
}
