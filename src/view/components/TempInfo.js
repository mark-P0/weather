import {
  WeatherUpdateEvent,
  TempUnitChangeEvent,
} from 'src/controller/events.js';
import { E } from '../dom.js';
import { Radio } from './Radio.js';
import { Temperature } from './temperature.js';

function MinMax() {
  const minmax = () => E('span', { class: 'text-stone-500 font-normal' });
  const min = new Temperature(minmax());
  const max = new Temperature(minmax());
  WeatherUpdateEvent.subscribe(async (data) => {
    min.value = data?.main?.temp_min;
    max.value = data?.main?.temp_max;
  });

  return E('p', { class: 'flex gap-2 text-xs font-thin text-stone-400' }, [
    E('span', 'Min ', [min.element]),
    E('span', 'Max ', [max.element]),
  ]);
}

function Description() {
  const name = E('h2', { class: 'capitalize text-lg font-bold' });
  const description = E('h2', {
    class: 'lowercase first-letter:uppercase text-xs font-thin text-stone-400',
  });

  WeatherUpdateEvent.subscribe(async (data) => {
    name.textContent = data?.weather?.[0]?.main ?? '...';
    description.textContent = data?.weather?.[0]?.description ?? '...';
  });

  return E('div', { class: 'flex flex-col justify-end text-right' }, [
    name,
    description,
  ]);
}

function FeelsLike() {
  const temp = new Temperature(
    E('span', { class: 'text-sm font-semibold text-stone-500' })
  );
  WeatherUpdateEvent.subscribe(async (data) => {
    temp.value = data?.main?.feels_like;
  });

  return E('p', { class: 'text-xs font-thin text-stone-400' }, [
    'Feels like ',
    temp.element,
  ]);
}

function MainTemp() {
  const img = E('img', { alt: 'Weather icon' });
  const temp = new Temperature(E('h2', { class: 'text-4xl font-bold ml-3' }));
  WeatherUpdateEvent.subscribe(async (data) => {
    const iconID = data?.weather?.[0]?.icon;
    if (iconID) {
      const iconURL = `https://openweathermap.org/img/wn/${iconID}.png`;
      img.setAttribute('src', iconURL);
    }

    temp.value = data?.main?.temp;
  });

  const buttons = E(
    'div',
    { class: 'flex [&>*]:flex-1 flex-col justify-around ml-1' },
    [Radio('unit', 'C', true), Radio('unit', 'F')]
  );
  buttons.addEventListener('click', ({ target }) => {
    if (!(target instanceof HTMLLabelElement)) return;
    TempUnitChangeEvent.publish(target.textContent);
  });

  return E('div', { class: 'flex items-center' }, [img, temp.element, buttons]);
}

export function TempInfo() {
  return E('section', [
    E('div', { class: 'flex' }, [
      E('div', { class: 'flex-1 flex flex-col justify-end' }, [
        MainTemp(),
        FeelsLike(),
      ]),
      Description(),
    ]),
    MinMax(),
  ]);
}
