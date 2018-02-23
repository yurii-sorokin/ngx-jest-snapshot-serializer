import { Plugin } from 'pretty-format'
import { createFixtureSerializer } from './fixture-serializer-factory'

export const defaultFixtureSerializer: Plugin = createFixtureSerializer()
