import { LoadingEvent } from 'src/controller/events.js';
import { E } from '../dom.js';
import { ArrowUpIcon } from '../tailwind/heroicons.js';

export function ArrowPrompt() {
  const element = E('div', { class: 'animate-bounce w-min mx-auto mt-4' }, [
    ArrowUpIcon('aspect-square w-8'),
  ]);

  LoadingEvent.subscribe(async () => {
    element.classList.add('hidden');
  });

  return element;
}
