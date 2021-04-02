module.exports = (env) => {
  const path = require("path");
  const webpack = require("webpack"); // 用于访问内置插件
  const HtmlWebpackPlugin = require("html-webpack-plugin"); // 通过 npm 安装
  const MiniCssExtractPlugin = require("mini-css-extract-plugin");
  console.log(env);
  return {
    mode: "development",
    entry: {
      index: {
        import: "./src/index.js",
        dependOn: "shared",
      },
      print: {
        import: "./src/print.js",
        dependOn: "shared",
      },
      shared: "lodash",
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "js/[name].[chunkhash].bundle.js",
      clean: true, // 清理 /dist 文件夹
      // publicPath: "./",
    },
    devtool: "inline-source-map",
    module: {
      rules: [
        // {
        //   test: /\.sass$/,
        //   use: [
        //     MiniCssExtractPlugin.loader,
        //     "css-loader",
        //     "postcss-loader",
        //     "sass-loader",
        //   ],
        // },
        {
          test: /\.js$/,
          loader: "babel-loader",
        },
        // {
        //   test: /\.css$/i,
        //   use: ["style-loader", "css-loader"],
        // },
        {
          test: /.s?css$/,
          // use: ['style-loader', 'css-loader']
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[hash:7].[ext]",
                outputPath: "./img",
                publicPath: "/img",
              },
            },
          ],
        },
      ],
    },
    plugins: [
      //插进的引用, 压缩，分离美化
      new HtmlWebpackPlugin({
        //将模板的头部和尾部添加css和js模板,dist 目录发布到服务器上，项目包。可以直接上线
        title: "管理输出",
        file: "index.html", //打造单页面运用 最后运行的不是这个
        template: "./src/index.html", //vue-cli放在跟目录下
      }),
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash].bundle.css",
      }),
    ],
    devServer: {
      contentBase: "./dist",
      port: 8088,
      hot: true,
    },
    optimization: {
      runtimeChunk: "single",

      splitChunks: {
        chunks: "all",
      },
      // splitChunks: {
      //   cacheGroups: {
      //     vendor: {
      //       test: /[\\/]node_modules[\\/]/,
      //       name: 'vendors',
      //       chunks: 'all',
      //     },
      //   },
      // },
    },
  };
};
