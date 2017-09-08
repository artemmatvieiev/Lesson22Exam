import { resolve } from "path"
import {
  optimize,
  HotModuleReplacementPlugin,
  NamedModulesPlugin
} from "webpack"
import HtmlWebpackPlugin from "html-webpack-plugin"

export default () => ({
  devtool: "cheap-module-eval-source-map",
  entry: {
    vendor: [
      "react-dom",
      "react"
    ],
    bundle: [
      // "react-hot-loader/patch",
      "webpack-dev-server/client",
      "webpack/hot/only-dev-server",
      resolve(__dirname, "src/index.js")
    ]
  },
  output: {
    path: resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "bundle.js"
  },
  context: resolve(__dirname, "src"),
  plugins: [
    new HotModuleReplacementPlugin(),
    new NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: resolve(__dirname, "public/index.html")
    }),
    new optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: Infinity,
      filename: "vendor.js",
    })
  ],
  module: {
    rules: [
      {
        test: /.js?$/,
        exclude: /node_modules/,
        include: resolve(__dirname, "src"),
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "eslint-loader"
          }
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader?sourceMap",
          "resolve-url-loader"
        ]
      },
      {
        test: /\.(png|svg|jpeg|gif)$/,
        use: [
          "file-loader"
        ]
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      }
    ]
  },
  devServer: {
    disableHostCheck: true,
    contentBase: resolve(__dirname, "dist"),
    historyApiFallback: true,
    hot: true,
    compress: false,
    inline: true,
    host: "0.0.0.0",
    port: process.env.PORT || 8080,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true
    }
  },
  watchOptions: {
    poll: true
  }
})