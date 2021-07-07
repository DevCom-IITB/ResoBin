import styled from 'styled-components'

const scrollBar = styled.div`
  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 2rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: gray;
    border-radius: 2rem;
  }
`

export default scrollBar
