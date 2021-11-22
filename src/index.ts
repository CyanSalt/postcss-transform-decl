import type { PluginCreator } from 'postcss'
import type { PluginOptions } from './options'
import { transformRoot } from './transform'

const plugin: PluginCreator<PluginOptions> = ({ rules = [] } = {}) => {
  return {
    postcssPlugin: 'postcss-transform-decl',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Once(root) {
      transformRoot(root, rules)
    },
  }
}
plugin.postcss = true

module.exports = plugin
