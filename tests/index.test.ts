import { createProcessor, process } from './tester'

describe('postcss-transform-decl', () => {

  it('should be able to transform properties with specific names', async () => {
    const processor = createProcessor({
      rules: [
        { prop: 'overflow', from: 'overlay', to: 'hidden' },
      ],
    })
    const result = await process(processor, '.foo { overflow: overlay }')
    expect(result.css).toBe('.foo { overflow: hidden }')
    expect(result.warnings()).toHaveLength(0)
  })

  it('should be able to match property names with RegExps', async () => {
    const processor = createProcessor({
      rules: [
        { prop: /^overflow-?/, from: 'overlay', to: 'hidden' },
      ],
    })
    const result = await process(processor, '.foo { overflow: overlay }')
    expect(result.css).toBe('.foo { overflow: hidden }')
    expect(result.warnings()).toHaveLength(0)
  })

  it('should be able to add a new property before the property', async () => {
    const processor = createProcessor({
      rules: [
        { prop: /^overflow-?/, from: 'overlay', to: 'hidden', at: 'before' },
      ],
    })
    const result = await process(processor, '.foo { overflow: overlay }')
    expect(result.css).toBe('.foo { overflow: hidden; overflow: overlay }')
    expect(result.warnings()).toHaveLength(0)
  })

  it('should be able to add a new property after the property', async () => {
    const processor = createProcessor({
      rules: [
        { prop: /^overflow-?/, from: 'auto', to: 'overlay', at: 'after' },
      ],
    })
    const result = await process(processor, '.foo { overflow: auto }')
    expect(result.css).toBe('.foo { overflow: auto; overflow: overlay }')
    expect(result.warnings()).toHaveLength(0)
  })

  it('should be able to replace the original value', async () => {
    const processor = createProcessor({
      rules: [
        { prop: /^overflow-?/, from: /^(.+)lay$/, to: '$1load' },
      ],
    })
    const result = await process(processor, '.foo { overflow: overlay }')
    expect(result.css).toBe('.foo { overflow: overload }')
    expect(result.warnings()).toHaveLength(0)
  })

  it('should be able to replace the original value with a function', async () => {
    const processor = createProcessor({
      rules: [
        { prop: /^overflow-?/, from: /^(.+)lay$/, to: (matches, over) => `${over}load` },
      ],
    })
    const result = await process(processor, '.foo { overflow: overlay }')
    expect(result.css).toBe('.foo { overflow: overload }')
    expect(result.warnings()).toHaveLength(0)
  })

  it('should be able to set custom transform functions', async () => {
    const processor = createProcessor({
      rules: [
        {
          prop: /^overflow-?/,
          async transform(decl) {
            if (decl.prop === 'overflow-x') {
              return { from: 'overlay', to: 'auto' }
            } else {
              decl.value = 'hidden'
            }
          },
        },
      ],
    })
    const result1 = await process(processor, '.foo { overflow: overlay }')
    expect(result1.css).toBe('.foo { overflow: hidden }')
    expect(result1.warnings()).toHaveLength(0)

    const result2 = await process(processor, '.foo { overflow-x: overlay }')
    expect(result2.css).toBe('.foo { overflow-x: auto }')
    expect(result2.warnings()).toHaveLength(0)
  })

})
