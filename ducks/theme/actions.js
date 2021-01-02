import * as symbols from './symbols.js';
import parse from './parse.js';
import assert from '../../assert.js';

/**
 * The theme may be any of the symbols defined in ./symbols.js: LIGHT, DARK, or
 * SYSTEM to mean the theme should automatically track the host system.  It may
 * also be the string description of any of those symbols.
 */
export function Theme(theme) {
  if (!Object.values(symbols).includes(theme)) {
    theme = parse(theme);
  }
  return { type: Theme, theme };
}

/** The system theme may be either LIGHT or DARK. */
export function SystemTheme(theme) {
  assert([symbols.LIGHT, symbols.DARK].includes(theme));
  return { type: SystemTheme, theme };
}
