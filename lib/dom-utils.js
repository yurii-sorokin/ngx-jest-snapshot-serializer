'use strict'

const isNodeElement = (node) => node.nodeType === Node.ELEMENT_NODE
const isNodeComment = (node) => node.nodeType === Node.COMMENT_NODE

module.exports = {
  isNodeElement,
  isNodeComment
}
