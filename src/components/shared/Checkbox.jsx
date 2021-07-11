import styled from 'styled-components'

const Container = styled.div`
  display: block;
`

const InputCheckbox = styled.input`
  display: none;
  cursor: pointer;
`

const InputLabel = styled.label`
  position: relative;
  display: inline-block;
  padding-left: 2rem;
  margin: 0.25rem 0;
  font-weight: 300;
  font-size: 0.875rem;
  text-decoration: none;
  text-indent: -2rem;
  color: ${({ theme }) => theme.textColor};
  cursor: pointer;
  user-select: none;

  &::before {
    content: '';
    position: relative;
    top: 2px;
    left: 0.35rem;
    display: inline-block;
    padding: 0.4rem;
    margin-right: 1rem;
    border: 1px solid ${({ theme }) => theme.textColor};
    border-radius: 2px;
    appearance: none;
  }

  ${InputCheckbox}:checked + &:after {
    content: '';
    position: absolute;
    top: 5px;
    left: 10px;
    width: 4px;
    height: 9px;
    border: solid;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`

const Checkbox = ({ label, id, ...inputProps }) => {
  return (
    <Container>
      <InputCheckbox type="checkbox" id={id} {...inputProps} />
      <InputLabel htmlFor={id}>{label}</InputLabel>
    </Container>
  )
}

export default Checkbox
