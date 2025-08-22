# shiny-react-example

Example of a Shiny app with a React front-end

[Demo](https://shiny.glin.io/shiny-react-example)

### Installation

```sh
git clone https://github.com/glin/shiny-react-example
cd shiny-react-example
npm install
```

### Development

1. Build the React app with auto-reloading on UI file changes (refresh to see changes):

    ```sh
    npm run watch
    ```

1. Run the Shiny app with auto-reloading on R file changes:

    ```sh
    npm start
    ```

    Or in your R console:

    ```r
    source("dev.R")
    ```

1. Open http://localhost:3000

### Production

1. Build the React app:

    ```sh
    npm run build
    ```

2. Publish the Shiny app with the `dist/` directory included.
