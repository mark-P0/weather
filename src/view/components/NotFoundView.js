import { LoadingEvent, NotFoundEvent } from 'src/controller/events.js';
import { E } from '../dom.js';

export function NotFoundView() {
  const location = E('span', {
    class: 'text-stone-500 font-normal',
  });

  let attrs = {
    class:
      'hidden h-full flex flex-col justify-center align-center text-center gap-4',
  };
  const element = E('section', attrs, [
    E('h1', { class: 'text-6xl text-stone-500 font-bold' }, '(⁠｡⁠•́⁠︿⁠•̀⁠｡⁠)'),
    E('p', { class: 'text-xs text-stone-400 font-thin' }, [
      'Sorry! We do not know where ',
      // E('br'),
      location,
      ' is.',
    ]),
  ]);

  LoadingEvent.subscribe(async (status) => {
    if (status) element.classList.add('hidden');
  });
  NotFoundEvent.subscribe(async (search) => {
    location.textContent = search;
    element.classList.remove('hidden');
  });

  return element;
}
