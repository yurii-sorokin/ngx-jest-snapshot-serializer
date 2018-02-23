import * as uniq from 'lodash.uniq'
import * as omitBy from 'lodash.omitBy'
import { normalizeProp } from './prop-normalizer'
import { DebugNode } from '../debug-node'

export interface PropsExtractorOptions {
  ignoreProps?: string[]
}

export interface DebugNodeJSONProps {
  [propName: string]: any
}

const arrayFromString = (string: string, separator: RegExp | string): string[] =>
  string ? string.split(separator) : []

const omitProps = (props: DebugNodeJSONProps, ignoreProps: string[]): DebugNodeJSONProps =>
  omitBy(props, (value, key) => ignoreProps.includes(key))

const normalizeProps = (props: DebugNodeJSONProps): DebugNodeJSONProps =>
  Object.keys(props)
    .reduce((normalizedProps, key) => {
      normalizedProps[key] = normalizeProp(props[key])
      return normalizedProps
    }, {})

const getBoundClasses = (debugNode: DebugNode): string[] => {
  const { classes } = debugNode
  return Object.keys(classes)
    .filter(className => classes[className])
}

const rClassSplitter = /\s+/
const getAttributeClasses = (debugNode: DebugNode): string[] =>
  arrayFromString(debugNode.attributes && debugNode.attributes.class, rClassSplitter)

const getClasses = (debugNode): string[] => {
  return getAttributeClasses(debugNode)
    .concat(getBoundClasses(debugNode))
    .filter(uniq)
}
const getBoundStyles = (debugNode): string[] => {
  const { styles } = debugNode
  return Object.keys(debugNode.styles)
    .map(styleRule => `${styleRule}: ${styles[styleRule]}`)
}

const rStyleSplitter = /\s+;\s+/
const getAttributeStyles = (debugNode: DebugNode): string[] => {
  return arrayFromString(debugNode.attributes && debugNode.attributes.styles, rStyleSplitter)
    .filter(Boolean)
}

const getStyles = (debugNode: DebugNode): string[] =>
  getAttributeStyles(debugNode)
    .concat(getBoundStyles(debugNode))

const getListeners = (debugNode: DebugNode): any =>
  debugNode.listeners
    .reduce((listenersMap, listener) => {
      listenersMap[listener.name] = listener.callback
      return listenersMap
    }, {})

const styleSplitter = '; '
const classSplitter = ' '
const getProps = (debugNode: DebugNode, options: PropsExtractorOptions): DebugNodeJSONProps => {
  const { properties, attributes } = debugNode
  const classes = getClasses(debugNode)
  const styles = getStyles(debugNode)

  const props: DebugNodeJSONProps = {
    ...properties,
    ...attributes,
    ...(classes.length ? { 'class': classes.join(classSplitter) } : {}),
    ...(styles.length ? { style: styles.join(styleSplitter) } : {}),
    ...getListeners(debugNode)
  }

  return normalizeProps(omitProps(props, options.ignoreProps))
}

export {
  getProps
}
