# [Weather](https://mark-p0.github.io/weather/)

A weather web application using [OpenWeatherMap](https://openweathermap.org/)

<!-- Simple weather app -->

## APIs

- **OpenWeatherMap**, for weather details
  - [`current`](https://openweathermap.org/current)
  - [`forecast5`](https://openweathermap.org/forecast5)
- **GIPHY**, for weather-~~related~~ backgrounds
  - [`translate`](https://developers.giphy.com/docs/api/endpoint/#translate)

## Dependencies

- [**Tailwind**](https://tailwindcss.com/) (via [PostCSS](https://postcss.org/)), for styles
  - [Heroicons](https://heroicons.com/)
  - _Indirect_: [Autoprefixer](https://autoprefixer.github.io/), [CSSNano](https://cssnano.co/)
- [**Webpack**](https://webpack.js.org/), for distilling source files
- [**Firebase**](https://firebase.google.com/docs/web/setup), for API key storage
