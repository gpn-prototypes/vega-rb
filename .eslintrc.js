const localePrettierConfig = require('./.prettierrc.js');

module.exports = {
  extends: [require.resolve('@gpn-prototypes/frontend-configs/.eslintrc')],
  rules: {
    'comma-dangle': 'off',
    'simple-import-sort/sort': 'warn',
    'no-unused-vars': 'warn',
    'prettier/prettier': ['error', localePrettierConfig],
  },
  overrides: [
    {
      files: ['./src/**/*.{ts,tsx}'],
      rules: {
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/interface-name-prefix': 'off',
        'no-unused-vars': 'off',
        'no-underscore-dangle': 'off',
      },
      settings: {
        'import/resolver': {
          typescript: {},
        },
      },
    },
  ],
};
