const globalTheme = {
  switchWidth: '40px',
  switchHeight: '20px',
  switchPadding: '3px',
  colorContrastLow: '#d3d3d4',
  colorWhite: '#FFF',
  switchColorPrimary: '#302C40',
  switchAnimationDuration: '0.2s',
  gradient:
    'linear-gradient(122deg, rgba(128,74,216,1) 0%, rgba(98,75,217,1) 100%)',
  colorGreen: '#5DC399',
  colorGray: '#adadad',
  searchColor: '#f1f1f1',
}

export const LightTheme = {
  primary: '#ffffff',
  secondary: '#F8F8F8',
  darksecondary: '#DADAEA',
  textColor: '#585280',
  textColorInactive: '#AAA5A5',
  header: '#585280',
  headerNumber: '#FFF',
  activeMenu: '#585280',
  courseBG: '#B2BFE1',
  logo: '#726E95',
  dividerColor: '#5d598039',
  ...globalTheme,
}

export const DarkTheme = {
  primary: '#d6c9f8',
  // primary: '#302C40',
  secondary: '#2C2839',
  darksecondary: '#1b1728',
  textColor: '#FFF',
  textColorInactive: '#AAA5A5',
  header: '#FFF',
  headerNumber: '#585280',
  activeMenu: '#FFF',
  courseBG: '#B2BFE1',
  logo: '#707AFF',
  dividerColor: 'rgba(255, 255, 255, 0.1)',
  ...globalTheme,
}
