// config-overrides.js
module.exports = function override(config, env) {
    // Add or modify the Webpack configuration here
    console.log('Custom Webpack Configuration Applied');
    // Disable 'fs' and 'path' polyfills
    config.resolve.fallback = {
      fs: false,
      path: false,
    };
  
    return config;
  };
  