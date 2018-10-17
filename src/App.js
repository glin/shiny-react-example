import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { Container, Row, Col, Card, CardBody } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import BinsInput from './BinsInput'
import Histogram from './Histogram'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bins: 30,
      histogramData: null
    }
    this.handleBinsChange = this.handleBinsChange.bind(this)
  }

  componentDidMount() {
    window.$(document).on('shiny:connected', () => {
      this.setInputValues()
    })

    window.Shiny.addCustomMessageHandler('histogramData', histogramData =>
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

export default hot(module)(App)
