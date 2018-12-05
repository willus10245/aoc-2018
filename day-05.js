const fs = require('fs')
const fileName = process.argv[2]

const reactionRegex = /aA|Aa|bB|Bb|cC|Cc|dD|Dd|eE|Ee|fF|Ff|gG|Gg|hH|Hh|iI|Ii|jJ|Jj|kK|Kk|lL|Ll|mM|Mm|nN|Nn|oO|Oo|pP|Pp|qQ|Qq|rR|Rr|sS|Ss|tT|Tt|uU|Uu|vV|Vv|wW|Ww|xX|Xx|yY|Yy|zZ|Zz/g

function iterate(err, data) {
  if (err) throw err

  let results = {}

  function performReaction(string) {
    console.log(string.length)
    const newString = string.replace(reactionRegex, '')
    console.log(newString.length)
    if (string.length === newString.length) {
      return newString.length
    }
    return performReaction(newString)
  }

  for (let i = 65; i < 91; i++) {
    const letter = String.fromCharCode(i)
    const strWithLetterRemoved = data.trim().replace(new RegExp(letter, 'gi'), '')
    const length = performReaction(strWithLetterRemoved)
    results[letter] = length
  }

  console.log(results)

  console.log(Math.min(...Object.values(results)))
  console.log(Object.keys(results).filter(key => results[key] === Math.min(...Object.values(results))))
}

// iterate(null, 'dabAcCaCBAcCcaDA')

fs.readFile(fileName, 'utf8', iterate)
