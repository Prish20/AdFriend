const webpack = require('webpack');
const path = require('path');
const fileSystem = require('fs-extra');
const env = require('./utils/env');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ReactRefreshTypeScript = require('react-refresh-typescript').default;

const ASSET_PATH = process.env.ASSET_PATH || '/';

const alias = {};
const secretsPath = path.join(__dirname, `secrets.${env.NODE_ENV}.js`);

const fileExtensions = [
  'jpg',
  'jpeg',
  'png',
  'gif',
  'eot',
  'otf',
  'svg',
  'ttf',
  'woff',
  'woff2',
];

if (fileSystem.existsSync(secretsPath)) {
  alias['secrets'] = secretsPath;
}

const isDevelopment = process.env.NODE_ENV !== 'production';

const options = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    newtab: path.join(__dirname, 'src', 'pages', 'Newtab', 'index.tsx'),
    options: path.join(__dirname, 'src', 'pages', 'Options', 'index.tsx'),
    popup: path.join(__dirname, 'src', 'pages', 'Popup', 'index.tsx'),
    background: path.join(__dirname, 'src', 'pages', 'Background', 'index.ts'),
    contentScript: path.join(__dirname, 'src', 'pages', 'Content', 'index.ts'),
    devtools: path.join(__dirname, 'src', 'pages', 'Devtools', 'index.ts'),
    panel: path.join(__dirname, 'src', 'pages', 'Panel', 'index.tsx'),
  },
  chromeExtensionBoilerplate: {
    notHotReload: ['background', 'contentScript', 'devtools'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'build'), // ✅ Prevents nesting build/build
    clean: true,
    publicPath: ASSET_PATH,
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: new RegExp(`.(${fileExtensions.join('|')})$`),
        type: 'asset/resource',
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              getCustomTransformers: () => ({
                before: isDevelopment ? [ReactRefreshTypeScript()] : [],
              }),
              transpileOnly: isDevelopment,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias,
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.scss'],
  },
  plugins: [
    isDevelopment && new ReactRefreshWebpackPlugin(),
    new CleanWebpackPlugin(),
    new webpack.ProgressPlugin(),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/manifest.json',
          to: path.resolve(__dirname, 'build'),
          force: true,
        },
        {
          from: 'src/pages/Content/content.styles.css',
          to: path.resolve(__dirname, 'build'),
          force: true,
        },
        {
          from: 'src/assets/img/icon-128.png',
          to: path.resolve(__dirname, 'build'),
          force: true,
        },
        {
          from: 'src/assets/img/icon-34.png',
          to: path.resolve(__dirname, 'build'),
          force: true,
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: 'src/pages/Newtab/index.html',
      filename: 'newtab.html',
      chunks: ['newtab'],
    }),
    new HtmlWebpackPlugin({
      template: 'src/pages/Options/index.html',
      filename: 'options.html',
      chunks: ['options'],
    }),
    new HtmlWebpackPlugin({
      template: 'src/pages/Popup/index.html',
      filename: 'popup.html',
      chunks: ['popup'],
    }),
    new HtmlWebpackPlugin({
      template: 'src/pages/Devtools/index.html',
      filename: 'devtools.html',
      chunks: ['devtools'],
    }),
    new HtmlWebpackPlugin({
      template: 'src/pages/Panel/index.html',
      filename: 'panel.html',
      chunks: ['panel'],
    }),
  ].filter(Boolean),
  infrastructureLogging: { level: 'info' },
};

if (env.NODE_ENV === 'development') {
  options.devtool = 'cheap-module-source-map';
} else {
  options.optimization = {
    minimize: true,
    minimizer: [new TerserPlugin({ extractComments: false })],
  };
}

module.exports = options;
