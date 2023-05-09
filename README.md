# postcss-transform-decl

[![npm](https://img.shields.io/npm/v/postcss-transform-decl.svg)](https://www.npmjs.com/package/postcss-transform-decl)

Transform any declarations with custom rules.

## Installation

```shell
npm install --save-dev postcss-transform-decl
```

## Usage

```js
// postcss.config.js
module.exports = {
  'postcss-transform-decl': {
    rules: [
      /* Your rules here ... */
    ],
  },
}
```

For legacy version:

```js
// postcss.config.js
module.exports = {
  'postcss-transform-decl/dist/legacy': {
    rules: [
      /* Your rules here ... */
    ],
  },
}
```

## Rules

You can write rules in either of the following ways:

```js
[
  // Exact match
  { prop: 'overflow', from: 'overlay', to: 'hidden' },

  // Regular match
  { prop: /^overflow-?/, from: 'overlay', to: 'hidden' },

  // Backward/forward compatibility
  { prop: /^overflow-?/, from: 'overlay', to: 'hidden', at: 'before' },
  { prop: /^overflow-?/, from: 'auto', to: 'overlay', at: 'after' },

  // Regular replacement
  { prop: /^overflow-?/, from: /^(.+)lay$/, to: '$1load' },
  { prop: /^overflow-?/, from: /^(.+)lay$/, to: (matches, over) => `${over}load` },

  // Custom functions
  {
    prop: /^overflow-?/,
    transform(decl) {
      if (decl.prop === 'overflow-x') {
        return { from: 'overlay', to: 'auto' }
      } else {
        decl.value = 'hidden'
      }
    },
  },
]
```
