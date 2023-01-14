import { E } from '../dom.js';
import { Temperature } from './temperature.js';

/** @type {(label: string, iconCode: string, weather: string, kelvin: number) => HTMLElement} */
export function ForecastSnippet(label, iconCode, weather, kelvin) {
  const temp = new Temperature(E('span'), kelvin);

  let attrs = {
    class:
      'w-1/5 aspect-[3/4] grid place-items-center text-xs font-thin text-stone-400',
  };
  return E('div', attrs, [
    E('span', label),
    E('img', {
      src: `https://openweathermap.org/img/wn/${iconCode}.png`,
      class: 'h-4/5 aspect-square',
    }),
    E('span', { class: 'font-normal text-ellipsis' }, weather),
    temp.element,
  ]);
}
