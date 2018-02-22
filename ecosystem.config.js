module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      exec_mode : "fork_mode",
      name      : 'CSV GENERATOR BACKEND',
      script    : 'server/server.js',
      env: {
        COMMON_VARIABLE: 'true',
        PORT: 3003
      }
    },

    // Second application
    {
      exec_mode : "fork_mode",
      name      : 'API 2',
      script    : 'server.js',
      env: {
        COMMON_VARIABLE: 'true',
        PORT: 3004
      }
    }
  ]
};

