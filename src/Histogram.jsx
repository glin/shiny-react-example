import { useState } from 'react'
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
  Tooltip,
} from 'recharts'

const Histogram = ({
  breaks,
  counts,
  ticks,
  xAxisLabel = 'x',
  yAxisLabel = 'Frequency',
  fill = '#428bca',
  activeFill = '#5d9bd1',
}) => {
  const [activeIndex, setActiveIndex] = useState(-1)

  const handleMouseOver = (data, index) => {
    setActiveIndex(index)
  }

  const handleMouseLeave = () => {
    setActiveIndex(-1)
  }

  const renderTooltipWithLabel = (props) => {
    const label = props.payload[0] && props.payload[0].payload.label
    const newProps = { ...props, content: null }
    return <Tooltip {...newProps} label={label} />
  }

  const data = counts.map((count, i) => ({
    x: breaks[i],
    y: count,
    label: `(${breaks[i]}, ${breaks[i + 1]}]`,
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
          content={renderTooltipWithLabel}
          offset={40}
          isAnimationActive={false}
          labelStyle={{ fontWeight: '700' }}
        />
        <Bar
          dataKey="y"
          name={yAxisLabel}
          isAnimationActive={false}
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
        >
          {data.map((entry, index) => {
            return <Cell key={index} fill={activeIndex === index ? activeFill : fill} />
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

Histogram.propTypes = {
  breaks: PropTypes.arrayOf(PropTypes.number).isRequired,
  counts: PropTypes.arrayOf(PropTypes.number).isRequired,
  ticks: PropTypes.arrayOf(PropTypes.number).isRequired,
  xAxisLabel: PropTypes.string,
  yAxisLabel: PropTypes.string,
  fill: PropTypes.string,
  activeFill: PropTypes.string,
}

export default Histogram
