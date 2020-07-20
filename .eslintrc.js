module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  rules: {
    'no-console': 'off',
    'no-unused-vars': 'warn',
    'prettier/prettier': ['error'],
    'no-param-reassign': ['error', { props: true }],
  },
  env: { es6: true, browser: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
    'airbnb/hooks',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
  ],
  plugins: ['prettier', 'jest'],
  settings: {
    'import/resolver': ['node', 'webpack'],
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      env: { es6: true, browser: true, node: true },
      extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'airbnb/hooks',
        'prettier',
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier/@typescript-eslint',
        'airbnb-typescript',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json',
        ecmaFeatures: { jsx: true },
      },
      plugins: ['prettier', 'react', '@typescript-eslint'],
      rules: {
        'no-console': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        'prettier/prettier': ['error'],
        'no-param-reassign': ['error', { props: true }],
      },
      settings: {
        'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': [
          {
            node: {
              extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
          },
          'webpack',
        ],
        react: { version: 'detect' },
      },
    },
  ],
};
