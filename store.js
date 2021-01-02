function notify(watchers, state, cache) {
  // We call all the selectors on every dispatch, but the cache saves us from
  // notifying listeners unless their selector's result has actually changed.
  const values = new Map(
    Array.from(watchers.keys(), selector => [selector, selector(state)])
  );
  for (const [selector, listeners] of watchers.entries()) {
    const value = values.get(selector);
    if (!cache.has(selector) || cache.get(selector) !== value) {
      for (const listener of listeners) {
        listener(value);
      }
    }
  }
  return values;
}

/**
 * Encapsulate mutable state behind an event-driven interface. 
 *
 * The notion of a store object is based loosely on Redux, and many of the
 * terms used here (dispatch, action, reducer, selector, etc.) are borrowed
 * from the Redux ecosystem.  However, note that this is entirely new code, and
 * the design is neither a copy nor a reimplementation of Redux.  It is not
 * meant to support Redux middleware, nor is there a `getState` method.
 *
 * The specified reducer must be a binary function accepting (1) the existing
 * state and (2) an action.  The reducer returns a new state value, which may
 * or may not differ from the old value.  The reducer must not block, mutate
 * its arguments, or have side effects.
 *
 * The reducer may accept whatever kinds of actions you find useful.  Once the
 * store has been constructed, you can pass actions to the store’s `dispatch`
 * method to have them forwarded to the reducer.  There is one exception to
 * this flexibility:  Dispatching a function (unlike any other type of action)
 * will cause the store to call that function, passing itself as an argument.
 * Such dispatched functions are often called thunks in the Redux world, and
 * they are useful for representing asynchronous operations (like network
 * calls) that do not represent immediate, atomic state changes or reducer
 * calls.
 *
 * In addition to dispatching actions (to trigger state updates by the
 * reducer), callers may subscribe listeners (i.e., callback functions) using
 * selectors.  Selectors are functions that receive the entire store state, and
 * return some value (direct or computed) from the state.  Whenever an action
 * is dispatched, causing a potential state update by the reducer, the store
 * invokes each selector to which listeners have subscribed; and if the
 * selector returns a different value than the last time it was called, its
 * listeners are passed the new value.
 *
 * Information flow is thus one-way and purely functional:  State at any time
 * results deterministically from its initial value, reducer function, and a
 * sequence of serially dispatched actions.  Thunks and listeners may have side
 * effects, but neither directly affects store state.
 */
export default function Store(reducer, state) {
  // Cache selector results, so as not to call listeners spuriously.
  let cache = new Map; // { [selector, value]... }
  const watchers = new Map; // { [selector, [listener...]]... }

  return {
    /**
     * Schedules the supplied reducer to be invoked with the specified action,
     * the store state to be replaced by the reducer's return value, and any
     * subscribed listeners to be passed updated selector results if those
     * results are affected by the state update.
     */
    dispatch(action) {
      if (typeof action === 'function') {
        action(this);
      } else {
        state = reducer(state, action);
        cache = notify(watchers, state, cache);
      }
    },

    /**
     * Passes the result of the specified selector to the specified listener
     * immediately, and again whenever any dispatched action causes the
     * selector result to change.
     */
    subscribe(selector, listener) {
      const listeners = watchers.get(selector);
      if (listeners) {
        listeners.push(listener);
      } else {
        watchers.set(selector, [listener]);
      }
      listener(selector(state));
    },
  };
}
