'use strict'

const { getProps } = require('./extract-props')
const { isNodeElement, isNodeComment } = require('./dom-utils')
const { isNullOrUndefined, not } = require('./iterate-utils')

const getDebugNodeChildren = (debugNode, options) =>
  (debugNode.childNodes || [])
    .map(node => debugNodeToJSON(node, options))
    .filter(not(isNullOrUndefined))

const getNativeNodeChildren = (debugNode) =>
  Array.from(debugNode.nativeNode.childNodes)

const debugNodeToJSON = (debugNode, options = {}) => {
  const { ignoreProps, printComments } = options
  const node = debugNode.nativeNode

  if (!isNodeElement(node)) {
    return isNodeComment(node) && !printComments ? null : node;
  }

  const { innerHTML, ...props } = getProps(debugNode, { ignoreProps })
  const children = innerHTML
    ? getNativeNodeChildren(debugNode)
    : getDebugNodeChildren(debugNode, options)

  return {
    node,
    type: debugNode.name,
    props,
    children,
    $$typeof: Symbol.for('react.test.json')
  }
}

module.exports = {
  debugNodeToJSON
}
