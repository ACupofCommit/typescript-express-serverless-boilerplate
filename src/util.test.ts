import { getWorld } from './util'

describe("scrapOne", () => {
  test(`getWorld() should be return "world"`, () => {
    expect(getWorld()).toBe("world")
  })
})
