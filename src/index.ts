import type { PluginCreator } from 'postcss'
import type { PluginOptions } from './options'
import { rootProcessor } from './processor'

const plugin: PluginCreator<PluginOptions> = ({ rules = [] } = {}) => {
  return {
    postcssPlugin: 'postcss-transform-decl',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Once: root => rootProcessor(root, rules),
  }
}
plugin.postcss = true

module.exports = plugin
