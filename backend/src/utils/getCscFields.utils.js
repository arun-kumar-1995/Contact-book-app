import ErrorHandler from './errorHandler.utils.js'

export const getCsvFields = (res, schema) => {
  if (!schema) return ErrorHandler(res, 400, 'No schema provided')
  return Object.keys(schema.paths)
}
