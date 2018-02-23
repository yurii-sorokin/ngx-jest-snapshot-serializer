import { debugNodeToJSON, DebugNodeConverterOptions, DebugNodeJSON } from './debug-node-to-json'
import { ComponentFixture } from '../fixture'

const defaultHostName = 'ng-component'

const getHostElementName = (fixture: ComponentFixture): string => {
  try {
    return fixture.debugElement._debugContext.elDef.element.name
  } catch (err) {
    return defaultHostName
  }
}

const fixtureToJSON = (fixture: ComponentFixture, options: DebugNodeConverterOptions): DebugNodeJSON => {
  const debugNodeJson = debugNodeToJSON(fixture.debugElement, options) as DebugNodeJSON

  return {
    ...debugNodeJson,
    type: getHostElementName(fixture)
  }
}

export {
  fixtureToJSON
}
