export const SSO = {
  HOST: 'https://gymkhana.iitb.ac.in/sso/oauth/authorize/',
  CLIENT_ID: process.env.REACT_APP_SSO_CLIENT_ID,
  BASE_REDIRECT_URI: process.env.REACT_APP_SSO_REDIRECT_URI,
  SCOPE: 'basic profile picture ldap program',
  RESPONSE_TYPE: 'code',
}

export const getLoginURL = (state) => {
  const qs = new URLSearchParams()
  qs.append('client_id', SSO.CLIENT_ID)
  qs.append('redirect_uri', SSO.BASE_REDIRECT_URI)
  qs.append('scope', SSO.SCOPE)
  qs.append('response_type', SSO.RESPONSE_TYPE)
  if (state) qs.append('state', JSON.stringify(state))

  return `${SSO.HOST}?${qs.toString()}`
}
