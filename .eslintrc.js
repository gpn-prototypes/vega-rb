module.exports = {
  extends: [require.resolve('@gpn-prototypes/frontend-configs/.eslintrc')],
  rules: { 'comma-dangle': 'off' },
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
