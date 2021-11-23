import { kebabCase } from 'lodash'

export const displayYear = (year) => `${year}/${Math.ceil(year / 100) + 1}`

export const courseTitleToSlug = (courseTitle) => kebabCase(courseTitle)

export const coursePageUrl = (courseCode, courseTitle, hash) =>
  `/courses/${courseCode}/${courseTitleToSlug(courseTitle)}${
    hash ? `#${hash}` : ''
  }`
