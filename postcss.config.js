/* eslint quote-props: 0 */
module.exports = ({ env }) => ({
  plugins: {
    'postcss-easy-import': { prefix: '_' },
    'postcss-nested-props': {},
    'postcss-nested-vars': {},
    'postcss-mixins': {},
    'postcss-nested': {},
    'postcss-current-selector': {},
    'postcss-font-magician': {
      display: 'swap',
      variants: {
        'Open Sans': {
          '300': ['woff2'],
          '400 italic': ['woff2'],
        },
      },
    },
    'postcss-focus': {},
    'postcss-size': {},
    'postcss-color-function': {},
    'colorguard': {},
    'postcss-flexbugs-fixes': {},
    autoprefixer: { env },
    cssnano: env === 'production' ? { preset: 'default' } : false,
    'postcss-reporter': {},
  },
});
