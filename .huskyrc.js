module.exports = {
  hooks: {
    ...require('@gpn-prototypes/frontend-configs/.huskyrc.js').hooks,
    'pre-push': 'yarn test -b --passWithNoTests',
    'commit-msg':
      'commitlint --config ./config/commitlint.config.js -E HUSKY_GIT_PARAMS',
  },
};
