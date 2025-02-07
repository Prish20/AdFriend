// Set the correct environment
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
process.env.ASSET_PATH = '/';

const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require('../webpack.config');
const env = require('./env');
const path = require('path');

const options = config.chromeExtensionBoilerplate || {};
const excludeEntriesToHotReload = options.notHotReload || [];

// Enable HMR for non-background, non-content scripts
for (const entryName in config.entry) {
  if (!excludeEntriesToHotReload.includes(entryName)) {
    config.entry[entryName] = [
      'webpack/hot/dev-server',
      `webpack-dev-server/client?protocol=ws&hot=true&hostname=localhost&port=${env.PORT}`,
    ].concat(config.entry[entryName]);
  }
}

// Remove boilerplate settings that could interfere
delete config.chromeExtensionBoilerplate;

const compiler = webpack(config);

const server = new WebpackDevServer(
  {
    hot: true,
    liveReload: false,
    client: {
      webSocketTransport: 'ws',
      webSocketURL: {
        hostname: 'localhost',
        protocol: 'ws', // 🔥 Ensures WebSockets use 'ws://'
      },
    },
    webSocketServer: 'ws',
    host: 'localhost',
    port: env.PORT,
    static: {
      directory: path.join(__dirname, '../adfriend'),
    },
    devMiddleware: {
      publicPath: `http://localhost:${env.PORT}/`,
      writeToDisk: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    allowedHosts: 'all',
  },
  compiler
);

process.on('SIGINT', async () => {
  console.log('🛑 Stopping Webpack Dev Server...');
  await server.stop();
  process.exit();
});

(async () => {
  try {
    await server.start();
    console.log(
      `🚀 Webpack Dev Server running at http://localhost:${env.PORT}`
    );
  } catch (err) {
    console.error('❌ Failed to start Webpack Dev Server:', err);
  }
})();
