import { kelvin2celsius, kelvin2fahrenheit } from 'src/utilities.js';
import {
  WeatherUpdateEvent,
  TempUnitChangeEvent,
  TempUpdateEvent,
} from 'src/controller/events.js';
import { E } from '../dom.js';
import { Radio } from './Radio.js';

/** @type {kelvin2celsius | kelvin2fahrenheit} */
let converter = kelvin2celsius;
TempUnitChangeEvent.subscribe(async (data) => {
  if (data === 'C') converter = kelvin2celsius;
  else if (data === 'F') converter = kelvin2fahrenheit;
  else return;
  TempUpdateEvent.publish(null);
});

/** @type {(data: number | undefined) => string} */
function data2temp(data) {
  if (!data) return '...';
  return Math.round(converter(data)) + '°';
}

function MinMax() {
  const min = E('span', { class: 'text-stone-500 font-normal' });
  const max = E('span', { class: 'text-stone-500 font-normal' });

  let minBase;
  let maxBase;
  const updateTemp = async () => {
    min.textContent = data2temp(minBase);
    max.textContent = data2temp(maxBase);
  };
  WeatherUpdateEvent.subscribe(async (data) => {
    minBase = data?.main?.temp_min;
    maxBase = data?.main?.temp_max;
    updateTemp();
  });
  TempUpdateEvent.subscribe(updateTemp);

  return E('p', { class: 'flex gap-2 text-xs font-thin text-stone-400' }, [
    E('span', 'Min ', [min]),
    E('span', 'Max ', [max]),
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
  const temp = E('span', { class: 'text-sm font-semibold text-stone-500' });

  let tempBase;
  const updateTemp = async () => {
    temp.textContent = data2temp(tempBase);
  };
  WeatherUpdateEvent.subscribe(async (data) => {
    tempBase = data?.main?.feels_like;
    updateTemp();
  });
  TempUpdateEvent.subscribe(updateTemp);

  return E('p', { class: 'text-xs font-thin text-stone-400' }, [
    'Feels like ',
    temp,
  ]);
}

function MainTemp() {
  const img = E('img', { alt: 'Weather icon' });
  const temp = E('h2', { class: 'text-4xl font-bold ml-3' });

  let tempBase;
  const updateTemp = async () => {
    temp.textContent = data2temp(tempBase);
  };
  WeatherUpdateEvent.subscribe(async (data) => {
    const iconID = data?.weather?.[0]?.icon;
    if (iconID) {
      const iconURL = `https://openweathermap.org/img/wn/${iconID}.png`;
      img.setAttribute('src', iconURL);
    }

    tempBase = data?.main?.temp;
    updateTemp();
  });
  TempUpdateEvent.subscribe(updateTemp);

  const buttons = E(
    'div',
    { class: 'flex [&>*]:flex-1 flex-col justify-around ml-1' },
    [Radio('unit', 'C', true), Radio('unit', 'F')]
  );
  buttons.addEventListener('click', ({ target }) => {
    if (!(target instanceof HTMLLabelElement)) return;
    TempUnitChangeEvent.publish(target.textContent);
  });

  return E('div', { class: 'flex items-center' }, [img, temp, buttons]);
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
