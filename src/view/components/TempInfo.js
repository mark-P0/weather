import { kelvin2celsius, kelvin2fahrenheit } from 'src/utilities.js';
import { WeatherUpdateEvent } from 'src/controller/events.js';
import { E } from '../dom.js';

/* TODO: Swap between converters! */
/** @type {kelvin2celsius | kelvin2fahrenheit} */
let converter = kelvin2celsius;

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

  return E('p', { class: 'text-xs font-thin text-stone-400' }, [
    'Feels like ',
    temp,
  ]);
}

/** @type {(name: string, text: string, isDefault: boolean) => HTMLElement} */
function Radio(name, text, isDefault = false) {
  let attrs = [
    {
      class: [
        'text-sm text-stone-400 font-thin border-transparent border-2 px-1 text-center h-full aspect-square leading-none',
        'hover:text-black hover:border-inherit',
        /**
         * As of January 2023, the `:has()` is NOT supported on Firefox,
         * as well as VSCode's browser preview.
         * https://developer.mozilla.org/en-US/docs/Web/CSS/:has#browser_compatibility
         */
        '[&:has(input:checked)]:text-black [&:has(input:checked)]:font-bold',
      ].join(' '),
    },
    { type: 'radio', name, class: 'appearance-none' },
  ];
  if (isDefault) attrs[1].checked = true;

  return E('label', attrs[0], [E('input', attrs[1]), text]);
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

  const buttons = E(
    'div',
    { class: 'flex [&>*]:flex-1 flex-col justify-around ml-1' },
    [Radio('unit', 'C', true), Radio('unit', 'F')]
  );

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
