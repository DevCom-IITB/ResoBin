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
  background: ${({ theme }) => theme.logo};
  border-radius: 15px;

  &::after {
    display: block;
    width: 0.75rem;
    height: 0.75rem;
    margin: 5px;
    background: rgb(255 255 255 / 80%);
    border-radius: 50%;
    box-shadow: 0 0 3px 2px rgb(0 0 0 / 10%);
    transition: 200ms;
    content: '';
  }
`

const CheckboxInput = styled.input`
  z-index: 1;
  width: 45px;
  height: 25px;
  border-radius: 15px;
  cursor: pointer;
  opacity: 0;

  &:checked + ${CheckboxLabel} {
    &::after {
      display: block;
      width: 0.75rem;
      height: 0.75rem;
      margin-left: 24px;
      border-radius: 50%;
      transition: 200ms;
      content: '';
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
