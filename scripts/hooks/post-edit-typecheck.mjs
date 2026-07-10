// Claude Code PostToolUse hook (wired in .claude/settings.json): after every
// Edit/Write to a TypeScript file, run the project typecheck and feed any
// errors straight back to the model. Exit code 2 is the hook protocol's
// "blocking error" — stderr is shown to Claude so it fixes the type error in
// the same turn instead of discovering it at build time (or never).
//
// `tsc -b` is incremental (.tsbuildinfo), so after the first run this stays
// fast enough to run on every edit.
import { spawnSync } from 'node:child_process'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..', '..')

let input = ''
try {
  input = (await import('node:fs')).readFileSync(0, 'utf8')
} catch {
  process.exit(0)
}

let filePath = ''
try {
  filePath = JSON.parse(input)?.tool_input?.file_path ?? ''
} catch {
  process.exit(0)
}

if (!/\.(ts|tsx)$/.test(filePath)) process.exit(0)

const result = spawnSync('npx', ['tsc', '-b'], {
  cwd: ROOT,
  shell: true, // npx is npx.cmd on Windows
  encoding: 'utf8',
  timeout: 120_000,
})

if (result.status !== 0) {
  console.error(`tsc -b failed after editing ${filePath}:\n`)
  console.error(result.stdout || '')
  console.error(result.stderr || '')
  console.error('Fix these type errors before continuing.')
  process.exit(2)
}
process.exit(0)
