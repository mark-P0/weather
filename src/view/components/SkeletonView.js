import { LoadingEvent } from 'src/controller/events.js';
import { E } from '../dom.js';

/** @type {(classes: string, bg: string) => string} */
function pulse(classes, bg = 'bg-stone-500') {
  return `${classes} ${bg} animate-pulse `;
}

function Location() {
  const city = E('span', {
    class: pulse('inline-block h-6 w-1/3') + 'leading-none',
  });
  const country = E('span', {
    class: pulse('h-3 w-5') + 'absolute bottom-0 ml-2 leading-none',
  });
  const time = E('div', { class: pulse('h-3 w-1/4') + 'mt-1' });

  return E('div', { class: 'grid grid-cols-1 place-items-center' }, [
    E('div', { class: 'w-full relative text-center leading-none' }, [
      city,
      country,
    ]),
    time,
  ]);
}

function Temperature() {
  const main = E('div', { class: 'h-9 flex items-center' }, [
    E('div', { class: pulse('aspect-square h-full rounded-full') }),
    E('div', { class: pulse('aspect-square h-full') + 'ml-3' }),
    E('div', { class: 'h-full grid grid-cols-1 gap-2 ml-1' }, [
      E('div', { class: pulse('aspect-square h-full') }),
      E('div', { class: pulse('aspect-square h-full') }),
    ]),
  ]);
  const feelsLike = E('p', { class: pulse('h-3 w-2/3') });
  const minMax = E('div', { class: 'h-3 flex gap-2' }, [
    E('div', { class: pulse('h-full w-1/4') }),
    E('div', { class: pulse('h-full w-1/4') }),
  ]);

  const name = E('div', { class: pulse('h-4 w-1/3 place-self-end') });
  const description = E('div', { class: pulse('h-3 w-2/3 justify-self-end') });

  return E('section', { class: 'grid grid-cols-[4fr_3fr] gap-2' }, [
    main,
    name,
    feelsLike,
    description,
    minMax,
  ]);
}

function Miscellaneous() {
  const cell = () => {
    const title = E('div', { class: pulse('h-3 w-5/6 col-span-2') });
    const value = E('div', { class: pulse('h-7 w-full') });
    const unit = E('div', { class: pulse('h-4 aspect-square self-end') });

    return E('div', { class: 'grid grid-cols-[3fr_4fr] gap-x-2 gap-y-1' }, [
      value,
      unit,
      title,
    ]);
  };

  return E('section', { class: 'grid grid-cols-[3fr_4fr] gap-5 px-4' }, [
    cell(),
    cell(),
    cell(),
    cell(),
  ]);
}

export function SkeletonView() {
  const element = E(
    'div',
    { class: 'h-full flex flex-col justify-evenly hidden' },
    [Location(), Temperature(), Miscellaneous()]
  );

  LoadingEvent.subscribe(async (status) => {
    if (status) element.classList.remove('hidden');
    else element.classList.add('hidden');
  });

  return element;
}
