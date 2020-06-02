import merge from 'deepmerge'
import compare from 'compare-func'
import { resolve } from 'path'
import { readFileSync } from 'fs'

import defaultConfig from './defaultConfig'
import addBangNotes from './add-bang-notes'

const defaultContext: ConventionalContext = {
  host: '{{~@root.host}}',
  repository: '{{#if this.repository}}{{~this.repository}}{{else}}{{~@root.repository}}{{/if}}',
  owner: '{{#if this.owner}}{{~this.owner}}{{else}}{{~@root.owner}}{{/if}}',
  id: '{{this.issue}}',
  prefix: '{{this.prefix}}'
}

function expandTemplate (template: string, context: ConventionalContext = defaultContext) {
  let expanded = template
  Object.keys(context).forEach((key: string) => {
    expanded = expanded.replace(new RegExp(`{{${key}}}`, 'g'), context[key])
  })

  return expanded
}


export default function (userConfig: ConventionalConfigurationSpec): ConventionalWriterOptions {
  const config = merge(defaultConfig, userConfig)

  const commitUrlFormat = expandTemplate(config.commitUrlFormat)
  const compareUrlFormat = expandTemplate(config.compareUrlFormat)
  const issueUrlFormat = expandTemplate(config.issueUrlFormat)

  const mainTemplate = readFileSync(resolve(__dirname, '../templates/mainTemplate.hbs')).toString()
  const headerPartial = readFileSync(resolve(__dirname, '../templates/headerPartial.hbs'))
    .toString()
    .replace(/{{compareUrlFormat}}/g, compareUrlFormat)

  const commitPartial = readFileSync(resolve(__dirname, '../templates/commitPartial.hbs'))
    .toString()
    .replace(/{{commitUrlFormat}}/g, commitUrlFormat)
    .replace(/{{issueUrlFormat}}/g, issueUrlFormat)

  const footerPartial = readFileSync(resolve(__dirname, '../templates/footerPartial.hbs')).toString()

  return {
    groupBy: 'type',
    noteGroupsSort: 'title',
    commitsSort: ['scope', 'subject'],
    notesSort: compare,
    commitGroupSort: (prev, next) => {
      const sections = config.types!!.map((type) => type.section).reverse()
      const rankPrev = sections.indexOf(prev.title)
      const rankNext = sections.indexOf(next.title)

      return rankPrev >= rankNext ? -1 : 1
    },
    transform: (commit: ConventionalCommit, context: ConventionalContext) => {
      let discard = true

      // BREAKING NOTES
      addBangNotes(commit)
      commit.notes.forEach((note) => {
        note.title = 'BREAKING CHANGES'
        discard = false
      })

      const typeName = (commit.revert ? 'revert' : (commit.type || '')).toLowerCase()
      const type = config.types?.filter((t) => t.type === typeName)[0]

      // 설정에 알맞지 않는 커밋은 무시함
      if ((discard && type == undefined) || type.hidden) {
        return
      }

      // 최초 커밋 무시
      if (['init commit', 'initial commit', '최초 커밋', '첫 커밋'].includes(commit.subject)) {
        return
      }

      // CHANGELOG 헤더 설정
      commit.type = type.section

      // short hash 생성
      commit.shortHash = commit.hash.substring(0, 7)

      // 이슈 URL
      const issues: string[] = []
      const regexIssue = new RegExp(`(${config.issuePrefixes!!.join('|')})([0-9]+)`, 'g')
      commit.subject = commit.subject.replace(regexIssue, (_, prefix, issue) => {
        issues.push(prefix + issue)
        const url = expandTemplate(config.issueUrlFormat, {
          host: context.host,
          owner: context.owner,
          repository: context.repository,
          id: issue,
          prefix: prefix
        })

        return `[${prefix}${issue}](${url})`
      })

      // 사용자 URL
      commit.subject = commit.subject.replace(/\B@([a-z0-9](?:-?[a-z0-9/]){0,38})/g, (_, user) => {
        const usernameUrl = expandTemplate(config.userUrlFormat, {
          host: context.host,
          owner: context.owner,
          repository: context.repository,
          user: user
        })

        return `[@${user}](${usernameUrl})`
      })

      // 이미 존재하는 레퍼런스 제거
      commit.references = commit.references.filter(reference => {
        return issues.indexOf(reference.prefix + reference.issue) === -1
      })

      return commit
    },
    mainTemplate,
    headerPartial,
    commitPartial,
    footerPartial
  }
}
