import PropTypes from 'prop-types'
import Form from 'react-bootstrap/Form'

const BinsInput = ({ value, options, onChange }) => (
  <div>
    <Form.Label style={{ fontWeight: 700 }} htmlFor="bins-input">
      Number of bins:
    </Form.Label>
    <Form.Select id="bins-input" value={value} onChange={(e) => onChange(parseInt(e.target.value))}>
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </Form.Select>
  </div>
)

BinsInput.propTypes = {
  value: PropTypes.number.isRequired,
  options: PropTypes.arrayOf(PropTypes.number).isRequired,
  onChange: PropTypes.func.isRequired,
}

export default BinsInput
