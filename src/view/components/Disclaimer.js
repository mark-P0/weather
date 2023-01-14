import { E } from '../dom.js';

/** @type {(text: string, href: string, classes: string) => HTMLElement} */
function Link(text, href, classes) {
  return E('a', text, {
    href,
    target: '_blank',
    class: `font-medium hover:underline ${classes}`,
  });
}

export function Disclaimer() {
  return E('p', { class: 'text-xs text-stone-400 text-center font-thin' }, [
    'Powered by ',
    Link('OpenWeatherMap', 'https://openweathermap.org/', 'text-orange-500'),
    ' & ',
    Link('GIPHY', 'https://giphy.com/', 'text-emerald-400'),
  ]);
}
