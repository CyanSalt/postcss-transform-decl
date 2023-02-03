import * as postcss from 'postcss'
import type { PluginOptions } from './options'
import { rootProcessor } from './processor'

// @ts-expect-error legacy version of postcss
const plugin = postcss.plugin(
  'postcss-transform-decl',
  ({ rules = [] }: PluginOptions = {}): postcss.TransformCallback => {
    return root => rootProcessor(root, rules)
  },
)

module.exports = plugin
