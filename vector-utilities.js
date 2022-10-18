function randomVector(n) {
  // https://stackoverflow.com/questions/5836833/create-an-array-with-random-values

  return Array.from({length: n}, () => Math.random())
}