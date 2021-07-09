import styled from 'styled-components'

const Container = styled.div`
  bottom: 0;
  display: flex;
  opacity: 20%;
  width: 100%;
  height: 4rem;
  background-color: black;
`

const PageNo = () => {
  return (
    <Container>
      <h1>Page Number</h1>
    </Container>
  )
}

export default PageNo
