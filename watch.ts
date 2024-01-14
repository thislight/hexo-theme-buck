import * as esbuild from 'esbuild'
import options from './config.js'

const ctx = await esbuild.context(options)
await ctx.watch()
