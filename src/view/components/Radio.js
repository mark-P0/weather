import { E } from '../dom.js';

/** @type {(name: string, text: string, isDefault: boolean) => HTMLElement} */
export function Radio(name, text, isDefault = false) {
  let attrs = [
    {
      class: [
        'text-sm text-stone-400 font-thin border-transparent border-2 px-1 text-center h-full aspect-square leading-none',
        'hover:text-inherit hover:border-inherit',
        /**
         * As of January 2023, the `:has()` is NOT supported on Firefox,
         * as well as VSCode's browser preview.
         * https://developer.mozilla.org/en-US/docs/Web/CSS/:has#browser_compatibility
         */
        '[&:has(input:checked)]:text-inherit [&:has(input:checked)]:font-bold',
      ].join(' '),
    },
    { type: 'radio', name, class: 'appearance-none' },
  ];
  if (isDefault) attrs[1].checked = true;

  return E('label', attrs[0], [E('input', attrs[1]), text]);
}
