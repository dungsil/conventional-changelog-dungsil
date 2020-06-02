
type ConventionalOpts<T> = (config: ConventionalConfigurationSpec) => T

type ConventionalType = {
  type: string,
  section: string,
  hidden?: boolean
}

type ConventionalNote = {
  title?: string
  text: string
}

type ConventionalReference = {
  prefix: string,
  issue: string
}

type ConventionalCommit = {
  type: string,
  header: string,
  subject: string
  notes: ConventionalNote[],
  references: ConventionalReference[],
  revert: boolean,
  hash: string,
  shortHash: string
}

type ConventionalContext = {
  [name: string]: string,
  host: string,
  repository: string,
  owner: string,
  id?: string,
  prefix?: string,
  user?: string
}

interface ConventionalConfigurationSpec {
  types?: ConventionalType[],
  preMajor?: boolean,
  commitUrlFormat?: string,
  compareUrlFormat?: string,
  issueUrlFormat?: string,
  userUrlFormat?: string,
  releaseCommitMessageFormat?: string,
  issuePrefixes?: string[]
}

interface ConventionalParserOptions extends ConventionalConfigurationSpec {
  headerPattern?: RegExp,
  breakingHeaderPattern?: RegExp,
  headerCorrespondence?: string[],
  noteKeywords?: string[],
  revertPattern?: RegExp,
  revertCorrespondence?: string[],
}

interface ConventionalWriterOptions {
  transform: (commit: ConventionalCommit, context: ConventionalContext) => ConventionalCommit | undefined,
  groupBy: string,
  commitGroupSort: (prev: Record<string, string>, next: Record<string, string>) => number,
  commitsSort: string[]
  noteGroupsSort: string,
  notesSort: Function,
  mainTemplate: string,
  headerPartial: string,
  commitPartial: string,
  footerPartial: string
}

interface ConventionalChangelogConfig {
  parserOpts: ConventionalOpts<ConventionalParserOptions>,
  writerOpts: ConventionalOpts<ConventionalWriterOptions>
}

interface ConventionalRecommendedBumpOptions {
  parserOpts: ConventionalConfigurationSpec,
  whatBump: (commits: ConventionalCommit[]) => { level: number, reason: string }
}

interface ConventionalCommitsConfig {
  conventionalChangelog: ConventionalChangelogConfig,
  parserOpts: ConventionalConfigurationSpec,
  recommendedBumpOpts: ConventionalRecommendedBumpOptions,
  writerOpts: ConventionalWriterOptions
}

