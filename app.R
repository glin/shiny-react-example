library(shiny)

#' Reactively render arbitrary JSON object data.
#'
#' This is a generic renderer that can be used to render any Jsonifiable data.
#' It sends the data to the client-side and let the client-side code handle the
#' rendering.
renderObject <- function(
  expr,
  env = parent.frame(),
  quoted = FALSE,
  outputArgs = list(),
  sep = " "
) {
  func <- installExprFunction(expr, "func", env, quoted, label = "renderObject")

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
  histogramData <- reactive({
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

  output$histogramData <- renderObject({
    histogramData()
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
