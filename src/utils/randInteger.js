function randInteger(min, max) {
  min === undefined ? 0 : min
  max === undefined ? 0 : max

  return Math.floor(Math.random() * (max - min + 1)) + min
}
