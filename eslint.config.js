import globals from "globals";
import eslint from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import pluginVue from "eslint-plugin-vue";
import vueParser from 'vue-eslint-parser'
import prettier from "eslint-plugin-prettier";

/** @type {import("eslint").FlatConfig[]} */
export default [
  {
    // 针对 TypeScript 和 Vue 文件的配置
    files: ["**/*.{ts,vue}"],
    languageOptions: {
      parser: vueParser, // 解析 .vue 文件
      globals: globals.browser, // 定义全局变量（如 window, document 等）
      parserOptions: {
        parser: tsParser, // 解析 Vue 文件 <script> 部分的 TypeScript 代码
        ecmaVersion: "latest", // 最新 ECMAScript 语法支持
        sourceType: "module", // 模块解析方式
      },
    },
    plugins: {
      vue: pluginVue, // Vue 插件
      "@typescript-eslint": tseslint, // TypeScript 插件
      prettier, // Prettier 插件
    },
    rules: {
      ...tseslint.configs.recommended.rules, // TypeScript 推荐规则
      ...pluginVue.configs["flat/essential"].rules, // Vue 推荐规则
      "prettier/prettier": "warn", // 使用 Prettier 的规则（如果集成了 Prettier）
      "arrow-body-style": "off",
      "prefer-arrow-callback": "off",
      "@typescript-eslint/no-explicit-any": "off", // 允许使用 `any` 类型
    },
  },
 
];
