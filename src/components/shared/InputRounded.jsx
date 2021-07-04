import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
`

const InputBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 2rem;
  width: 100%;
  border-radius: 0.5rem;
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

  font-size: 0.75rem;
  font-weight: 500;
  color: #1f1c2e;

  &::placeholder {
    color: #1f1c2e;
    opacity: 0.6;
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
