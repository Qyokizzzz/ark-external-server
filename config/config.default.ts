import type { Dialect } from 'sequelize';

export default {
  port: 4000,
  routerPrefix: '/api/v1',
  body: {
    enableTypes: ['json', 'form', 'text'],
    multipart: true,
  },
  sequelize: {
    dialect: 'mysql' as Dialect,
    host: '127.0.0.1',
    port: 3306,
    database: 'ark_log_dev',
    username: 'root',
    password: '198314',
    timezone: '+08:00',
    query: { raw: true },
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
    },
  },
  log4js: {
    appenders: {
      console: { type: 'console' },
      file: {
        type: 'file',
        filename: 'logs/app.log',
        maxLogSize: 10485760,
        backups: 3,
        compress: true,
      },
    },
    categories: {
      default: { appenders: ['console', 'file'], level: 'info' },
    },
  },
};
