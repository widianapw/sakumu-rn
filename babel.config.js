module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        alias: {
          '@tmd/*': './tmd/*',
          '@tmd': './tmd',
          '@modules': './src/modules',
          '@modules/*': './src/modules/*',
          '@assets': './src/assets',
          '@assets/*': './src/assets/*',
          '@utils': './src/utils',
          '@utils/*': './src/utils/*',
        },
      },
    ],
  ],
};
