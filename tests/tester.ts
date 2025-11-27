import postcss from 'postcss'
import type Processor from 'postcss/lib/processor'
import plugin from '../src'
import type { PluginOptions } from '../src/options'

export function createProcessor(options: PluginOptions) {
  return postcss([
    plugin(options),
  ])
}

export async function createLegacyProcessor(options: PluginOptions) {
  const { default: legacyPlugin } = await import('../src/legacy')
  return postcss([
    legacyPlugin(options),
  ])
}

export function process(processor: Processor, input: string) {
  return processor.process(input, { from: undefined })
}
