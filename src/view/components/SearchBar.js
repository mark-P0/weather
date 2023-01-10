import { LoadingEvent } from 'src/controller/events.js';
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
  };
  const form = E('form', attrs, [Input(), Button()]);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    LoadingEvent.publish(true);
  });

  return form;
}
