const HtmlWebPackPlugin = require("html-webpack-plugin");
const devMode = process.env.NODE_ENV === 'development';

module.exports = {

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {        
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
          test: /\.(jpg|png|svg)$/,
          loader: 'file-loader',
          options: {
            name: '[path][name].[hash].[ext]',
          },
      }
    ]
  },
  resolve :{
    extensions:['.js', '.jsx']
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};
