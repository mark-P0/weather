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
