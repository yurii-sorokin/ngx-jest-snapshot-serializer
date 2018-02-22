'use strict'

const { fixtureToJSON } = require('./fixture-to-json')

const defaultOptions = {
  printComments: false,
  ignoreProps: ['ng-version'],
}

const isAngularFixture = (fixture) =>
  fixture && fixture.componentRef

const createFixtureSerializer = (options = {}) => ({
  print: (fixture, serialize) => serialize(fixtureToJSON(fixture, { ...defaultOptions, ...options })),
  test: (fixture) => isAngularFixture(fixture)
})

module.exports = {
  createFixtureSerializer
}
