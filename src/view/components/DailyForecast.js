import { ForecastUpdateEvent } from 'src/controller/events.js';
import { E } from '../dom.js';
import { Temperature } from './temperature.js';

const dateFormatter = new Intl.DateTimeFormat('en-us', { dateStyle: 'medium' });
/**
 * `MMM DD`
 *
 * The formatter returns a date in the format `MMM DD, YYYY`.
 * This function excludes the last six characters from that result. (`, YYYY`)
 * @type {(date: Date) => string}
 */
function date2str(date) {
  return dateFormatter.format(date).slice(0, -(1 + 1 + 4));
}

/** @type {(unix: number, iconCode: string, label: string, kelvin: number) => HTMLElement} */
function Day(unix, iconCode, label, kelvin) {
  const temp = new Temperature(E('span'), kelvin);

  let attrs = {
    class:
      'w-1/5 aspect-[3/4] grid place-items-center text-xs font-thin text-stone-400',
  };
  return E('div', attrs, [
    E('span', date2str(new Date(unix * 1000))),
    E('img', {
      src: `https://openweathermap.org/img/wn/${iconCode}.png`,
      class: 'h-4/5 aspect-square',
    }),
    E('span', { class: 'font-normal text-ellipsis' }, label),
    temp.element,
  ]);
}

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

      element.appendChild(Day(...args));
    }
  });

  return element;
}
