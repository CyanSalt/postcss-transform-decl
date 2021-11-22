import type { Declaration, Root } from 'postcss'

export interface Rule {
  prop: string | RegExp,
  from?: string | RegExp,
  to?: string, // or ((substring: string, ...args: any[]) => string);
  at?: 'before' | 'after',
  transform?: (decl: Declaration) => Rule | null | undefined,
}

export function transformRoot(root: Root, rules: Rule[]) {
  root.walkRules(cssRule => {
    for (let rule of rules) {
      cssRule.walkDecls(rule.prop, decl => {
        const transform = rule.transform
        if (typeof transform === 'function') {
          rule = transform(decl) ?? rule
        }
        if (rule.from && rule.to && decl.value.match(rule.from)) {
          const value = decl.value.replace(rule.from, rule.to)
          if (rule.at === 'before') {
            cssRule.insertBefore(decl, {
              prop: decl.prop,
              value,
            })
          } else if (rule.at === 'after') {
            cssRule.insertAfter(decl, {
              prop: decl.prop,
              value,
            })
          } else {
            decl.value = value
          }
        }
      })
    }
  })
}
