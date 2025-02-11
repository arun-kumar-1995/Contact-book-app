import express from 'express'
import {
  getContacts,
  uploadContacts,
  deleteContact,
  modifyContact,
  createContact,
  deleteMultipleContact,
  getContactDetails,
  exportCsv,
} from '../controllers/contacts.controllers.js'
import { validateUserInput } from '../middlewares/validateUserInput.middleware.js'

const router = express.Router()

router.route('/').get(getContacts)
router.route('/uploads').post(uploadContacts)

router.route('/edit-contact/:id').put(validateUserInput, modifyContact)
router.route('/delete-contact/:id').delete(deleteContact)

router.route('/new-contact').post(validateUserInput, createContact)

router.route('/delete-contacts').post(deleteMultipleContact)

router.route('/contact-details/:id').get(getContactDetails)

router.route('/export-csv').post(exportCsv)
export default router
