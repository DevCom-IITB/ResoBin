import Navbar from 'components/navbar'
import Topbar from 'components/sidebar/mobile/Topbar'
import { ScrollToTop } from 'hoc'

const MobileLayout = (props) => {
  return (
    <ScrollToTop>
      <Navbar />
      <Topbar />
      {props.children}
    </ScrollToTop>
  )
}

export default MobileLayout
