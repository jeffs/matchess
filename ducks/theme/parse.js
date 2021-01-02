import { SYSTEM, LIGHT, DARK } from './symbols.js';

export default function parse(name) {
  for (const theme of [SYSTEM, LIGHT, DARK]) {
    if (theme.description === name) {
      return theme;
    }
  }
  throw `bad theme: ${name}`;
}
