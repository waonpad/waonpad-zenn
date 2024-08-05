import { describe, expect, it, vi } from "vitest"
import { myFunc, myFunc2 } from "."

describe(myFunc, () => {
  it('should log name', () => {
    const mockLogger = vi.fn(() => {})
    const name = "user"

    const injected = myFunc.inject({
      logger: mockLogger
    })

    injected(name)

    expect(mockLogger).toHaveBeenCalledWith(name)
  })
})

describe(myFunc2, () => {
  it('should log name', () => {
    const mockLogger = vi.fn(() => {})
    const name = "user"

    myFunc2({ name }, { __deps: { logger: mockLogger } })

    expect(mockLogger).toHaveBeenCalledWith(name)
  })
})
