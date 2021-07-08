import Navbar from 'components/navbar'
import Topbar from 'components/sidebar/mobile/Topbar'
import { ScrollToTop } from 'hoc'

const MobileLayout = ({ children }) => {
  return (
    <ScrollToTop>
      <Navbar />
      <Topbar />
      {children}
    </ScrollToTop>
  )
}

export default MobileLayout
