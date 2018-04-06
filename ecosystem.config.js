module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      exec_mode : "fork_mode",
      name      : 'CSV Generator Backend',
      script    : 'server/server.js',
      node_args : "--max_old_space_size=5120",
      env: {
        COMMON_VARIABLE: 'true',
        PORT: 9000
      }
    },

    // Second application
    {
      exec_mode : "fork_mode",
      name      : 'CSV Generator Frontend',
      script    : "client/node_modules/http-server/bin/http-server",
      args      : ["client"],
      env: {
        COMMON_VARIABLE: 'true',
        PORT: 5050
      }
    }
  ]
};

