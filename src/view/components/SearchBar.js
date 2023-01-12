import { current } from 'src/model/openweathermap.js';
import {
  LoadingEvent,
  WeatherUpdateEvent,
  NotFoundEvent,
} from 'src/controller/events.js';
import { E } from '../dom.js';
import { MagnifyingGlassIcon } from '../tailwind/heroicons.js';

function Input() {
  return E('input', {
    type: 'text',
    name: 'search',
    placeholder: 'Search',
    class:
      'flex-1 bg-transparent placeholder:text-stone-400 placeholder:text-sm focus-visible:outline-none',
  });
}

function Button() {
  return E('button', { type: 'submit' }, [
    MagnifyingGlassIcon('aspect-square w-5'),
  ]);
}

export function SearchBar() {
  let attrs = {
    class:
      'flex items-center border-2 border-stone-300 rounded-lg px-3 py-2 gap-3 focus-within:border-stone-500',
    autocomplete: 'off',
  };
  const form = E('form', attrs, [Input(), Button()]);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    LoadingEvent.publish(true);

    const raw = new FormData(form);
    let { search } = Object.fromEntries(raw);

    try {
      if (!search) {
        search = 'that';
        throw search;
      }
      const data = await current(search);
      WeatherUpdateEvent.publish(data);
    } catch (error) {
      NotFoundEvent.publish(search);
      console.error(error);
    }

    LoadingEvent.publish(false);
  });

  return form;
}
