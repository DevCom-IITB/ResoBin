import { kebabCase } from 'lodash'

export const courseCodeToSlug = (courseCode) => courseCode.replaceAll(' ', '')
export const courseTitleToSlug = (courseTitle) => kebabCase(courseTitle)

export const coursePageUrl = (courseCode, courseTitle) =>
  `/courses/${courseCodeToSlug(courseCode)}/${courseTitleToSlug(courseTitle)}`
