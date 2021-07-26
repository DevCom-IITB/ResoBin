export const search = ({ dataSrc, dataKeys, keywords }) => {
  // ? empty search allow all
  if (!keywords) return dataSrc

  const re = new RegExp(`\\b${keywords.toLowerCase()}`, 'gi')

  return dataSrc.filter((item) => {
    // ? check if keyword exists in any of the selected keys
    // ? accept only if keyword is found (default: accept nothing)
    let flg = false
    dataKeys.forEach((key) => {
      const value = item[key]
      if (value && value.toLowerCase().match(re)) flg = true
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

export const HighlightSearch = (children, searchKeywords) => {
  const text = children
  if (!searchKeywords || !text || text.length === 0) return text

  const re = new RegExp(`\\b${searchKeywords.toLowerCase()}`, 'gi')
  const parts = text.split(re)

  return (
    <>
      {parts.map((part) => {
        if (part.toLowerCase() === searchKeywords.toLowerCase())
          return <mark key={part}>{part}</mark>

        return part
      })}
    </>
  )
}
