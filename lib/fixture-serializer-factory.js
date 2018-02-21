'use strict'

const { fixtureToJSON } = require('./fixture-to-json')

const isAngularFixture = (fixture) =>
  fixture && fixture.componentRef

const createFixtureSerializer = () => ({
  print: (fixture, serialize) => serialize(fixtureToJSON(fixture)),
  test: (fixture) => isAngularFixture(fixture)
})

module.exports = {
  createFixtureSerializer
}
