# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

- hadleOpenModal - проп для обработчика клика по пункту меню, открыающего модальные окна: добавить пользователя, редактировать пользователя, добавить должность, редактировать должность.
- handleOpenModalAddJob - наименование функции-обработчика клика по пункту меню, открывающего модальное окно добавления новой должности
- handleChange - проп для обработчика события change полей в формах
- наименование полей для объекта данными с полями форм: camelCase;
- validationFormValues - наименование функции валидации формы при сабмите в компонентах

1. Описание
2. Быстрый старт
3. Используемые библиотеки
4. Архитектура проекта: общие принципы построения, описание фукнционала основных компонентов
