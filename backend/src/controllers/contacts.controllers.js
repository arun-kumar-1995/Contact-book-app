import CatchAsyncError from '../utils/catchAsyncError.utils.js'
import SendApiResponse from '../utils/responseHandler.utils.js'
import Contact from '../models/contact.models.js'
import ErrorHandler from '../utils/errorHandler.utils.js'
import GetContacts from '../services/getContacts.services.js'
import { ContactsUploader } from '../utils/contactsUploader.utils.js'
import { downloadCSV } from '../utils/downloadCsv.utils.js'
import { getCsvFields } from '../utils/getCscFields.utils.js'

const DEFAULT_PAGE = 1
const DEFAULT_PER_PAGE = 10

export const getContacts = CatchAsyncError(async (req, res, next) => {
  let { page = DEFAULT_PAGE, perPage = DEFAULT_PER_PAGE } = req.query

  if (page) page = parseInt(page)
  if (perPage) perPage = parseInt(perPage)

  const contactsQuery = new GetContacts(Contact.find(), req.query)
    .search()
    .sort()
    .paginate()

  const total = await new GetContacts(
    Contact.find(),
    req.query
  ).getContactCount()

  const records = {
    docs: [],
    total,
    page,
    perPage,
    pages: Math.ceil(total / perPage),
  }

  records.docs = await contactsQuery.query

  return SendApiResponse(res, 200, 'Here is your contact list', {
    contacts: records,
  })
})

export const uploadContacts = CatchAsyncError(async (req, res, next) => {
  if (!req.file) return ErrorHandler(res, 400, 'No file choosen')
  const contacts = await ContactsUploader(req.file)
  await Contact.insertMany(contacts)
  SendApiResponse(res, 200, 'Contacts uploaded')
})

export const createContact = CatchAsyncError(
  async (req, res, next, session) => {
    const { name, email, phone, gender } = req.body

    const contact = await Contact.create(
      [{ name, email, phone, gender }],
      session ? { session } : {}
    )
    if (!contact || contact.length === 0) {
      return ErrorHandler(res, 500, 'Error creating contact')
    }
    SendApiResponse(res, 201, 'Contact created successfully')
  },
  true
)

export const deleteContact = CatchAsyncError(
  async (req, res, next, session) => {
    const { id } = req.params
    if (!id) return ErrorHandler(res, 400, 'Missing id parameter')

    const contact = await Contact.findById(id).session(session)
    if (!contact) return next(ErrorHandler(res, 404, 'Contact not found.'))

    await Contact.deleteOne({ _id: id }, { session })

    SendApiResponse(res, 200, 'Contact deleted successfully')
  },
  true
)

export const modifyContact = CatchAsyncError(
  async (req, res, next, session) => {
    const { id } = req.params
    const { name, email, phone } = req.body
    console.log(id, req.body)

    if (!id) return ErrorHandler(res, 404, 'Missing id parameter.')
    const contact = await Contact.findByIdAndUpdate(
      id,
      { $set: { name, email, phone } },
      { new: true, runValidators: true, session }
    )

    if (!contact) return ErrorHandler(res, 404, 'Contact not found.')
    SendApiResponse(res, 200, 'Contact updated successfully.')
  },
  true
)

export const deleteMultipleContact = CatchAsyncError(async (req, res, next) => {
  const { contactIds } = req.body

  if (!Array.isArray(contactIds)) {
    return ErrorHandler(res, 400, 'Contact IDs must be an array')
  }

  if (!contactIds || contactIds.length === 0) {
    return ErrorHandler(res, 400, 'Invalid contact IDs.')
  }
  await Contact.deleteMany({ _id: { $in: contactIds } })

  SendApiResponse(res, 200, 'Contacts deleted successfully.')
})

export const getContactDetails = CatchAsyncError(async (req, res, next) => {
  const { id } = req.params
  if (!id) return ErrorHandler(res, 400, 'Missing contact ID')

  const contact = await Contact.findById(id)
  if (!contact) return ErrorHandler(res, 404, 'Contact details not found.')

  SendApiResponse(res, 200, 'Here are the contact details', {
    details: contact,
  })
})

export const exportCsv = CatchAsyncError(async (req, res, next) => {
  const { contactIds } = req.body

  if (!contactIds || !Array.isArray(contactIds) || contactIds.length === 0) {
    return ErrorHandler(res, 400, 'Invalid contact IDs')
  }

  const contacts = await Contact.find({ _id: { $in: contactIds } }).lean()

  if (contacts.length === 0) {
    return ErrorHandler(res, 404, 'No contacts found')
  }

  const csvFields = getCsvFields(res, Contact.schema)
  await downloadCSV(res, contacts, csvFields)
})
