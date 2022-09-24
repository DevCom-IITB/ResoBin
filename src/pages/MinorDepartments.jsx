import { Helmet } from 'react-helmet-async'

import { DepartmentsContainer } from 'components/MinorDepartments'
import { PageContainer } from 'components/shared'

const MinorDepartments = () => {
  return (
    <PageContainer>
      <Helmet>
        <title>Minors - ResoBin</title>
        <meta name="description" content="Courses availabe at IIT Bombay" />
      </Helmet>
      <DepartmentsContainer/>
    </PageContainer>
  )
}

export default MinorDepartments
