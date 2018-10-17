import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Label,
  Tooltip
} from 'recharts'

class Histogram extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: -1
    }
    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
  }

  handleMouseOver(data, index) {
    this.setState({ activeIndex: index })
  }

  handleMouseLeave() {
    this.setState({ activeIndex: -1 })
  }

  renderTooltipWithLabel(props) {
    const label = props.payload[0] && props.payload[0].payload.label
    const newProps = { ...props, content: null }
    return <Tooltip {...newProps} label={label} />
  }

  render() {
    const { breaks, counts, ticks, xAxisLabel, yAxisLabel, fill, activeFill } = this.props

    const data = counts.map((count, i) => ({
      x: breaks[i],
      y: count,
      label: `(${breaks[i]}, ${breaks[i + 1]}]`
    }))

    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} barCategoryGap={1} margin={{ bottom: 30 }}>
          <CartesianGrid strokeWidth={0.7} />
          <XAxis
            dataKey="x"
            type="number"
            domain={['auto', 'auto']}
            ticks={ticks}
            tickCount={ticks.length}
          >
            <Label value={xAxisLabel} offset={-20} position="insideBottom" />
          </XAxis>
          <YAxis>
            <Label
              value={yAxisLabel}
              angle={-90}
              offset={10}
              position="insideLeft"
              style={{ textAnchor: 'middle' }}
            />
          </YAxis>
          <Tooltip
            content={this.renderTooltipWithLabel}
            offset={40}
            isAnimationActive={false}
            labelStyle={{ fontWeight: '700' }}
          />
          <Bar
            dataKey="y"
            name={yAxisLabel}
            isAnimationActive={false}
            onMouseOver={this.handleMouseOver}
            onMouseLeave={this.handleMouseLeave}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={this.state.activeIndex === index ? activeFill : fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    )
  }
}

Histogram.propTypes = {
  breaks: PropTypes.arrayOf(PropTypes.number).isRequired,
  counts: PropTypes.arrayOf(PropTypes.number).isRequired,
  ticks: PropTypes.arrayOf(PropTypes.number).isRequired,
  xAxisLabel: PropTypes.string,
  yAxisLabel: PropTypes.string,
  fill: PropTypes.string,
  activeFill: PropTypes.string
}

Histogram.defaultProps = {
  xAxisLabel: 'x',
  yAxisLabel: 'Frequency',
  fill: '#428bca',
  activeFill: '#5d9bd1'
}

export default Histogram
