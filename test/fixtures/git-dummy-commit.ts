// @ts-ignore
import commit from 'git-dummy-commit'

// @ts-ignore
import shell from 'shelljs'

// @ts-ignore
import BetterThanBefore from 'better-than-before'
const btb = new BetterThanBefore()

export const preParing = btb.preparing

btb.setups([
  function () {
    // 테스트용 git db 생성
    shell.config.resetForTesting()
    shell.cd(__dirname)
    shell.rm('-rf', 'tmp')
    shell.mkdir('tmp')
    shell.cd('tmp')
    shell.mkdir('git-templates')
    shell.exec('git init --template=./git-templates')

    commit(['chore: initial commit'])
    commit(['feat(api): 신규 API 추가'])
    commit(['feat(api): API 변경', 'BREAKING CHANGE: API 변경'])
  }
])
