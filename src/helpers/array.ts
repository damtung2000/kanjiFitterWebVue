export function range(
  size: number,
  startAt: number = 0
): ReadonlyArray<number> {
  return [...Array(size).keys()].map((i) => i + startAt);
}

export function splitArrayIntoChunks<Type>(
  array: Type[],
  chunkSize: number
): Type[][] {
  if (chunkSize <= 0) return [];
  const arrayOfChunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    arrayOfChunks.push(chunk);
  }
  return arrayOfChunks;
}
