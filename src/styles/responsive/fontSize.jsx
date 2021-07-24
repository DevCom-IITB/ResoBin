// ? https://tailwindcss.com/docs/font-size
// * unit: rem
// * '$' added as variable cannot start with a number
const size = {
  xs: 0.75,
  sm: 0.875,
  md: 1.0,
  lg: 1.125,
  xl: 1.25,
  $2xl: 1.5,
  $3xl: 1.875,
  $4xl: 2.25,
  $5xl: 3,
  $6xl: 3.75,
  $7xl: 4.5,
}

// ? mobile first (font-size increases with window width)
// * fluid transition between mobile and desktop fonts
// * https://css-tricks.com/linearly-scale-font-size-with-css-clamp-based-on-the-viewport/
const makeResponsive = (fontSizeSmall, fontSizeLarge) =>
  `clamp(${fontSizeSmall}rem, ${2 * fontSizeSmall}vw, ${fontSizeLarge}rem)`

const fontSize = {
  static: {
    xs: `${size.xs}rem`,
    sm: `${size.sm}rem`,
    md: `${size.md}rem`,
    lg: `${size.lg}rem`,
    xl: `${size.xl}rem`,
    $2xl: `${size.$2xl}rem`,
    $3xl: `${size.$3xl}rem`,
    $4xl: `${size.$4xl}rem`,
    $5xl: `${size.$5xl}rem`,
    $6xl: `${size.$6xl}rem`,
  },

  responsive: {
    xs: makeResponsive(size.xs, size.sm),
    sm: makeResponsive(size.sm, size.md),
    md: makeResponsive(size.md, size.lg),
    lg: makeResponsive(size.lg, size.xl),
    xl: makeResponsive(size.xl, size.$2xl),
    $2xl: makeResponsive(size.$2xl, size.$3xl),
    $3xl: makeResponsive(size.$3xl, size.$4xl),
    $4xl: makeResponsive(size.$4xl, size.$5xl),
    $5xl: makeResponsive(size.$5xl, size.$6xl),
    $6xl: makeResponsive(size.$6xl, size.$7xl),
  },
}

export const fontSizeS = fontSize.static
export const fontSizeR = fontSize.responsive

export default fontSize
