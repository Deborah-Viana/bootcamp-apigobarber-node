module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['airbnb', 'eslint-config-prettier'],
  plugins: ['eslint-plugin-prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    //Caso meu código nao esteja de acordo, ele me mostrará um erro
    'prettier/prettier': 'error',
    //Diz respeito a todo metodo da classe utilizar o this, assim o desabilito
    'class-methods-use-this': 'off',

    //Recebo um paramentro e faça alterações no mesmo
    'no-param-reassign': 'off',
    camelcase: 'off',
    //As vezes preciso declarar váriveis que nao vou utilizar, o next dos middleswares é um exemplo delas
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
  },
};
