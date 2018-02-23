import { initHostFixture } from './framework/host'

describe(`Empty`, () => {
  it(`should print empty component`, () => {
    const fixture = initHostFixture({})

    expect(fixture).toMatchSnapshot()
  })
})
