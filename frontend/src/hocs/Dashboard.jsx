import Sidebar from 'components/sidebar'
import Navbar from 'components/navbar'

const Dashboard = (props) => {
  return (
    <>
      <Navbar />
      <Sidebar />
      {props.children}
    </>
  )
}

export default Dashboard
