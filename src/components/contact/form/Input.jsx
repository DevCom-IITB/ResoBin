import styled, { css } from "styled-components";
import HEX2RGBA from 'helpers/HEX2RGBA'

const sharedStyles = css`
  background-color: #eee;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin: 10px 0 20px 0;
  padding: 2rem;
  box-sizing: border-box;
`

const StyledInput = styled.input`
  display: block;
  appearance: none;
  outline: 0;
  border: 1px solid ${HEX2RGBA('#ffffff', 40)};
  background-color: ${HEX2RGBA('#ffffff', 20)};
  width: 100%;

  border-radius: 3px;
  padding: 10px 15px;
  margin: 0 auto 10px auto;
  display: block;
  text-align: center;
  font-size: 18px;

  color: #ffffffb7;

  transition-duration: 0.25s;
  font-weight: 300;

  &:hover {
    background-color: ${HEX2RGBA('#ffffff', 30)};
  }

  &:focus {
    background-color: white;
    color: ${({ theme }) => theme.secondary};
  }
`

const StyledTextArea = styled.textarea`
  background-color: #eee;
  width: 100%;
  min-height: 100px;
  resize: none;

  ${sharedStyles}
`

const StyledButton = styled.button`
  display: block;
  background-color: #f7797d;
  color: #fff;
  font-size: 0.9rem;
  border: 0;
  border-radius: 5px;
  height: 40px;
  padding: 0 20px;
  cursor: pointer;
  box-sizing: border-box;
`
export { StyledInput, StyledTextArea, StyledButton }
