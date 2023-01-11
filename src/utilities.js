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
