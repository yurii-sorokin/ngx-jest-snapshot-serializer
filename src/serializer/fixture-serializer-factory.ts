import { Plugin } from 'pretty-format'
import { fixtureToJSON, DebugNodeConverterOptions } from '../fixture-converter'
import { ComponentFixture } from '../fixture'

const defaultOptions: Partial<DebugNodeConverterOptions> = {
  printComments: false,
  ignoreProps: ['ng-version']
}

function isAngularFixture(fixture: ComponentFixture): boolean {
  return Boolean(fixture && fixture.componentRef)
}

function createFixtureSerializer(options: DebugNodeConverterOptions = {}): Plugin {
  return {
    print(value: any, serialize: (data: any) => any) {
      return serialize(fixtureToJSON(value, { ...defaultOptions, ...options }))
    },
    test(value: any) {
      return isAngularFixture(value)
    }
  }
}

export {
  createFixtureSerializer
}
