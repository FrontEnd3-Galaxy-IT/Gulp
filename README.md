## Installation

Make sure you have [Node.js](https://nodejs.org/) installed versions in [package.json](./package.json) of the project.
To install dependencies:

```bash
npm install
```

## Production

All source files will be compressed and minified in ```build/```.
To run the project in production mode:

```bash
npm run prod
```

## Development

### Build project and run localhost

To run the project in development mode:

```bash
npm start
```

This will start the development server on http://localhost:3000

### Build project without localhost

To run the project in development mode:

```bash
npm run build
```

### Generate fonts

Add your fonts with ```.ttf``` extname to ```src/assets/fonts/``` and run the command:

```bash
npm run fonts
```

## Linting

### Husky and lint-staged

This project uses Husky and lint-staged to run pre-commit hooks. ESLint will be applied to staged TypeScript files
before committing.

### Lint commands

To automatically fix ESLint issues:

```bash
npm run fix:eslint
```

To fix style-related issues using Stylelint:

```bash
npm run fix:stylelint
```

## File structure

For simplification navigation in a project use module file structure, in ```src/assets/scss```, ```src/assets/js```
or ```src/views```
use the same folder and file naming. Main pattern is:

- ```ui``` - some king of buttons, input field, links, modal dialogs, topography or any another element which we are
  shared fo all of website
- ```components``` - some king of select, form, accordion, filter or any another part of code includes ```ui``` elements
  and also can be shared for all of website
- ```modules``` - some independent entity, like a page section which includes ```ui``` and ```components``` also can be
  shared for all of pages

## Twig usage

Documentation of usage as gulp module, you can read [here](https://github.com/simon-dt/gulp-twig).
Documentation of syntax and more options, you can read [here](https://twig.symfony.com/doc/3.x/).

### Default macros

To use icons from ```svgSprite``` in twig ```{{ media.icon(<iconName>, <iconModifyClass>) }}``` for output you will get:

```
<svg class="icon icon-<iconName> <iconModifyClass>">
  <use href="icon/icons/icons.svg#<iconName>" />
</svg>
```

To use ```.webp``` image ```{{ media.img(<path>, <format>, <parentClass>, <width>, <height>) }}``` for output you will
get:

```
<picture class="<parentClass>__image">
  <source srcset="img/<path>.webp" type="image/webp" class="<parentClass>__img" />
  <img src="img/<path>.<format>" alt="img" class="<parentClass>__img" />
</picture>
``` 

### Global custom variables

- `currentPage` - contains a `string` with current page value.
- `prod` - contains a `bool` with current global development mod.
- `webpack` - contains a `bool` with current javaScript development mod.

## PWA

[PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) sources in ```src/assets/pwa```:

- ```favicon.png``` - is the picture which user will see as app icon or browser tab icon of webpage.Should be maximum
  240x240
- ```launch.png``` - is a welcome and loading screen of app. Should be maximum 3200x3200, and content image inside
  540x540
- ```manifest.png``` - is [config](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json)
  file for app
- ```service-worker.js``` - is controlling cache of the application, write path for caching items

With develop mode, in the window of browser press ```Ctrl``` + ```I``` the open examples and docs 
