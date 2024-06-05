import type { Dialect } from 'sequelize';

export default {
  port: 80,

  sequelize: {
    dialect: 'mysql' as Dialect,
    host: '127.0.0.1',
    port: 3306,
    database: 'ark_log_prod',
    username: 'root',
    password: '198314',
    timezone: '+08:00',
    query: { raw: true },
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
    },
  },
};
