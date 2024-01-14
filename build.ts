import * as esbuild from 'esbuild'
import options from "./config.js"

await esbuild.build(options)
