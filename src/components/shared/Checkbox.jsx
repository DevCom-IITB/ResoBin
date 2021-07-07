import styled from 'styled-components'

const Container = styled.div`
  display: block;
`

const InputCheckbox = styled.input`
  cursor: pointer;
  display: none;
`

const InputLabel = styled.label`
  position: relative;
  color: ${({ theme }) => theme.textColor};
  font-size: 0.875rem;
  font-weight: 400;
  text-decoration: none;
  cursor: pointer;
  user-select: none;

  display: inline-block;
  padding-left: 2rem;
  text-indent: -2rem;
  margin: 0.25rem 0;
  &:before {
    content: '';
    appearance: none;
    border: 1px solid ${({ theme }) => theme.textColor};

    padding: 0.4rem;
    display: inline-block;
    top: 2px;
    left: 0.35rem;
    position: relative;
    margin-right: 1rem;
    border-radius: 2px;
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
