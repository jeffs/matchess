/**
 * Returns the current value of the specified CSS expression.  The expression
 * must be of the form accepted by the CSS `calc` function.
 */
export function calc(expr) {
  const dummy = document.createElement('div');
  Object.assign(dummy.style, {
    position: 'absolute',
    height: `calc(${expr})`,
    zIndex: -1,
  });
  try {
    document.body.append(dummy);
    return dummy.offsetHeight;
  } finally {
    dummy.remove();
  }
}

/** Peeks at the value of the named global (:root) style property. */
export function getDocumentStylePropertyValueSync(name) {
  const style = window.getComputedStyle(document.documentElement);
  return style.getPropertyValue(name);
}

/**
 * Returns the value of the named global (:root) style property, polling the
 * DOM until that property is available.  The property is considered
 * "available" when its string value is non-empty.
 */
export async function getDocumentStylePropertyValue(name) {
  const PERIOD = 100; // Poll every 100ms; i.e., at 10Hz.
  const value = getDocumentStylePropertyValueSync(name);
  if (value) {
    return value;
  }
  return new Promise(resolve => {
    const interval = window.setInterval(() => {
      const value = getDocumentStylePropertyValueSync(name);
      if (value) {
        window.clearInterval(interval);
        resolve(value);
      }
    }, PERIOD);
  });
}

export async function getDocumentStylePropertyValues(...names) {
  return Promise.all(names.map(getDocumentStylePropertyValue))
}

/**
 * Works around a race condition (between JS and CSS loading) by waiting until
 * global styles are loaded before initializing state or components.
 *
 * For me, JS starts executing before JS is loaded maybe once every five page
 * loads, and only on mobile. -- @jeffs
 */
export async function cssLoaded() {
  await getDocumentStylePropertyValue('--loaded');
}
