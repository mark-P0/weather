class Event {
  #subscribers;
  constructor() {
    this.#subscribers = [];
  }

  publish(data) {
    /* TODO: Use `Promise.all()`? */
    for (const callback of this.#subscribers) callback(data);
  }
  subscribe(callback) {
    this.#subscribers.push(callback);
  }
}

export const LoadingEvent = new Event();
export const WeatherUpdateEvent = new Event();
export const TempUnitChangeEvent = new Event();
export const TempUpdateEvent = new Event();
export const NotFoundEvent = new Event();
export const ForecastUpdateEvent = new Event();
