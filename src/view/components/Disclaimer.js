import { E } from '../dom.js';

export function Disclaimer() {
  return E('p', { class: 'text-xs text-stone-400 text-center font-thin' }, [
    'Powered by ',
    E('a', 'OpenWeatherMap', {
      href: 'https://openweathermap.org/',
      target: '_blank',
      class: 'font-medium text-orange-500 hover:underline',
    }),
  ]);
}
