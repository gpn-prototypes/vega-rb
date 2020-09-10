const createPostcssConfig = require('@gpn-prototypes/frontend-configs/postcss.config');

module.exports = {
  // eslint-disable-next-line global-require
  ...require('@gpn-prototypes/frontend-configs/postcss.config'),
  plugins: [...createPostcssConfig().plugins],
};
