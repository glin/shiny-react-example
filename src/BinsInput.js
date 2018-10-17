import React from 'react'
import PropTypes from 'prop-types'
import { Label, Input } from 'reactstrap'

const BinsInput = ({ value, options, onChange }) => (
  <div>
    <Label style={{ fontWeight: 700 }}>Number of bins:</Label>
    <Input type="select" value={value} onChange={e => onChange(parseInt(e.target.value))}>
      {options.map(option => (
        <option key={option}>{option}</option>
      ))}
    </Input>
  </div>
)

BinsInput.propTypes = {
  value: PropTypes.number.isRequired,
  options: PropTypes.arrayOf(PropTypes.number).isRequired,
  onChange: PropTypes.func.isRequired
}

export default BinsInput
