const globalTheme = {
	switchWidth: '40px',
	switchHeight: '20px',
	switchPadding: '3px',
	colorContrastLow: '#d3d3d4',
	colorWhite: '#FFF',
	switchColorPrimary: '#302C40',
	switchAnimationDuration: '0.2s',
	gradient: 'linear-gradient(122deg, rgba(128,74,216,1) 0%, rgba(98,75,217,1) 100%)',
	colorGreen: '#5DC399',
	colorGray: '#adadad',
}

export const lightTheme = {
	primary: '#FFF',
	secondary: '#F8F8F8',
	darksecondary: '#2C2839',
	textColor: '#585280',
	textColorInactive: '#AAA5A5',
	header: '#585280',
	headerNumber: '#FFF',
	activeMenu: '#585280',
	courseBG: '#B2BFE1',
	logo: '#707AFF',
	...globalTheme,
}

export const darkTheme = {
	primary: '#FEDFED',
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
	...globalTheme,
}
