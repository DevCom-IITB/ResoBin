// import { useState } from 'react'
import styled from 'styled-components'

import { ButtonSquare, InputSquared, TextAreaSquared } from 'components/shared'
// import { Fragment } from 'react'
// import { Link, NavLink } from 'react-router-dom'
// import { connect } from 'react-redux'
// import { logout } from 'store/actions/auth'
// import Alert from ''
// import PropTypes from 'prop-types'

// const initalState = {
//   name: '',
//   email: '',
//   subject: '',
//   message: '',
// }

const ContainerForm = styled.form`
  padding: 1rem;
  margin: 0 0.75rem;
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.darksecondary};
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.5);
`

const FormBody = () => {
  // const [state, setState] = useState(initalState)

  // const handleInput = (e) => {
  //   const inputName = e.currentTarget.name
  //   const value = e.currentTarget.value
  //   setState((prev) => ({ ...prev, [inputName]: value }))
  // }

  return (
    <ContainerForm>
      <InputSquared placeholder="Name" type="text" />
      <InputSquared placeholder="Email" type="email" />
      <InputSquared placeholder="Subject" type="text" height="2rem" />

      <TextAreaSquared
        placeholder="Message"
        // value={state.message}
        // onChange={handleInput}
      />

      <ButtonSquare type="submit">Send Message</ButtonSquare>
    </ContainerForm>
  )
}

export default FormBody
