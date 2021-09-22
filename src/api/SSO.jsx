export const SSO = {
  HOST: 'https://gymkhana.iitb.ac.in/sso/oauth/authorize/',
  CLIENT_ID: '6zMDj3RzgMctmdpvlPdouZKcj1ABlSkAB6snbYy5',
  REDIRECT_URI: 'http://localhost:3000/login',
  SCOPE: 'basic profile picture ldap program',
  RESPONSE_TYPE: 'code',
}

export const LoginURL = `${SSO.HOST}?client_id=${SSO.CLIENT_ID}&response_type=${SSO.RESPONSE_TYPE}&scope=${SSO.SCOPE}&redirect_uri=${SSO.REDIRECT_URI}`
