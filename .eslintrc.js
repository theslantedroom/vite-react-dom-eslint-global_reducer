module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'prettier', 'jsx-a11y'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jest/recommended',
    'plugin:cypress/recommended',
    'plugin:sonarjs/recommended',
    'prettier',
  ],
  rules: {
    '@typescript-eslint/no-use-before-define': 0,
    'import/no-unresolved': [2, { ignore: ['test-utils', 'meteor/socialize:user-model', '/@env'] }],
    'no-console': 0,
    'no-continue': 0,
    'no-underscore-dangle': 0,
    'no-use-before-define': 0,
    'react-hooks/exhaustive-deps': ['warn', { additionalHooks: 'useTracker' }],
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx', '.js'] }],
    'react/jsx-props-no-spreading': 1,
    'react/display-name': 0, // TODO renable and fix errors
    'react/prop-types': 0, // TODO renable and fix errors
    'sonarjs/cognitive-complexity': 0, // TODO renable and fix errors
    'sonarjs/no-nested-switch': 1, // TODO renable and fix errors
    'sonarjs/no-collapsible-if': 1, // TODO renable and fix errors
  },
  parserOptions: {
    warnOnUnsupportedTypeScriptVersion: false,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  env: {
    node: true,
  },
};
