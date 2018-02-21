'use strict'

const ignoredProps = ['ng-version']

const filterProps = (props, ignoredProps) => {
  return Object.keys(props)
    .filter(prop => !ignoredProps.includes(prop))
    .reduce((filteredProps, prop) => ({ ...filteredProps, [prop]: props[prop] }), {})
}

const getBoundClasses = (debugNode) => {
  const { classes = {} } = debugNode
  return Object.keys(classes)
    .filter(className => classes[className])
}

const getBoundStyles = (debugNode) => {
  const { styles = {} } = debugNode
  return Object.keys(styles)
    .map(styleRule => `${styleRule}: ${styles[styleRule]}`)
}

const rClassSplitter = /\s+/
const rStyleSplitter = /\s+;\s+/
const classSplitter = ' '
const styleSplitter = '; '

const arrayFromString = (str, splitter) => str ? str.split(splitter) : []

const getProps = (debugNode) => {
  const { properties = {}, attributes = {} } = debugNode
  const allClasses = arrayFromString(attributes['class'], rClassSplitter)
    .concat(getBoundClasses(debugNode))
  const allStyles = arrayFromString(attributes.style, rStyleSplitter)
    .concat(getBoundStyles(debugNode))

  return filterProps({
    ...properties,
    ...attributes,
    ...(allClasses.length ? { 'class': allClasses.join(classSplitter) } : {}),
    ...(allStyles.length ? { style: allStyles.join(styleSplitter) } : {})
  }, ignoredProps)
}

module.exports = {
  getProps
}
