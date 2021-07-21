const search = ({ data, keyword, keys, timeout = 200 }) => {
  if (keyword) {
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

  // ? empty search allow all
  return data
}

export default search
