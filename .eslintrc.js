module.exports = {
    root: true,
    extends: '@centerforopenscience/eslint-config/ember',
    globals: {
        MathJax: true
    },
    rules: {
        'ember/local-modules': 'off',
        'array-callback-return': 'off',
    }
};
