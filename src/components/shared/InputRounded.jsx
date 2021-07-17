import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
`

const InputBox = styled.div`
  position: relative;
  z-index: 100;
  display: flex;
  overflow: hidden;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 2rem;
  border-radius: 0.5rem;
  background: white;
  box-shadow: 0 0 0.7rem rgba(0, 0, 0, 0.3);
`

const Input = styled.input`
  width: 100%;
  height: 100%;
  padding-right: 1.5rem;
  border: none;
  outline: none;
  font-size: 0.875rem;
  font-weight: 500;
  color: #1f1c2e;

  &::placeholder {
    color: #747474;
  }
`

const Label = styled.label`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.text};
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
