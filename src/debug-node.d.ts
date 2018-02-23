export declare class DebugNodeEventListener {
  name: string
  callback: Function
}

export interface DebugNodeProperties {
  [key: string]: any
}

export interface DebugNodeAttributes {
  [key: string]: string | null
}

export interface DebugNodeClasses {
  [key: string]: boolean
}

export interface DebugNodeStyles {
  [key: string]: string | null
}

export interface DebugNodeReferences {
  [key: string]: any
}

export interface DebugNode {
  _debugContext: any
  name: string
  nativeNode: Node
  childNodes: DebugNode[]
  listeners: DebugNodeEventListener[]
  properties: DebugNodeProperties
  attributes: DebugNodeAttributes
  classes: DebugNodeClasses
  styles: DebugNodeStyles
  parent: any
  readonly injector: any
  readonly componentInstance: any
  readonly context: any
  readonly references: DebugNodeReferences
  readonly providerTokens: any[]
}
