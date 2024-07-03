const path = require('path');

module.exports = {
  entry: './src/LedLight.tsx', // Path to your main .tsx file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'LedLight.js',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'], // Resolve these file types
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  externals: {
    react: 'react' // Avoid bundling React
  },
  mode: 'production'
};
