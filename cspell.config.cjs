/* prettier-ignore */
const words = `
tailwindcss
heroicons
`.trim().split('\n');

/** @type {import('@cspell/cspell-types').CSpellSettings} */
const config = {
  words,
};

module.exports = config;
