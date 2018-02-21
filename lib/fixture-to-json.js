'use strict'

const { debugNodeToJSON } = require('./debug-node-to-json')

const defaultHostName = 'ng-component'

const getHostElementName = (fixture) => {
  try {
    return fixture.debugElement._debugContext.elDef.element.name
  } catch (err) {
    return defaultHostName
  }
}

const fixtureToJSON = (fixture, options) => {
  const debugNodeJson = debugNodeToJSON(fixture.debugElement, options)

  return {
    ...debugNodeJson,
    type: getHostElementName(fixture)
  }
}

module.exports = {
  fixtureToJSON
}
