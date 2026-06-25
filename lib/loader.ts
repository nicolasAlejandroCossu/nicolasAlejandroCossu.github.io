/**
 * Tiny dependency-free pub/sub that lets the Hero start its intro exactly when
 * the Preloader curtain lifts — without prop-drilling or a state library.
 */
let done = false;
const subscribers = new Set<() => void>();

export function markLoaderDone() {
  if (done) return;
  done = true;
  subscribers.forEach((fn) => fn());
  subscribers.clear();
}

export function onLoaderDone(cb: () => void): () => void {
  if (done) {
    cb();
    return () => {};
  }
  subscribers.add(cb);
  return () => subscribers.delete(cb);
}

export function isLoaderDone() {
  return done;
}
