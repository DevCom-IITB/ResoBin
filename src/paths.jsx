import { kebabCase } from 'lodash'

export const courseTitleToSlug = (courseTitle) => kebabCase(courseTitle)

export const coursePageUrl = (courseCode, courseTitle) =>
  `/courses/${courseCode}/${courseTitleToSlug(courseTitle)}`
