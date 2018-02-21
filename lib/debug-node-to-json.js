'use strict'

const { getProps } = require('./extract-props')

const isNodeElement = (node) => node.nodeType === Node.ELEMENT_NODE
const isNodeComment = (node) => node.nodeType === Node.COMMENT_NODE

const debugNodeToJSON = (debugNode) => {
  const node = debugNode.nativeNode

  if (!isNodeElement(node)) {
    return isNodeComment(node) ? '' : node
  }

  const { innerHTML, ...props } = getProps(debugNode)
  const children = innerHTML
    ? Array.from(node.childNodes)
    : (debugNode.childNodes || []).map(debugNodeToJSON)

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
