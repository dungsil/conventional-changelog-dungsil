
const config: ConventionalConfigurationSpec = {
  // changelog
  types: [
    { type: 'feat', section: '✨ 신규 기능' },
    { type: 'fix', section: '🐛 버그 수정' },
    { type: 'refactor', section: '♻️기능 개선' },
    { type: 'perf', section: '⚡️ 성능 개선' },
    { type: 'docs', section: '📝 문서' },
    { type: 'style', section: '💄 코드 스타일' },
    { type: 'test', section: '✅ 테스트' },
    { type: 'build', section: '🏗 빌드 시스템' },
    { type: 'ci', section: '👷 CI' },
    { type: 'chore', section: '🚩 기타' },
    { type: 'revert', section: '⏪ 변경 사항 되돌림' }
  ],
  preMajor: false,

  // URL Format
  commitUrlFormat: '{{host}}/{{owner}}/{{repository}}/commit/{{hash}}',
  issueUrlFormat: '{{host}}/{{owner}}/{{repository}}/issues/{{id}}',
  compareUrlFormat: '{{host}}/{{owner}}/{{repository}}/compare/{{previousTag}}...{{currentTag}}',
  userUrlFormat: '{{host}}/{{user}}',
  issuePrefixes: ['#'],

  // release
  releaseCommitMessageFormat: 'chore(release): v{{currentTag}}'
}

const parser: ConventionalParserOptions = {
  ...config,
  // header
  headerPattern: /^(\w*)(?:\((.*)\))?!?: (.*)$/,
  breakingHeaderPattern: /^(\w*)(?:\((.*)\))?!: (.*)$/,
  headerCorrespondence: [
    'type',
    'scope',
    'subject'
  ],
  // body
  noteKeywords: ['BREAKING CHANGE'],

  // revert
  revertPattern: /^(?:Revert|revert:)\s"?([\s\S]+?)"?\s*This reverts commit (\w*)\./i,
  revertCorrespondence: ['header', 'hash'],
}

export default config
export {
  parser
}
