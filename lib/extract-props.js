'use strict'

const { arrayFromString } = require('./iterate-utils')

const filterProps = (props, ignoreProps = []) => {
  return Object.keys(props)
    .filter(prop => !ignoreProps.includes(prop))
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

const getListeners = (debugNode) => {
  const { listeners = [] } = debugNode
  return listeners
    .reduce((map, listener) => ({ ...map, [listener.name]: listener.callback }), {})
}

const rClassSplitter = /\s+/
const classSplitter = ' '
const getAllClasses = (debugNode) => {
  const { attributes = {} } = debugNode
  return arrayFromString(attributes['class'], rClassSplitter)
    .concat(getBoundClasses(debugNode))
}

const rStyleSplitter = /\s+;\s+/
const styleSplitter = '; '
const getAllStyles = (debugNode) => {
  const { attributes = {} } = debugNode
  return arrayFromString(attributes.style, rStyleSplitter)
    .concat(getBoundStyles(debugNode))
}

const getProps = (debugNode, options = {}) => {
  const { properties = {}, attributes = {} } = debugNode
  const allClasses = getAllClasses(debugNode)
  const allStyles = getAllStyles(debugNode)

  const props = {
    ...properties,
    ...attributes,
    ...(allClasses.length ? { 'class': allClasses.join(classSplitter) } : {}),
    ...(allStyles.length ? { style: allStyles.join(styleSplitter) } : {}),
    ...getListeners(debugNode)
  }

  return filterProps(props, options.ignoreProps)
}

module.exports = {
  getProps
}
