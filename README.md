# Dular.IO

[Dular.IO](dular.io) is a double-entry bookkeeping web application based on [React](https://reactjs.org/) and [Material-UI](https://material-ui.com/).

- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
- Typescript: `^4.1.2`.
- React: `^17.0.1`.
- Material-UI: `^4.11.2`.

## Development Guide

### Themes

- We currently support `Dark` and `Light` themes (see [`ThemeContext`](./src/contexts/ThemeContext.ts)).
- [`ThemeProvider`](./src/providers/ThemeProvider) takes the charge to pass colors into Material UI Components.
- Edit filed under folder [`themes`](./src/themes) to change the colors you want.

```typescript
import { Theme, useTheme } from "./contexts/ThemeContext";
import { withTheme } from "./providers/ThemeProvider";
import SelectTheme from "./components/select/Theme";

const DemoContent = () => {
  const { theme } = useTheme();
  return (
    <>
      <div>Theme: {theme}</div>
      <SelectTheme />
    </>
  );
};

const Demo = withTheme(DemoContent);
```

### Locales

- We support multiple locales based on [`LocaleContext`](./src/contexts/LocaleContext) and [ `LocaleProvider`](./providers/LocaleProvider).
- Edit JSON files under folder [`locales`](./src/locales) if you want to support more languages or more words.
- Command `yarn lint:locales` will find potential issues of locale JSON files.
- Command `yarn lint:locales:fix` will fix undefined words in some languages based on [Google Cloud Translation API](https://cloud.google.com/translate).
- Make sure you have `GOOGLE_TRANSLATE_PROJECT_ID` and `GOOGLE_TRANSLATE_API_KEY` defined in your `.env.local`.
- Use the `t` function provided by `useLocale` to translate the words you want in your components.

```typescript
import { Locale, useLocale } from "./contexts/LocaleContext";
import { withLocale } from "./providers/LocaleProvider";
import SelectLocale from "./components/select/Locale";

const DemoLocale = () => {
  const { t } = useLocale();
  return (
    <>
      <div>You're using {t("app_name")}</div>
      <SelectLocale />
    </>
  );
};

const Demo = withLocale(DemoLocale);
```

### Icons

- Please choose SVG-based icons from [Material Icons](https://material-ui.com/components/material-icons/).

### Routes

* Our routing framework is based on [react-router-dom](https://reactrouter.com/web/guides/quick-start) and please do not use the lib directly.

* Each route should have a related component defined under [containers](./src/containers) folder.
* Use `makeRoutes` to generate nesting routes automatically.

```typescript
import { makeRoutes, RouteParams } from "./contexts/RouteContext";
import { withRoute } from "./providers/RouteProvider";

const Home = () => {
  return <div>Home</div>;
};

const Pages = ({ id }: RouteParams) => {
  return <div>Page: {id}</div>;
};

const DemoContent = () =>
  makeRoutes({
    "/": Home,
    "pages/:id": Pages,
  });

const Demo = withRoute(DemoContent);
```



## Available Scripts

In the project directory, you can run:

### `yarn start`

- Runs the app in the development mode.

- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

- The page will reload if you make edits.

- You will also see any lint errors in the console.

### `yarn test`

- Launches the test runner in the interactive watch mode.
- See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

- Builds the app for production to the `build` folder.
- It correctly bundles React in production mode and optimizes the build for the best performance.

- The build is minified and the filenames include the hashes.
- Your app is ready to be deployed!

- See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn lint`

- Run static code analysis and report potential issues.

### `yarn lint:fix`

- Run the static code analysis and fix potential issues automatically if possible.

### `yarn lint:locales`

- Check if some words have definitions in one or more languages but don't in others.

### `yarn lint:locales:fix`

- Check if some words have definitions in one or more languages but don't in others.
- Translate these words into missing languages automatically based on [Google Cloud Translation API](https://cloud.google.com/translate).
