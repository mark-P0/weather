import { LoadingEvent, WeatherUpdateEvent } from 'src/controller/events.js';
import { E } from '../dom.js';
import { LocationInfo } from './LocationInfo.js';

export function InfoView() {
  const element = E(
    'article',
    { class: 'h-full flex flex-col justify-evenly hidden' },
    [LocationInfo()]
  );

  LoadingEvent.subscribe(async (status) => {
    if (status) element.classList.add('hidden');
  });
  WeatherUpdateEvent.subscribe(async () => {
    element.classList.remove('hidden');
  });

  return element;
}
