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
  htmlTemplate("public/index.html")
}

# Serve the bundle at static/main.js
if (dir.exists("dist")) {
  addResourcePath("static", "dist")
}

shinyApp(ui, server)
