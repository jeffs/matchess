import symbols from './symbols.js';
import parse from './parse.js';
import assert from '../../assert.js';

/** The system theme may be either light or dark. */
function SystemTheme(theme) {
  assert([symbols.THEME_LIGHT, symbols.THEME_DARK].includes(theme));
  return { type: SystemTheme, theme };
}

/**
 * The theme may be any of the symbols (or their string descriptions) defined
 * in ./symbols.js.  THEME_SYSTEM means the effective theme should
 * automatically track the host system.
 */
function Theme(theme) {
  if (!Object.values(symbols).includes(theme)) {
    theme = parse(theme);
  }
  return { type: Theme, theme };
}

export default {
  SystemTheme,
  Theme,
};
