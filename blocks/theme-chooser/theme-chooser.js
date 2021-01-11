import duck from '../../ducks/theme/theme.js';

function createOption(symbol, label) {
  const option = document.createElement('option');
  option.value = symbol.description;
  option.append(label);
  return option;
}

export default function ThemeChooser() {
  const select = document.createElement('select');
  select.classList.add('theme-chooser__select');
  select.append(createOption(duck.symbols.THEME_SYSTEM, 'System'));
  select.append(createOption(duck.symbols.THEME_LIGHT, 'Light'));
  select.append(createOption(duck.symbols.THEME_DARK, 'Dark'));

  const label = document.createElement('label');
  label.classList.add('theme-chooser');
  label.append('Theme');
  label.append(select);

  return {
    connect(store) {
      store.subscribe(duck.selectors.theme, theme => {
        for (const option of select.children) {
          option.selected = option.value === theme.description;
        }
      });
      select.addEventListener('change', event => {
        store.dispatch(duck.actions.Theme(event.target.value));
      });
    },

    node() {
      return label;
    },
  };
}
