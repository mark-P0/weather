import { date2time } from 'src/utilities.js';
import { ForecastUpdateEvent } from 'src/controller/events.js';
import { E } from '../dom.js';
import { ForecastSnippet } from './ForecastSnippet.js';

export function HourlyForecast() {
  const element = E('div', { class: 'flex [&>*]:flex-shrink-0 gap-2' });

  ForecastUpdateEvent.subscribe(async (data) => {
    const forecasts = data?.list;
    const hourly = forecasts.slice(0, 8);

    element.replaceChildren();
    for (const stat of hourly) {
      let args = [
        stat?.dt,
        stat?.weather?.[0]?.icon,
        stat?.weather?.[0]?.main,
        stat?.main?.temp,
      ];
      if (!args.every((arg) => arg)) {
        console.error('Hourly forecast missing details', stat);
        continue;
      }

      args[0] = date2time(new Date(args[0] * 1000));
      element.appendChild(ForecastSnippet(...args));
    }
  });

  return element;
}
