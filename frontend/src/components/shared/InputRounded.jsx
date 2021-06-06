import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 2.75rem;
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
  padding-left: 1.5rem;

  font-size: 1.25rem;
  font-weight: 600;
  color: #1f1c2e;

  &::placeholder {
    color: #1f1c2e;
    opacity: 0.6;
  }
`

const iconStyles = {
  color: '#807da0',
  width: '1.75rem',
  margin: '0 1.25rem 0 0.75rem',
}

const InputRounded = ({ type, placeholder, icon: Icon }) => {
  return (
    <Container>
      <Input type={type} placeholder={placeholder} />
      <Icon style={iconStyles} />
    </Container>
  )
}

export default InputRounded
