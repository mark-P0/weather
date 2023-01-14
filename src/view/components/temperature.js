import { kelvin2celsius, kelvin2fahrenheit } from 'src/utilities.js';
import { TempUnitChangeEvent, TempUpdateEvent } from 'src/controller/events.js';

/** @type {kelvin2celsius | kelvin2fahrenheit} */
let converter = kelvin2celsius;
TempUnitChangeEvent.subscribe(async (data) => {
  if (data === 'C') converter = kelvin2celsius;
  else if (data === 'F') converter = kelvin2fahrenheit;
  else return;
  TempUpdateEvent.publish(null);
});

export class Temperature {
  element;
  #value;

  /** @type{(element: HTMLElement, value?: number | undefined) => Temperature} */
  constructor(element, value = undefined) {
    this.element = element;
    this.value = value;
    TempUpdateEvent.subscribe(this.#tempUpdateCallback.bind(this)); // So that it reuses the same function (right?)
  }
  get value() {
    return this.#value;
  }
  set value(value) {
    this.#value = value;
    this.element.textContent = `${this}`;
  }
  async #tempUpdateCallback() {
    this.element.textContent = `${this}`;
  }

  toString() {
    if (!this.#value) return '...';
    return Math.round(converter(this.#value)) + '°';
  }
}
