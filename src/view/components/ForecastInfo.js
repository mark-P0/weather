import { E } from '../dom.js';
import { Radio } from './Radio.js';
import { DailyForecast } from './DailyForecast.js';

export function ForecastInfo() {
  const forecasts = [DailyForecast(), E('code', 'hourly')];
  const toggleRadios = [
    Radio('forecast', 'Daily', true),
    Radio('forecast', 'Hourly'),
  ];
  const toggles = E('div', toggleRadios);

  toggles.addEventListener('click', ({ target }) => {
    if (!(target instanceof HTMLLabelElement)) return;

    const toggleIdx = toggleRadios.indexOf(target);
    forecasts.forEach((view, idx) => {
      if (idx === toggleIdx) view.classList.remove('hidden');
      else view.classList.add('hidden');
    });
  });
  toggleRadios[0].click();

  return E('section', { class: 'grid gap-2' }, [
    E('div', { class: 'flex justify-between items-center' }, [
      E('h2', { class: 'text-sm ' }, 'Forecasts'),
      toggles,
    ]),
    E('div', { class: 'w-full overflow-auto' }, forecasts),
  ]);
}
