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
