import { parseAsync } from 'json2csv'
import ErrorHandler from './errorHandler.utils.js'
import SendApiResponse from './responseHandler.utils.js'

export const downloadCSV = async (res, file, fields) => {
  try {
    res.setHeader('Content-Type', 'text/csv')
    res.setHeader('Content-Disposition', 'attachment; filename=data.csv')
    const csvData = await parseAsync(file, { fields })
    SendApiResponse(res, 200, 'Here are the csv data ', {
      data: csvData,
    })
  } catch (err) {
    console.log(err)
    return ErrorHandler(res, 500, 'Failed to generate CSV')
  }
}
