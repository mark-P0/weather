const dateFormatter = new Intl.DateTimeFormat('en-us', { dateStyle: 'medium' });
const timeFormatter = new Intl.DateTimeFormat('en-us', { timeStyle: 'short' });

/**
 * `MMM DD`
 *
 * The formatter returns a date in the format `MMM DD, YYYY`.
 * This function excludes the last six characters from that result. (`, YYYY`)
 *
 * @type {(date: Date) => string}
 */
export function date2str(date) {
  return dateFormatter.format(date).slice(0, -(1 + 1 + 4));
}

/**
 * HH:MM AP
 * @type {(date: Date) => string}
 */
export function date2time(date) {
  return timeFormatter.format(date);
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
