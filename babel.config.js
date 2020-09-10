const config = require('@gpn-prototypes/frontend-configs/babel.config');

module.exports = {
  // eslint-disable-next-line global-require
  presets: [...config.presets, 'react-app'],
  plugins: [
    ...config.plugins,
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
};
