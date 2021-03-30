# Widget Customization

[![written in typescript](https://img.shields.io/badge/written%20in-typescript-blue.svg)](https://www.typescriptlang.org) [![styled with prettier](https://img.shields.io/badge/styled_with-prettier-yellow.svg)](https://github.com/prettier/prettier) [![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://facebook.github.io/jest/) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![yarn](https://img.shields.io/badge/maintained%20with-yarn-cc00ff.svg)](https://yarnpkg.com/en/)

The Widget Settings is an open source point-and-click interface used to setup visualization settings. It's maintained by the team at [Keen IO](https://keen.io/).

### Install

```ssh
npm install @keen.io/widget-customization --save
```

or

```ssh
yarn add  @keen.io/widget-customization
```

## Build

The `@keen.io/widget-customization` use two step build to address issues with CSS specificity.

##### Typescript

First stage is responsible for transpilation Typescript code to `esnext` and emiting type declarations.

##### Babel

Second stage is responsible for code transpilation based on supported browserlist defined in `package.json` file and increasing `styled-components` css specificity by using plugins from `.babelrc` file.
Generator functions transformations are disabled so applications that use this package should take care of it on their own.

### npm scripts

List of useful commands that could be used by developers. Execution in the command-line interface should be prefixed with `yarn` package manager.

| Command    | Description                                          |
| ---------- | ---------------------------------------------------- |
| `lint`     | run linter against current application codebase.     |
| `test`     | run unit tests.                                      |
| `build`    | builds application distribution.                     |
| `prettier` | run code formatter process against current codebase. |

### commit

This project uses [Conventional Commits](https://www.conventionalcommits.org) to enforce common commit standards.

| Command      | Description                        |
| ------------ | ---------------------------------- |
| `npx git-cz` | run commit command line interface. |
