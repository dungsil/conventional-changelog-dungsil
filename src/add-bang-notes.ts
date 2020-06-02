import { parser as parserDefaultConfig } from './defaultConfig'

export default function (commit: ConventionalCommit) {
  const match = commit.header.match(parserDefaultConfig.breakingHeaderPattern!!)

  if (match && commit.notes.length === 0) {
    const text = match[3]
    commit.notes.push({ text })
  }
}
