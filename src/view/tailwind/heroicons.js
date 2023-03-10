/**
 * https://heroicons.com/
 */

import { ENS } from '../dom.js';

export function MagnifyingGlassIcon(cls) {
  let attrs = {
    fill: 'none',
    viewBox: '0 0 24 24',
    'stroke-width': '1.5',
    stroke: 'currentColor',
    class: cls,
  };

  return ENS('http://www.w3.org/2000/svg', 'svg', attrs, [
    ENS('http://www.w3.org/2000/svg', 'path', {
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      d: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z',
    }),
  ]);
}

export function ArrowUpIcon(cls) {
  let attrs = {
    fill: 'none',
    viewBox: '0 0 24 24',
    'stroke-width': '1.5',
    stroke: 'currentColor',
    class: cls,
  };

  return ENS('http://www.w3.org/2000/svg', 'svg', attrs, [
    ENS('http://www.w3.org/2000/svg', 'path', {
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      d: 'M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18',
    }),
  ]);
}
