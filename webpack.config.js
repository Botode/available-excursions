const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ManifestPlugin = require('webpack-manifest-plugin');
const PostCSSImport = require('postcss-import');

const PnpWebpackPlugin = require(`pnp-webpack-plugin`);
const autoprefixer = require('autoprefixer');
const precss = require('precss');

const isProd = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';
const isDev = !isProd && !isTest;

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  };

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetWebpackPlugin(),
      new TerserWebpackPlugin(),
    ];
  }

  return config;
};

const filename = (ext) =>
  isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: [PostCSSImport, precss(), autoprefixer()],
  },
};

const cssLoaders = (extra) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isDev,
        reloadAll: true,
      },
    },
    'css-loader',
    postcssLoader,
  ];

  if (extra) {
    loaders.push(extra);
  }

  return loaders;
};

const babelOptions = (preset) => {
  const opts = {
    presets: ['@babel/preset-env'],
    plugins: ['@babel/plugin-proposal-class-properties'],
  };

  if (preset) {
    opts.presets.push(preset);
  }

  return opts;
};

const jsLoaders = () => {
  const loaders = [
    {
      loader: require.resolve('babel-loader'),
      options: babelOptions(),
    },
  ];

  if (isDev) {
    loaders.push('eslint-loader');
  }

  return loaders;
};

const plugins = () => {
  const base = [
    new HTMLWebpackPlugin({
      template: 'index.html',
      favicon: path.resolve(
        __dirname,
        'src',
        'client',
        'assets',
        'favicon.ico',
      ),
      minify: {
        collapseWhitespace: isProd,
        removeComments: isProd,
        minifyJS: isProd,
      },
    }),
    new CleanWebpackPlugin(),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, 'src','client','assets','favicon.ico'),
    //       to: path.resolve(__dirname, 'dist'),
    //     },
    //   ],
    // }),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
    new webpack.HashedModuleIdsPlugin(),
    new ManifestPlugin(),
  ];

  if (isProd) {
    base.push(new BundleAnalyzerPlugin());
  }

  return base;
};

module.exports = {
  context: path.resolve(__dirname, 'src', 'client'),
  // mode: 'development',
  entry: {
    script: './app.jsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: filename('js'),
  },
  resolve: {
    extensions: ['.js', '.json', '.png', '.jsx'],
    alias: {
      '@models': path.resolve(__dirname, 'src', 'client', 'models'),
      '@': path.resolve(__dirname, 'src', 'client'),
    },
    plugins: [PnpWebpackPlugin],
  },
  resolveLoader: {
    plugins: [PnpWebpackPlugin.moduleLoader(module)],
  },
  optimization: optimization(),
  devServer: {
    port: 4200,
    hot: isDev,
  },
  devtool: isDev ? 'source-map' : '',
  plugins: plugins(),
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: cssLoaders(),
      },
      {
        test: /\.less$/,
        use: cssLoaders('less-loader'),
      },
      {
        test: /\.s[ac]ss$/i,
        use: cssLoaders('sass-loader'),
      },
      {
        test: /\.(png|jpg|svg|gif)$/i,
        use: ['file-loader'],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/i,
        use: ['file-loader'],
      },
      {
        test: /\.xml$/i,
        use: ['xml-loader'],
      },
      {
        test: /\.csv$/i,
        use: ['csv-loader'],
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
      {
        test: /\.ts$/i,
        exclude: /node_modules/,
        loader: {
          loader: require.resolve('babel-loader'),
          options: babelOptions('@babel/preset-typescript'),
        },
      },
      {
        test: /\.jsx$/i,
        exclude: /node_modules/,
        loader: {
          loader: require.resolve('babel-loader'),
          options: babelOptions('@babel/preset-react'),
        },
      },
    ],
  },
};
