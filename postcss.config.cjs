/**
 * https://tailwindcss.com/docs/installation/using-postcss
 * https://tailwindcss.com/docs/optimizing-for-production
 */
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    /* TODO: Only add this on production builds? */
    cssnano: {},
  },
};
