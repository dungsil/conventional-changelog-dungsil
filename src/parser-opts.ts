import merge from 'deepmerge'
import { parser as defaultConfig } from './defaultConfig'

export default function (userConfig: ConventionalConfigurationSpec): ConventionalParserOptions {
  return merge(defaultConfig, userConfig)
}
