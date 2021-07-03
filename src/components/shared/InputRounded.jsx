import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 2.25rem;
  width: 100%;
  border-radius: 1.5rem;
  background: white;
  overflow: hidden;
  box-shadow: 0px 0px 0.7rem rgba(0, 0, 0, 0.3);
`

const Input = styled.input`
  border: none;
  outline: none;
  height: 100%;
  width: 100%;
  padding-right: 1.5rem;

  font-size: 1rem;
  font-weight: 500;
  color: #1f1c2e;

  &::placeholder {
    color: #1f1c2e;
    opacity: 0.6;
  }
`

const Label = styled.label`
  color: ${({ theme }) => theme.text};
`

const InputRounded = ({ Icon, label, name, ...inputProps }) => {
  const iconStyles = {
    color: '#807da0',
    width: '1.25rem',
    margin: '0 0.25rem 0 0.75rem',
  }

  return (
    <Container>
      <Label htmlFor={name}>{label}</Label>
      <Icon style={iconStyles} />
      <Input name={name} {...inputProps} />
    </Container>
  )
}

InputRounded.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.node.isRequired,
  onChange: PropTypes.func.isRequired,
  Icon: PropTypes.elementType,
  placeholder: PropTypes.string,
}

export default InputRounded
