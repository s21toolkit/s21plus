function stringToSeed(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash >>> 0;
}

export function seededRandom(str: string) {
  let seed = stringToSeed(str);
  return (seed % 10000) / 10000;
}
