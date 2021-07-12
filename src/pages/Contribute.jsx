import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'
import { FileDetails, FileList } from 'components/contribute'
import { useState } from 'react'

const Container = styled.div`
  margin-left: 11.5rem;
`

const Contribute = () => {
  const [formvalue, setFormvalue]= useState([])
  const handleFormdetail = (value) =>{
    setFormvalue(value);
  }
  return (
    <Container>
      <FileDetails handleFormdetail={(value)=>{handleFormdetail(value);}}  />
      <FileList  formvalues={formvalue}/>
    </Container>
  )
}

export default Contribute
