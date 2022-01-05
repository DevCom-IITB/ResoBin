import styled from 'styled-components/macro'

const Container = styled.div`
  width: 100%;
`

const InputBox = styled.div`
  position: relative;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 2rem;
  overflow: hidden;
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 0 0.7rem rgb(0 0 0 / 30%);
`

const Input = styled.input`
  width: 100%;
  height: 100%;
  padding-right: 1.5rem;
  color: #1f1c2e;
  font-weight: 500;
  font-size: 0.875rem;
  border: none;
  outline: none;

  &::placeholder {
    color: #747474;
  }
`

const Label = styled.label`
  color: ${({ theme }) => theme.text};
  font-size: 0.75rem;
`

const InputRounded = ({ Icon, label, displayLabel, name, ...inputProps }) => {
  const iconStyles = {
    color: '#807da0',
    width: '1.25rem',
    margin: '0 0.25rem 0 0.5rem',
  }

  return (
    <Container>
      {displayLabel && <Label htmlFor={name}>{label}</Label>}
      <InputBox>
        <Icon style={iconStyles} />
        <Input name={name} {...inputProps} />
      </InputBox>
    </Container>
  )
}

export default InputRounded
