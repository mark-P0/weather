/**
 * HH:MM AP
 * @type {(date: Date) => string}
 */
export function date2str(date) {
  let hr = date.getHours();
  let min = date.getMinutes();
  let meridiem = 'AM';
  if (hr >= 12) {
    hr -= 12;
    meridiem = 'PM';
  }
  if (hr === 0) {
    hr = 12;
  }
  return `${hr}:${min} ${meridiem}`;
}

/**
 * https://stackoverflow.com/a/25867068/11389648
 * @type {(deg: number) => string}
 */
export function deg2compass(deg) {
  const eqv = Math.floor(deg / 22.5 + 0.5);
  /* prettier-ignore */
  const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  return dirs[eqv % 16];
}

/** @type {(K: number) => number} */
export function kelvin2celsius(K) {
  return K - 273.15;
}

/** @type {(K: number) => number} */
export function kelvin2fahrenheit(K) {
  return kelvin2celsius(K) * (9 / 5) + 32;
}

/** @type {(value: any) => boolean} */
export function isNullish(value) {
  /* Can `??` be used here? */
  return value === null || value === undefined;
}
