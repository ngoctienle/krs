import { Fields } from './fields'
import { QueryBuilderOptions } from './query-builder-options'

export type NestedField = {
  operation: string
  variables: QueryBuilderOptions[]
  fields: Fields
}
