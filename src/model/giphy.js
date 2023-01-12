/**
 * https://developers.giphy.com/docs/api/endpoint
 * https://developers.giphy.com/explorer/?
 */

import { read } from './firebase.js';

const API_KEY = await read('giphy');

/** @type {(query: string) => Promise<any>} */
export async function translate(query) {
  const url = new URL('https://api.giphy.com/v1/gifs/translate');
  url.searchParams.append('api_key', API_KEY);
  url.searchParams.append('s', query);

  const res = await fetch(url, { mode: 'cors' });
  const json = await res.json();
  if (!res.ok) throw json;
  return json;
}
