import { camelCase, snakeCase } from 'lodash'

export const camelizeKeys = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map((v) => camelizeKeys(v))
  }

  if (obj instanceof Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [camelCase(key)]: camelizeKeys(obj[key]),
      }),
      {}
    )
  }

  return obj
}

export const snakeizeKeys = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map((v) => snakeizeKeys(v))
  }

  if (obj instanceof Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [snakeCase(key)]: snakeizeKeys(obj[key]),
      }),
      {}
    )
  }

  return obj
}
