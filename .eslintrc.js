module.exports = {
  extends: 'airbnb-base',
  rules: {
    'no-console': 0,
    'no-param-reassign': [2, { props: false }],
    'arrow-body-style': 0,
    treatUndefinedAsUnspecified: true,
    'comma-dangle': 0
  },
  env: {
    node: true,
    mocha: true
  }
};
