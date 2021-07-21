export const search = ({ data, keyword, keys }) => {
  // ? empty search allow all
  if (!keyword) return data

  return data.filter((item) => {
    // ? check if keyword exists in any of the selected keys
    // ? accept only if keyword is found (default: accept nothing)
    let flg = false
    keys.forEach((key) => {
      const value = item[key]
      if (value && value.toLowerCase().includes(keyword.toLowerCase()))
        flg = true
    })
    return flg
  })
}

export const searchAsync = ({ data, keyword, keys, timeout = 200 }) => {
  if (keyword) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const result = search({ data, keyword, keys })
        resolve(result)
      }, timeout)
    })
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data)
    }, timeout)
  })
}
