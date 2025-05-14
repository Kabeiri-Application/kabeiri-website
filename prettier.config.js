/**
 * @see https://prettier.io/docs/en/configuration.html
 * @see https://github.com/tailwindlabs/prettier-plugin-tailwindcss
 * @see https://github.com/ianvs/prettier-plugin-sort-imports
 *
 * @typedef {import("prettier").Config} PrettierConfig
 * @typedef {import("prettier-plugin-tailwindcss").PluginOptions} TailwindConfig
 * @typedef {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig
 *
 * @type { PrettierConfig | SortImportsConfig | TailwindConfig }
 */
const config = {
  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
  tailwindFunctions: ['cva', 'cn'],
  importOrderTypeScriptVersion: '5.0.0',
  importOrder: [
    '<BUILTIN_MODULES>',
    '',
    '^(react/(.*)$)|^(react$)',
    '^(next(.*)$)|^(next$)',
    '',
    '<THIRD_PARTY_MODULES>',
    '',
    '^@/(.*)$',
    '',
    '^[./]',
    '^[../]',
  ],
};

export default config;
