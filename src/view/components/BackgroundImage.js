import { translate } from 'src/model/giphy.js';
import {
  WeatherUpdateEvent,
  NotFoundEvent,
  LoadingEvent,
} from 'src/controller/events.js';
import { E } from '../dom.js';

export function BackgroundImage() {
  let shouldHide = false;
  const img = E('img', {
    class: 'h-full w-full object-cover',
  });
  const overlay = E('div', {
    class: 'absolute top-0 left-0 h-full w-full bg-stone-900 opacity-80',
  });

  LoadingEvent.subscribe(async (status) => {
    if (status) {
      img.classList.add('hidden');
      shouldHide = false;
    } else if (!shouldHide) img.classList.remove('hidden');
  });

  NotFoundEvent.subscribe(async () => {
    shouldHide = true;
  });

  WeatherUpdateEvent.subscribe(async (data) => {
    const query = data?.weather?.[0]?.description;
    if (!query) {
      console.error('No searchable query for background image!');
      return;
    }

    const json = await translate(query);
    const imgUrl = json?.data?.images?.original?.url;
    if (!imgUrl) {
      console.error('No returned image?');
      return;
    }

    img.setAttribute('src', imgUrl);
  });

  return E('div', { class: 'absolute top-0 left-0 w-full h-full' }, [
    img,
    overlay,
  ]);
}
