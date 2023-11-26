import { VariableOptions } from './variable-options'
import { Fields } from './fields'

export interface QueryBuilderOptions {
  operation?: string
  fields?: Fields
  variables?: VariableOptions
}
