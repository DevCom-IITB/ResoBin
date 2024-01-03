import { Helmet } from 'react-helmet-async'

import { CPIPredictorContainer } from 'components/CPIPredictor'
import { PageContainer } from 'components/shared'


const CPIPredictor = () => {
  return (
    <PageContainer>
      <Helmet>
        <title>CPI  Predictor - ResoBin</title>
        <meta name="description" content="CPI Prediction for IITB Students" />
      </Helmet>
      
      <CPIPredictorContainer />
    </PageContainer>
  )
}

export default CPIPredictor
