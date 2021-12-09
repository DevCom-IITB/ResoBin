import styled from 'styled-components/macro'

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
  margin: 0.25rem 0;
  padding-left: 2rem;
  color: ${({ theme }) => theme.textColor};
  font-weight: 300;
  font-size: 0.875rem;
  text-decoration: none;
  text-indent: -2rem;
  cursor: pointer;
  user-select: none;

  &::before {
    position: relative;
    top: 2px;
    left: 0.35rem;
    display: inline-block;
    margin-right: 1rem;
    padding: 0.4rem;
    border: 1px solid ${({ theme }) => theme.textColor};
    border-radius: 2px;
    appearance: none;
    content: '';
  }

  ${InputCheckbox}:checked + &:after {
    position: absolute;
    top: 5px;
    left: 10px;
    width: 4px;
    height: 9px;
    border: solid;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    content: '';
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
