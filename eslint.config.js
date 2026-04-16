import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default [
  // Игнорируем служебные папки и конфиги
  {
    ignores: ['dist/**', 'node_modules/**', 'build/**', '*.config.js', '*.config.ts'],
  },

  // Базовые правила JavaScript (только критические ошибки)
  js.configs.recommended,

  // TypeScript + React
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      // --- Оставляем только самые важные ошибки ---
      // React Hooks (обязательно, иначе хуки сломаются)
      ...reactHooksPlugin.configs.recommended.rules,

      // Отключаем ВСЁ, что даёт жёлтые предупреждения
      '@typescript-eslint/no-unused-vars': 'off',           // неиспользуемые переменные
      '@typescript-eslint/no-explicit-any': 'off',          // any разрешён
      '@typescript-eslint/no-non-null-assertion': 'off',    // ! разрешён
      '@typescript-eslint/no-empty-function': 'off',        // пустые функции ок
      '@typescript-eslint/ban-ts-comment': 'off',           // @ts-ignore ок
      'react/prop-types': 'off',                            // prop-types не нужны
      'react/react-in-jsx-scope': 'off',                    // React 17+
      'react/jsx-uses-react': 'off',                        // не требуется
      'react/display-name': 'off',                          // не ругаемся на отсутствие displayName
      'no-console': 'off',                                  // console.log разрешён
      'no-debugger': 'off',                                 // debugger разрешён

      // Эти оставляем как ошибки (красные), потому что могут реально сломать код
      'no-undef': 'error',                                  // использование необъявленных переменных
      'react-hooks/rules-of-hooks': 'error',                // нарушение правил хуков
      'react-hooks/exhaustive-deps': 'warn',                // зависимости useEffect (полезно, будет жёлтым, но это важно)
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];