export const search = ({ dataSrc, dataKeys, keywords }) => {
  // ? empty search allow all
  if (!keywords) return dataSrc

  return dataSrc.filter((item) => {
    // ? check if keyword exists in any of the selected keys
    // ? accept only if keyword is found (default: accept nothing)
    let flg = false
    dataKeys.forEach((key) => {
      const value = item[key]
      if (value && value.toLowerCase().includes(keywords.toLowerCase()))
        flg = true
    })
    return flg
  })
}

export const searchAsync = ({ timeout = 200, ...searchParams }) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const result = search(searchParams)
        resolve(result)
      } catch {
        reject(new Error('Search error'))
      }
    }, timeout)
  })
