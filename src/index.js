import { setOutput, setFailed } from '@actions/core'
import { context } from '@actions/github'

import { extractVersionFromRef } from './extract.js'

import { fileURLToPath } from 'node:url'

const OUTPUTS = {
  version: 'version',
  versionWithoutV: 'version-without-v',
  major: 'major',
  minor: 'minor',
  patch: 'patch',
  prerelease: 'prerelease',
  build: 'build',
  isPrerelease: 'is-prerelease'
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main()
}

export default main

function main () {
  try {
    const result = extractVersionFromRef(context.ref)

    Object.keys(result).forEach(key => {
      setOutput(OUTPUTS[key], result[key])
    })

    if (Object.prototype.hasOwnProperty.call(result, 'major')) {
      setOutput('is-semver', 'true')
    }
  } catch (error) {
    setFailed(error.message)
  }
}
