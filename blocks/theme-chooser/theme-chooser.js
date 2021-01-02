import { theme as selector } from '../../ducks/theme/selectors.js';
import { Theme } from '../../ducks/theme/actions.js';
import * as theme from '../../ducks/theme/symbols.js';

function createOption(symbol, label) {
  const option = document.createElement('option');
  option.value = symbol.description;
  option.append(label);
  return option;
}

export default function ThemeChooser(store) {
  const select = document.createElement('select');
  select.classList.add('theme-chooser__select');
  select.append(createOption(theme.SYSTEM, 'System'));
  select.append(createOption(theme.LIGHT, 'Light'));
  select.append(createOption(theme.DARK, 'Dark'));

  store.subscribe(selector, theme => {
    for (const option of select.children) {
      option.selected = option.value === theme.description;
    }
  });

  select.addEventListener('change', event => {
    store.dispatch(Theme(event.target.value));
  });

  const label = document.createElement('label');
  label.classList.add('theme-chooser');
  label.append('Theme');
  label.append(select);

  return {
    node() {
      return label;
    },
  };
}
