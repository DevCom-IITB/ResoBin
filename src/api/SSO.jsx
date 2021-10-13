export const SSO = {
  HOST: 'https://gymkhana.iitb.ac.in/sso/oauth/authorize/',
  CLIENT_ID: '6zMDj3RzgMctmdpvlPdouZKcj1ABlSkAB6snbYy5',
  BASE_REDIRECT_URI: 'http://localhost:3000/login',
  SCOPE: 'basic profile picture ldap program',
  RESPONSE_TYPE: 'code',
}

export const getLoginURL = (redirect = '') => {
  const qs = new URLSearchParams()
  qs.append('client_id', SSO.CLIENT_ID)
  qs.append('redirect_uri', `${SSO.BASE_REDIRECT_URI}?redirect=${redirect}`)
  qs.append('scope', SSO.SCOPE)
  qs.append('response_type', SSO.RESPONSE_TYPE)

  return `${SSO.HOST}?${qs.toString()}`
}
