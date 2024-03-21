function randX(min, max, expectsArr) {
  var result = Math.floor(Math.random() * (max - min) + min)
  var exist = false
  if (expectsArr === undefined) expectsArr = []
  for (var i = 0; i < expectsArr.length; i += 1) {
    if (expectsArr[i] === result) exist = true
  }
  if (exist) return randX(min, max, expects)
  return result
}
