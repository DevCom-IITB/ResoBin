import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'

import { FileDetails, FileList } from 'components/contribute'

const Container = styled.div`
  margin-left: 11.5rem;
  background-color: ${({ theme }) => theme.primary};
`

const Contribute = () => {
  const [formvalue, setFormvalue] = useState([])
  const handleFormdetail = (value) => {
    setFormvalue(value)
  }

  return (
    <Container>
      <Helmet>
        <title>Contribute - ResoBin</title>
        <meta name="description" content="Upload and share your own notes" />
      </Helmet>

      <FileDetails
        handleFormdetail={(value) => {
          handleFormdetail(value)
        }}
      />
      <FileList formvalues={formvalue} />
    </Container>
  )
}

export default Contribute
