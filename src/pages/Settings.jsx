import styled from 'styled-components/macro'

import { DarkmodeToggle } from 'components/settings'
import { device } from 'styles/responsive'

const Container = styled.div`
  min-height: calc(100vh - ${({ theme }) => theme.headerHeight});

  @media ${device.min.md} {
    margin-left: ${({ theme }) => theme.asideWidthLeft};
  }
`

const Settings = () => {
  return (
    <Container>
      <h1>Switch theme</h1>
      <DarkmodeToggle />
      <h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure eveniet
        voluptates asperiores modi expedita architecto quod optio numquam
        aperiam sapiente nemo omnis soluta a amet sunt ad quia error aut
        tenetur. Consequuntur quos perferendis nesciunt est odio fugiat autem
        aliquam iste iusto voluptatum, itaque quam sint dolorum possimus atque
        reiciendis et cumque consequatur? Nihil consectetur placeat vero! Hic
        iste nesciunt libero rerum dolor minus magni tempore dolore accusantium
        tenetur iusto repudiandae, fugiat, repellendus debitis enim, reiciendis
        voluptas adipisci?
      </h1>
    </Container>
  )
}

export default Settings
