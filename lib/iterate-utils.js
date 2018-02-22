const isNullOrUndefined = (val) => val === null || val === undefined
const not = (predicate) => (...args) => !predicate(...args)
const arrayFromString = (str, splitter) => str ? str.split(splitter) : []

module.exports = {
  not,
  isNullOrUndefined,
  arrayFromString,
}
