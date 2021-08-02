module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ts', '.tsx', '.js', '.json'],
        alias: {
          '@src': './src',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
