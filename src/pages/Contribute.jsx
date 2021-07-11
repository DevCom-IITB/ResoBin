import { FileDetails, FileList } from 'components/contribute'
import { Helmet } from 'react-helmet-async'

const Contribute = () => {
  return (
    <>
      <Helmet>
        <title>Contribute - ResoBin</title>
        <meta name="description" content="Upload and share your own notes" />
      </Helmet>

      <FileDetails />
      <FileList />
    </>
  )
}

export default Contribute
