export default function removeOne<T>(array: T[], el: T) {
  var index = array.indexOf(el);
  if (index != -1) {
    array.splice(index, 1); /*from w  ww. j a va 2 s  . c om*/
  }
  return array;
}
