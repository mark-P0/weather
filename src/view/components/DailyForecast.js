import { date2str } from 'src/utilities.js';
import { ForecastUpdateEvent } from 'src/controller/events.js';
import { E } from '../dom.js';
import { ForecastSnippet } from './ForecastSnippet.js';

export function DailyForecast() {
  const element = E('div', { class: 'flex [&>*]:flex-shrink-0' });

  /* TODO: Is the first forecasted temp for a day accurate enough? */
  ForecastUpdateEvent.subscribe(async (data) => {
    const forecasts = data?.list;

    let day = new Date().getDate();
    element.replaceChildren();
    for (const stat of forecasts) {
      /* Get only daily forecasts */
      const date = new Date(stat?.dt * 1000);
      const statDay = date.getDate();
      if (statDay <= day) continue;
      day = statDay;

      let args = [
        stat?.dt,
        stat?.weather?.[0]?.icon,
        stat?.weather?.[0]?.main,
        stat?.main?.temp,
      ];
      if (!args.every((arg) => arg)) {
        console.error('Daily forecast missing details', stat);
        continue;
      }

      args[0] = date2str(new Date(args[0] * 1000));
      element.appendChild(ForecastSnippet(...args));
    }
  });

  return element;
}
