module.exports = {
  'env': {
    'es6': true,
    'node': true,
    'jest': true
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 2016,
    'sourceType': 'module'
  },
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
    'max-len': [
      'error',
      100,
      { 'ignoreComments': true }
    ],
    'no-confusing-arrow': [
      'error'
    ]
  }
};
