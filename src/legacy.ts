import * as postcss from 'postcss'
import type { PluginOptions } from './options'
import { transformRoot } from './transform'

// @ts-expect-error legacy version of postcss
const plugin = postcss.plugin(
  'postcss-transform-decl',
  ({ rules = [] }: PluginOptions = {}): postcss.TransformCallback => {
    return root => {
      transformRoot(root, rules)
    }
  },
)

module.exports = plugin
