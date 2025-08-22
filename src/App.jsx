import { useCallback, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import CardBody from 'react-bootstrap/CardBody'
import 'bootstrap/dist/css/bootstrap.min.css'

import BinsInput from './BinsInput.jsx'
import Histogram from './Histogram.jsx'

function App() {
  const [bins, setBins] = useState(30)
  const [histogramData, setHistogramData] = useState(null)

  const setInputValues = useCallback(() => {
    if (window.Shiny && window.Shiny.setInputValue) {
      window.Shiny.setInputValue('bins', bins)
    }
  }, [bins])

  useEffect(() => {
    window.$(document).on('shiny:connected', () => {
      setInputValues()
    })

    if (window.Shiny && window.Shiny.addCustomMessageHandler) {
      window.Shiny.addCustomMessageHandler('histogramData', (histogramData) =>
        setHistogramData(histogramData)
      )
    }
  }, [setInputValues])

  useEffect(() => {
    setInputValues()
  }, [setInputValues])

  const handleBinsChange = (value) => {
    setBins(value)
  }

  return (
    <Container fluid>
      <h2 className="mt-3">Old Faithful Geyser Data</h2>
      <Row>
        <Col sm="4">
          <Card style={{ backgroundColor: '#f5f5f5' }}>
            <CardBody>
              <BinsInput value={bins} options={[10, 20, 30, 40, 50]} onChange={handleBinsChange} />
            </CardBody>
          </Card>
        </Col>
        <Col sm="8">
          {histogramData && (
            <Histogram {...histogramData} xAxisLabel="Waiting time to next eruption (mins)" />
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default App
