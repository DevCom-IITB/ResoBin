// Unit: rem
const size = {
  xs: 0.75,
  sm: 0.875,
  md: 1.0,
  lg: 1.125,
  xl: 1.25,
  xxl: 1.5,
}

const makeResponsive = (fontSize) =>
  `clamp(${fontSize}rem, ${2 * fontSize}vw, ${fontSize + 0.125}rem)`

const fontSize = {
  static: {
    xs: `${size.xs}rem`,
    sm: `${size.sm}rem`,
    md: `${size.md}rem`,
    lg: `${size.lg}rem`,
    xl: `${size.xl}rem`,
  },

  responsive: {
    xs: makeResponsive(size.xs),
    sm: makeResponsive(size.sm),
    md: makeResponsive(size.md),
    lg: makeResponsive(size.lg),
    xl: makeResponsive(size.xl),
    xxl: makeResponsive(size.xxl),
  },
}

export const fontSizeS = fontSize.static
export const fontSizeR = fontSize.responsive

export default fontSize
