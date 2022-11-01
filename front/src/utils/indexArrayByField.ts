export default function indexArrayByField<T>(
  array: T[],
  field: keyof T
): {
  [id: string]: T;
} {
  const out = Object.fromEntries(array.map((el) => [el[field], el]));
  return out;
}
