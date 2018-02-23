const isNodeElement = (node: Node): boolean => node.nodeType === Node.ELEMENT_NODE
const isNodeComment = (node: Node): boolean => node.nodeType === Node.COMMENT_NODE

export {
  isNodeElement,
  isNodeComment
}
