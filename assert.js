export default function assert(condition) {
  if (!condition) {
    throw 'assertion failed';
  }
}
