# shiny-react-example

Example of a Shiny app with a React front-end

[Demo](https://shiny.glin.io/shiny-react-example)

## Overview

This is a [Shiny](https://shiny.posit.co/) web app built in R that replaces the default UI with a custom UI written in JavaScript using [React](https://react.dev/).

Featuring:

- The Old Faithful Geyser Data demo app recreated in React with [React Bootstrap](https://react-bootstrap.netlify.app/) for a familiar Shiny-like UI, and [Recharts](https://recharts.org/) for interactive charts
- [Shiny HTML templates](https://shiny.posit.co/r/articles/build/templates/) to replace Shiny's default page (Bootstrap, jQuery, etc.) with a custom one
- [@posit/shiny-react](https://github.com/wch/shiny-react) to simplify communication between the React app and the Shiny server
- [Vite](https://vite.dev/) for building JavaScript and providing auto-reloading for JavaScript files during development
- [Prettier](https://prettier.io/) for JavaScript code formatting (recommend installing the Prettier extension in Positron, VS Code, etc.)
- [ESLint](https://eslint.org/) for JavaScript code linting (recommend installing the ESLint extension in Positron, VS Code, etc.)

## Prerequisites

- [R](https://cran.r-project.org/) with `shiny` installed
- [Node.js](https://nodejs.org/)

## Installation

Clone the repository:

```sh
git clone https://github.com/glin/shiny-react-example
```

Then, install the JavaScript dependencies:

```sh
cd shiny-react-example
npm install
```

## Development

1. Build the React app with auto-reloading on UI file changes (refresh your browser to see changes):

    ```sh
    npm run watch
    ```

1. Run the Shiny app with auto-reloading on R file changes.

    In your R console:

    ```r
    source("dev.R")
    ```

    Or at a terminal (runs the same `dev.R` script):

    ```sh
    npm start
    ```

1. Open http://localhost:3000 in your browser.

## Production

1. Build the React app. Frontend assets will be placed in `dist/`:

    ```sh
    npm run build
    ```

1. Deploy the Shiny app with the `dist/` directory included.
