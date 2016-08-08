requirejs.config({
  baseUrl: './js',
  deps: ['app'],
  paths: {
    'jquery': [
      '//ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min',
      'jquery.min'
    ],
    'lodash': [
      '//cdnjs.cloudflare.com/ajax/libs/lodash.js/4.14.1/lodash.min',
      'lodash.min'
    ],
    'tmplate': 'tmplate'
  }
});
