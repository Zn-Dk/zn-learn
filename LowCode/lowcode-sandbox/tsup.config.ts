import { defineConfig } from 'tsup'

export default defineConfig([
  // esm 格式
  {
    entry: ['src/index.ts'],
    outDir: 'dist/esm',
    format: ['esm'],
    sourcemap: true,
    bundle: true,
    dts: true,
    clean: true,
    minify: true,
    env: {
      DEBUG_MODE: 'true',
    }
  },
  // cjs 格式
  {
    entry: ['src/index.ts'],
    outDir: 'dist/cjs',
    format: ['cjs'],
    sourcemap: true,
    bundle: true,
    dts: true,
    clean: true,
    minify: true,
    env: {
      DEBUG_MODE: 'true',
    }
  }
])