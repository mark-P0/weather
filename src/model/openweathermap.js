/**
 * https://openweathermap.org/
 * https://openweathermap.org/api
 */

import { read } from './firebase.js';

const API_KEY = await read('openweathermap');

/**
 * https://openweathermap.org/current
 * @type {(query: string) => Promise<any>}
 */
export async function current(query) {
  const url = new URL('https://api.openweathermap.org/data/2.5/weather');
  url.searchParams.append('APPID', API_KEY);
  url.searchParams.append('q', query);

  const res = await fetch(url, { mode: 'cors' });
  const json = await res.json();
  if (!res.ok) throw json;
  return json;
}
