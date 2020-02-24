// next.config.js
const withSass = require('@zeit/next-sass')
const withImages = require('next-images')
const withPlugins = require('next-compose-plugins');
//const withTM = require('next-transpile-modules')(['./components'])

module.exports = withPlugins([
    withImages,
    withSass
]);
