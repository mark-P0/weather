import { date2str } from 'src/utilities.js';
import { WeatherUpdateEvent } from 'src/controller/events.js';
import { E } from '../dom.js';

function City() {
  const element = E('span', { class: 'text-2xl font-semibold leading-none' });

  WeatherUpdateEvent.subscribe(async (data) => {
    element.textContent = data?.name ?? '';
  });

  return element;
}

function Country() {
  const element = E('span', {
    class:
      'absolute bottom-0 ml-2 text-xs font-thin text-stone-400 leading-none',
  });

  WeatherUpdateEvent.subscribe(async (data) => {
    element.textContent = data?.sys?.country ?? '';
  });

  return element;
}

function Time() {
  const time = E('span', { class: 'font-normal' });

  WeatherUpdateEvent.subscribe(async (data) => {
    const unixEpochSecs = data?.dt ?? 0;
    const milliseconds = unixEpochSecs * 1000;
    time.textContent = date2str(new Date(milliseconds));
  });

  return E('p', { class: 'mt-1 text-xs font-thin' }, ['As of ', time]);
}

export function LocationInfo() {
  return E('div', { class: 'grid place-items-center' }, [
    E('h1', { class: 'relative leading-none' }, [City(), Country()]),
    Time(),
  ]);
}
