import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/index.ts', 'src/legacy.ts'],
  format: 'cjs',
  fixedExtension: false,
})
