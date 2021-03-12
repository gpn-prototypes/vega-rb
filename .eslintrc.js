const localePrettierConfig = require('./.prettierrc.js');

module.exports = {
  extends: [
    require.resolve('@gpn-prototypes/frontend-configs/.eslintrc'),
    'plugin:lodash-fp/recommended',
  ],
  rules: {
    'comma-dangle': 'off',
    'simple-import-sort/sort': 'warn',
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'prettier/prettier': ['error', localePrettierConfig],
  },
  overrides: [
    {
      files: ['./src/**/*.{ts,tsx}'],
      rules: {
        'import/named': 'error',
        'no-use-before-define': 'off',
        'react/require-default-props': 'off',
        'no-unused-vars': 'off',
        'no-underscore-dangle': 'off',
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 'error',
        '@typescript-eslint/no-use-before-define': ['error'],
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/interface-name-prefix': 'off',
        'lodash-fp/no-extraneous-function-wrapping': 'off',
      },
      settings: {
        'import/resolver': {
          typescript: {},
        },
      },
    },
  ],
};
