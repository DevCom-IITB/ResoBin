import { ResoBinLogo } from 'components/shared'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
// import { ButtonSquare } from 'components/shared'
// import CurrentTerm from 'components/navbar/CurrentTerm'
// import DarkmodeToggle from 'components/navbar/DarkmodeToggle'

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  background: ${({ theme }) => theme.darksecondary};
  box-shadow: '0 0 0.5rem rgba(0, 0, 0, 0.5)';
  z-index: 9; /* To put navbar at the top */
`

// const LeftContainer = styled.div`
//   position: absolute;
//   left: 0px;
//   min-width: 11.5rem;
//   display: flex;
//   justify-content: center;
// `

// const RightContainer = styled.div`
//   position: absolute;
//   right: 0px;
//   display: flex;
//   align-items: center;
// `

const StyledLink = styled(Link)`
  all: initial;
  text-decoration: none;
`

// const SignUpButton = ({ button, buttonLink }) => {
//   const buttonStyle = {
//     margin: '0.875rem 1rem',
//     height: '2.25rem',
//     fontSize: '1rem',
//   }

//   return (
//     <StyledLink to={buttonLink}>
//       {button && (
//         <ButtonSquare type="submit" style={buttonStyle}>
//           {button}
//         </ButtonSquare>
//       )}
//     </StyledLink>
//   )
// }

const Navbar = ({ button, buttonLink = '' }) => {
  return (
    <Container>
      {/* <LeftContainer> */}
      <StyledLink to="/dashboard">
        <ResoBinLogo size="1.75rem" />
      </StyledLink>
      {/* </LeftContainer> */}

      {/* <CurrentTerm text="AY 2021/22 | AUTUMN" />

      <RightContainer>
        <SignUpButton button={button} buttonLink={buttonLink} />
        <DarkmodeToggle />
      </RightContainer> */}
    </Container>
  )
}

export default Navbar
