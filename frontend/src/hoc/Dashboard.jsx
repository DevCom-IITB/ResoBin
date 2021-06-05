import Sidebar from 'components/sidebar'
import Navbar from 'components/navbar'
import { ScrollToTop } from 'hoc'

const Dashboard = (props) => {
  return (
    <ScrollToTop>
      <Navbar />
      <Sidebar />
      {props.children}
    </ScrollToTop>
  )
}

export default Dashboard
