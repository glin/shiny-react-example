import { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import CardBody from 'react-bootstrap/CardBody'
import 'bootstrap/dist/css/bootstrap.min.css'

import BinsInput from './BinsInput.jsx'
import Histogram from './Histogram.jsx'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bins: 30,
      histogramData: null,
    }
    this.handleBinsChange = this.handleBinsChange.bind(this)
  }

  componentDidMount() {
    window.$(document).on('shiny:connected', () => {
      this.setInputValues()
    })

    window.Shiny.addCustomMessageHandler('histogramData', (histogramData) =>
      this.setState({ histogramData })
    )
  }

  componentDidUpdate() {
    this.setInputValues()
  }

  setInputValues() {
    window.Shiny.onInputChange('bins', this.state.bins)
  }

  handleBinsChange(value) {
    this.setState({ bins: value })
  }

  render() {
    const { bins, histogramData } = this.state
    return (
      <Container fluid>
        <h2 className="mt-3">Old Faithful Geyser Data</h2>
        <Row>
          <Col sm="4">
            <Card style={{ backgroundColor: '#f5f5f5' }}>
              <CardBody>
                <BinsInput
                  value={bins}
                  options={[10, 20, 30, 40, 50]}
                  onChange={this.handleBinsChange}
                />
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
}

export default App
