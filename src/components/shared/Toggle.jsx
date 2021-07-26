import styled from 'styled-components/macro'

const Container = styled.div`
  position: relative;
  display: flex;
`

const CheckboxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 45px;
  height: 25px;
  border-radius: 15px;
  background: ${({ theme }) => theme.logo};

  &::after {
    content: '';
    display: block;
    width: 0.75rem;
    height: 0.75rem;
    margin: 5px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.1);
    transition: 200ms;
  }
`

const CheckboxInput = styled.input`
  z-index: 1;
  opacity: 0;
  width: 45px;
  height: 25px;
  border-radius: 15px;
  cursor: pointer;

  &:checked + ${CheckboxLabel} {
    &::after {
      content: '';
      display: block;
      width: 0.75rem;
      height: 0.75rem;
      margin-left: 24px;
      border-radius: 50%;
      transition: 200ms;
    }
  }
`

const Toggle = ({ ...inputProps }) => {
  return (
    <Container>
      <CheckboxInput type="checkbox" {...inputProps} />
      <CheckboxLabel htmlFor="checkbox" />
    </Container>
  )
}

export default Toggle
