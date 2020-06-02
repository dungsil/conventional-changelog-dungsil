import parserOpts from './parser-opts'
import addBangNotes from './add-bang-notes'

export default function (config: ConventionalConfigurationSpec): ConventionalRecommendedBumpOptions {
  return {
    parserOpts: parserOpts(config),
    whatBump: (commits: ConventionalCommit[]) => {
      let level = 2
      let breakings = 0
      let features = 0

      commits.forEach((commit)=> {
        addBangNotes(commit)

        if (commit.notes.length > 0) {
          breakings += commit.notes.length
          level = 0
        } else if (commit.type === 'feat') {
          features += 1

          if (level === 2) {
            level = 1
          }
        }
      })

      if (config.preMajor && level < 2) {
        level++
      }

      return {
        level,
        reason: `${features}개의 신규기 능과 ${breakings}개의 호환되지 않는 변경 사항이 존재합니다.`
      }
    }
  }
}
