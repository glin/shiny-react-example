# Run the Shiny app in development mode

options(shiny.port = 3000)
options(shiny.launch.browser = FALSE)
options(shiny.autoreload = TRUE)
# Only reload on server-side changes
options(shiny.autoreload.pattern = ".*\\.R$")

shiny::runApp()
