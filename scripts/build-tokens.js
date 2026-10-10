import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const tokens = JSON.parse(readFileSync(resolve(root, 'tokens/token.json'), 'utf-8'))

function camelToKebab(str) {
  return str.replace(/([A-Z])/g, (m) => `-${m.toLowerCase()}`)
}

function resolveValue(value) {
  if (typeof value !== 'string' || !value.startsWith('{')) return value
  const path = value.slice(1, -1).split('.')
  let node = tokens
  for (const key of path) {
    node = node[key]
    if (node === undefined) return value
  }
  return resolveValue(node.$value)
}

const vars = []

for (const [name, token] of Object.entries(tokens.semantic.light.color)) {
  vars.push(`  --color-${camelToKebab(name)}: ${resolveValue(token.$value)};`)
}

for (const [name, token] of Object.entries(tokens.semantic.space)) {
  vars.push(`  --space-${name}: ${resolveValue(token.$value)};`)
}

for (const [name, token] of Object.entries(tokens.primitive.font.family)) {
  vars.push(`  --font-family-${name}: ${token.$value};`)
}

for (const [name, token] of Object.entries(tokens.primitive.font.size)) {
  vars.push(`  --font-size-${name}: ${token.$value};`)
}

for (const [name, token] of Object.entries(tokens.primitive.font.weight)) {
  vars.push(`  --font-weight-${name}: ${token.$value};`)
}

for (const [name, token] of Object.entries(tokens.primitive.font.lineHeight)) {
  vars.push(`  --font-line-height-${camelToKebab(name)}: ${token.$value};`)
}

const css = `:root {\n${vars.join('\n')}\n}\n`
writeFileSync(resolve(root, 'src/styles/tokens.css'), css)
console.log(`✓ src/styles/tokens.css generated (${vars.length} variables)`)
