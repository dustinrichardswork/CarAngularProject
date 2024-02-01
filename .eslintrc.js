module.exports = {
  root: true,
  rules: {},
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: ['tsconfig.json', 'src/tsconfig.app.json'],
        createDefaultProgram: true,
      },
      extends: [
        'plugin:@angular-eslint/recommended',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:@angular-eslint/template/process-inline-templates',
        'plugin:prettier/recommended',
      ],
      rules: {
        'prettier/prettier': [
          'error',
          {
            endOfLine: 'auto',
          },
        ],
        '@angular-eslint/component-selector': [
          'error',
          {
            type: 'element',
            style: 'kebab-case',
          },
        ],
        '@angular-eslint/directive-selector': [
          'error',
          {
            type: 'attribute',
            style: 'camelCase',
          },
        ],
        '@typescript-eslint/unbound-method': [
          'error',
          {
            ignoreStatic: true,
          },
        ],
        // Permanent custom rules
        '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
        '@angular-eslint/no-output-on-prefix': 'off',
        // Temporary turned off
        '@typescript-eslint/explicit-module-boundary-types': 'off', // 636 warnings in project
        '@typescript-eslint/no-unsafe-member-access': 'off', // 171 errors in project
        '@typescript-eslint/no-unsafe-assignment': 'off', // 435 errors in project
      },
    },
    {
      files: ['*.spec.ts'],
      parserOptions: {
        project: ['tsconfig.json', 'src/tsconfig.spec.json'],
        createDefaultProgram: true,
      },
      plugins: ['jasmine'],
      extends: [
        'plugin:@angular-eslint/recommended',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:@angular-eslint/template/process-inline-templates',
        'plugin:prettier/recommended',
        'plugin:jasmine/recommended',
      ],
      rules: {
        // * Allow test duplications in different branches
        'jasmine/no-spec-dupes': [1, 'branch'],
        // Permanent custom rules
        '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
        '@typescript-eslint/no-floating-promises': 'off',
        // Temporary turned off
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/unbound-method': 'off',
        'jasmine/no-unsafe-spy': 'off',
      },
    },
    {
      files: ['*.component.html'],
      parser: '@angular-eslint/template-parser',
      extends: ['plugin:@angular-eslint/template/recommended'],
      plugins: ['@angular-eslint/template'],
      rules: {},
    },
  ],
};
