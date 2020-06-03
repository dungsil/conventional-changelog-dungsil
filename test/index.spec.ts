// @ts-ignore
import cc from 'conventional-changelog-core'
import through from 'through2'
import log from 'consola'
log.level = 4

import { preParing } from './fixtures/git-dummy-commit'
import makePreset from '../src'

import './fixtures/git-dummy-commit'

it('테스트', (done: Function) => {
  preParing(1)

  log.info("-- 프리셋 추가 --")
  const config = makePreset()

  cc({ config })
    .on('error', function (err: Error) {
      done(err)
    })
    .pipe(through((chunk: Buffer) => {
      log.debug(chunk.toString())
      done()
    }))
})
