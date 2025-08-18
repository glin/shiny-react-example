library(shiny)

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

  observe({
    session$sendCustomMessage("histogramData", histogramData())
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
