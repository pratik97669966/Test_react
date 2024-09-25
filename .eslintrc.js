/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');

const srcFolders = fs
  .readdirSync('src', { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(({ name }) => name);

module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint', 'simple-import-sort'],
  extends: [
    'react-app',
    'react-app/jest',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    // Part 1: disabled rules
    'import/no-unresolved': 0,
    'react/react-in-jsx-scope': 0,
    'react/prop-types': 0,
    'react/display-name': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    // Part 2: coding style
    'quotes': [1, 'single'],
    'comma-dangle': [1, 'always-multiline'],
    'comma-spacing': 1,
    'semi': [1, 'always'],
    '@typescript-eslint/semi': [1, 'always'],
    'indent': [1, 2, { SwitchCase: 1 }],
    'no-multiple-empty-lines': [1, { max: 1 }],
    '@typescript-eslint/member-delimiter-style': [1, {
      'multiline': {
        'delimiter': 'semi',
        'requireLast': true,
      },
      'singleline': {
        'delimiter': 'semi',
        'requireLast': false,
      },
    }],
    '@typescript-eslint/no-empty-function': 1,
    // Part 3: react specific
    'react/jsx-space-before-closing': 1,
    'react-hooks/exhaustive-deps': [
      1,
      { additionalHooks: 'useRecoilCallback' },
    ],
    // Part 4: import order
    'simple-import-sort/imports': [
      2,
      {
        // Inspired by: github.com/reflexology/client-V2/blob/master/.eslintrc.js
        groups: [
          // `react` comes first, followed by packages that start with a
          // wordly character or `@` followed by a wordly character.
          ['^react$', '^@?\\w'],
          // Absolute imports.
          [`^(${srcFolders.join('|')})`],
          // Anything that starts with a dot.
          ['^\\.'],
        ],
      },
    ],
    'simple-import-sort/exports': 2,
    'import/first': 2,
    'import/newline-after-import': 2,
    'import/no-duplicates': 2,
    // Part 5: Temporarily relaxed, make stricter in the future
    '@typescript-eslint/ban-types': 1,
    '@typescript-eslint/ban-ts-comment': 1,
    'react/no-unescaped-entities': 1,
  },
};
// command
//npx eslint --fix src\pages\cms\medicine\AddMedicinePanel.tsx