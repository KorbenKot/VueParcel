module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/recommended',
        'airbnb',
    ],
    rules: {
        indent: ['error', 4],
        'max-len': ['error', { code: 120 }],
        'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
        'object-shorthand': ['error', 'always', { ignoreConstructors: true }],
        'func-names': ['error', 'as-needed'],
        'no-param-reassign': ['error', { props: false }],
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'import/no-cycle': [2, { maxDepth: 1 }],
        'no-underscore-dangle': ['error', { allow: ['_isVue'] }],
        'arrow-parens': ['error', 'as-needed'],
    },
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module',
        allowImportExportEverywhere: false,
        codeFrame: false,
    },
};
