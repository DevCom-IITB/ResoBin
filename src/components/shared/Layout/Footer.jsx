import { Layout } from 'antd'

const Footer = () => {
  return (
    <Layout.Footer
      style={{
        background: 'transparent',
        color: 'white',
        fontSize: '1rem',
        textAlign: 'center',
      }}
    >
      <h4>ResoBin ©2021. All rights reserved.</h4>
      <h5>
        Created by <a href="https://www.devcom-iitb.org">DevCom, IIT Bombay.</a>
      </h5>
    </Layout.Footer>
  )
}

export default Footer
