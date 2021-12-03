import { kebabCase } from 'lodash'

export const displayYear = (year) =>
  year ? `${year}/${Math.ceil(year / 100) + 1}` : ''

export const coursePageUrl = (code, title, hash) =>
  `/courses/${code}/${kebabCase(title)}${hash ? `#${hash}` : ''}`
