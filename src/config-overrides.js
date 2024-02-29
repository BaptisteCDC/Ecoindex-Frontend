// config-overrides.js
const path = require('path');

module.exports = function override(config, env) {
  // Ajoutez ou modifiez des options de configuration Webpack ici

  // Ajoutez le fallback pour le module concerné (par exemple, http)
  config.resolve = {
    ...config.resolve,
    fallback: {
      http: false,
      https: false,
      asser: false,
      util: false
    },
  };

  return config;
};
