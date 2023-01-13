import { LoadingEvent, WeatherUpdateEvent } from 'src/controller/events.js';
import { E } from '../dom.js';
import { LocationInfo } from './LocationInfo.js';
import { TempInfo } from './TempInfo.js';
import { ForecastInfo } from './ForecastInfo.js';
import { MiscInfo } from './MiscInfo.js';

export function InfoView() {
  let attrs = { class: 'h-full flex flex-col justify-evenly hidden' };
  const element = E('article', attrs, [
    LocationInfo(),
    TempInfo(),
    ForecastInfo(),
    MiscInfo(),
  ]);

  LoadingEvent.subscribe(async (status) => {
    if (status) element.classList.add('hidden');
  });
  WeatherUpdateEvent.subscribe(async () => {
    element.classList.remove('hidden');
  });

  return element;
}
