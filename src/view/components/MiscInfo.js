import { deg2compass } from 'src/utilities.js';
import { WeatherUpdateEvent } from 'src/controller/events.js';
import { E } from '../dom.js';

/** @type {(name: string, unit: string) => [(data: any) => void, HTMLElement]} */
function Cell(name, unit) {
  const value = E('span', { class: 'text-xl leading-none' });

  let attrs = {
    class: 'grid grid-cols-[max-content_1fr] gap-x-2 gap-y-1 text-xs',
  };
  return [
    async (newValue) => {
      value.textContent = newValue;
    },
    E('div', attrs, [
      value,
      E('span', { class: 'self-end font-thin leading-none' }, unit),
      E('h3', { class: 'col-span-2 text-stone-400' }, name),
    ]),
  ];
}

export function MiscInfo() {
  const humidity = Cell('Humidity', '%');
  const visibility = Cell('Visibility', 'km.');
  const pressure = Cell('Air Pressure', 'hPa');
  const wind = Cell('Wind', 'm/s');

  WeatherUpdateEvent.subscribe(async (data) => {
    humidity[0](data?.main?.humidity ?? '...');
    visibility[0]((data?.visibility ?? 0) / 1000 || '...');
    pressure[0](data?.main?.pressure ?? '...');

    let deg = data?.wind?.deg;
    let speed = data?.wind?.speed;
    wind[0](deg && speed ? `${deg2compass(deg)} ${speed}` : '...');
  });

  return E('section', { class: 'grid grid-cols-[3fr_4fr] gap-5 px-4' }, [
    humidity[1],
    visibility[1],
    pressure[1],
    wind[1],
  ]);
}
