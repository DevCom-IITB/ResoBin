import styled from 'styled-components'

const Container = styled.div`
  background-color: black;
  opacity: 20%;
  display: flex;
  width: 100%;
  height: 4rem;

  bottom: 0;
`

const PageNo = () => {
  return (
    <Container>
      <h1>Page Number</h1>
    </Container>
  )
}

export default PageNo
