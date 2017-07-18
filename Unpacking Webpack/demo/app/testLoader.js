module.exports = function jsLoader(source) {
  console.log('in parent scope laoder', source)
  return source
}