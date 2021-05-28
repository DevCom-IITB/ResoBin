import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
      <h1>Error page not found.</h1>
      <p>
        Return <Link to="/">home</Link>.
      </p>
    </div>
  )
}

export default NotFound
