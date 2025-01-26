# Vue 3 + TypeScript + Vite + Eslint@9 + Prettier
本项目是vue3+ts的种子项目，集成了eslint@9和prettier，并使用pnpm进行包管理。对ts定义了全局声明，可以快速开发vue3项目。

## Project setup
```js
  pnpm install
```
### Compiles and hot-reloads for development
```js
  pnpm run dev
```

### Compiles and minifies for production
```js
  pnpm run build
```

### Lints and fixes files
```js
  pnpm run lint
```

### Customize configuration
See [Vite Configuration Reference](https://vitejs.dev/config/).

### 项目结构
```
├── public
├── src
│   ├── assets
│   ├── components
│   ├── router
│   ├── store
│   ├── utils
│   ├── views
```
### Vscode如果想要支持保存自动格式化
1. 安装插件Prettier - Code formatter
2. 安装插件ESLint
3. 在项目根目录下新建.vscode文件夹，并在.vscode文件夹下新建settings.json文件，添加以下内容，当然开启之后，Vscode开销会变大，所以需要根据个人习惯选择是否开启
```js
{
  "eslint.autoFixOnSave": true,
  "eslint.validate": [
    { "language": "css", "autoFix": true },
    { "language": "javascript", "autoFix": true },
    { "language": "javascriptreact", "autoFix": true },
    { "language": "typescript", "autoFix": true },
    { "language": "typescriptreact", "autoFix": true },
    { "language": "vue", "autoFix": true },
    { "language": "scss", "autoFix": true },
    { "language": "sass", "autoFix": true },
    { "language": "less", "autoFix": true },
    { "language": "json", "autoFix": true }
  ],
   "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
}
```
