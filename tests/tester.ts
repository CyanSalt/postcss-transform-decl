import postcss from 'postcss'
import type Processor from 'postcss/lib/processor'

export function createProcessor(options) {
  const plugin = require('../src')
  return postcss([
    plugin(options),
  ])
}

export function createLegacyProcessor(options) {
  const legacyPlugin = require('../src/legacy')
  return postcss([
    legacyPlugin(options),
  ])
}

export function process(processor: Processor, input: string) {
  return processor.process(input, { from: undefined })
}
