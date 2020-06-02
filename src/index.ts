import conventionalChangelog, { parserOpts, writerOpts } from './conventional-changelog'
import recommendedBumpOpts from './recommended-bump-opts'

/**
 *
 * @param param
 */
export default function (param?: Function | ConventionalConfigurationSpec): ConventionalCommitsConfig {
  let config: ConventionalConfigurationSpec

  if (param instanceof Function) {
    config = param()
  } else {
    config = param || {}
  }

  return {
    conventionalChangelog,
    recommendedBumpOpts: recommendedBumpOpts(config),
    parserOpts: parserOpts(config),
    writerOpts: writerOpts(config)
  }
}
