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

/**
 * Peeks at the value of the named global (:root) style property.
 *
 * Note that there's a race condition between JS and CSS on page load:  Root
 * styles may not be loaded by the time JS modules are running.  (For me, this
 * happens maybe once every five page loads, and only on mobile.)  Await the
 * async function `getDocumentStylePropertyValue` to ensure that styles have
 * been loaded before proceeding.
 */
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
    }, 100);
  });
}

export async function getDocumentStylePropertyValues(...names) {
  return Promise.all(names.map(getDocumentStylePropertyValue))
}
