library(shiny)

#' Reactively render arbitrary JSON object data.
#'
#' This is a generic renderer that can be used to render any Jsonifiable data.
#' The data goes through shiny:::toJSON() before being sent to the client.
render_json <- function(
  expr,
  env = parent.frame(),
  quoted = FALSE,
  outputArgs = list(),
  sep = " "
) {
  func <- installExprFunction(expr, "func", env, quoted, label = "render_json")

  createRenderFunction(
    func,
    function(value, session, name, ...) {
      value
    },
    function(...) {
      stop("Not implemented")
    },
    outputArgs
  )
}


server <- function(input, output, session) {
  histogram_data <- reactive({
    req(input$bins)
    x <- faithful$waiting
    breaks <- round(seq(min(x), max(x), length.out = input$bins + 1), 1)
    dist <- hist(x, breaks = breaks, plot = FALSE)
    list(
      breaks = breaks,
      counts = dist$counts,
      ticks = pretty(breaks)
    )
  })

  output$histogram_data <- render_json({
    histogram_data()
  })
}

ui <- function() {
  htmlTemplate("dist/index.html")
}

# Serve the JS and CSS assets under /assets
if (!dir.exists("dist/assets")) {
  stop("Missing static assets directory at dist/assets")
}

addResourcePath("assets", "dist/assets")

shinyApp(ui, server)
