export default function removeOne<T>(array: T[], el: T) {
  const index = array.indexOf(el);
  if (index != -1) {
    array.splice(index, 1);
  }
  return array;
}
