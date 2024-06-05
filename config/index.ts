import defaultConfig from './config.default';
import prodConfig from './config.prod';

const config = defaultConfig;

if (process.env.NODE_ENV === 'production') {
  Object.assign(config, prodConfig);
}

export default config;
