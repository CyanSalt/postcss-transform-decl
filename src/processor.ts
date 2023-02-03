import type { Declaration, Root } from 'postcss'

export interface Rule {
  prop: string | RegExp,
  from?: string | RegExp,
  to?: string, // or ((substring: string, ...args: any[]) => string);
  at?: 'before' | 'after',
  transform?: (decl: Declaration) => PromiseLike<Omit<Rule, 'prop'> | null | undefined>
  | Omit<Rule, 'prop'> | null | undefined,
}

async function walkDeclsAsync(
  root: Root,
  filter: string | RegExp,
  callback: (decl: Declaration, index: number) => Promise<unknown>,
) {
  const promises: Promise<unknown>[] = []
  root.walkDecls(filter, (decl, index) => {
    promises.push(callback(decl, index))
  })
  return Promise.all(promises)
}

export async function rootProcessor(root: Root, rules: Rule[]): Promise<void> {
  await Promise.all(rules.map(rawRule => {
    return walkDeclsAsync(root, rawRule.prop, async decl => {
      const transform = rawRule.transform
      const rule = typeof transform === 'function'
        ? await transform(decl) ?? rawRule
        : rawRule
      if (rule.from && rule.to && decl.value.match(rule.from)) {
        const value = decl.value.replace(rule.from, rule.to)
        if (rule.at === 'before') {
          decl.cloneBefore({
            prop: decl.prop,
            value,
          })
        } else if (rule.at === 'after') {
          decl.cloneAfter({
            prop: decl.prop,
            value,
          })
        } else {
          decl.value = value
        }
      }
    })
  }))
}
