import * as isNil from 'lodash.isnil'
import * as negate from 'lodash.negate'
import { getProps, DebugNodeJSONProps } from '../props-extractor'
import { DebugNode } from '../debug-node'
import { isNodeElement, isNodeComment } from './dom-utils'
import { parseMatchOption } from './options-utils'

export interface DebugNodeConverterOptions {
  printComments?: boolean
  ignoreProps?: string[]
}

export interface DebugNodeJSON {
  node: Node,
  type: string,
  props: DebugNodeJSONProps,
  children: Node[] | DebugNodeJSON[] | null,
  $$typeof: Symbol
}

const getDebugNodeChildren = (debugNode: DebugNode, options: DebugNodeConverterOptions): DebugNodeJSON[] =>
  debugNode.childNodes
    .map(node => debugNodeToJSON(node, options))
    .filter(negate(isNil))

const getNativeNodeChildren = (debugNode: DebugNode): Node[] =>
  Array.from(debugNode.nativeNode.childNodes)

const debugNodeToJSON = (debugNode: DebugNode, options: DebugNodeConverterOptions): DebugNodeJSON | Node | null => {
  const { ignoreProps, printComments } = options
  const node = debugNode.nativeNode

  if (!isNodeElement(node)) {
    return isNodeComment(node) && !printComments ? null : node
  }

  const { innerHTML, ...props } = getProps(debugNode, {
    ignoreProps: ignoreProps.map(parseMatchOption)
  })
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

export {
  debugNodeToJSON
}
