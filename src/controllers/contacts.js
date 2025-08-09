import createHttpError from 'http-errors';

import {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const userId = req.user._id;
  
  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  // const contact = await getContactById(contactId);  // для варіанта з if
  const contact = await getContactById(contactId, req.user._id);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  //   if (contact.userId.toString() !== req.user._id.toString()) {
  //   // throw createHttpError(404, 'Contact not found');  //це кращий варіант для продакшена
  //   throw createHttpError(403, 'Contact restricted');
  // }

  // Відповідь, якщо контакт знайдено
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const photo = req.file;

  let photoUrl;

  if (photo) {
    photoUrl = await saveFileToUploadDir(photo);
  }

  const contact = await createContact({...req.body, photo: photoUrl, userId: req.user._id});

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const contact = await deleteContact(req.params.contactId, req.user._id);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
};

export const patchContactController = async (req, res, next) => {
const photo = req.file;

  let photoUrl;

  if (photo) {
    photoUrl = await saveFileToUploadDir(photo);
  }
  
  const result = await updateContact(req.params.contactId, {
    ...req.body,
    photo: photoUrl, }, 
  req.user._id);

  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }

	/* в photo лежить обʼєкт файлу
		{
		  fieldname: 'photo',
		  originalname: 'download.jpeg',
		  encoding: '7bit',
		  mimetype: 'image/jpeg',
		  destination: '/Users/borysmeshkov/Projects/goit-study/students-app/temp',
		  filename: '1710709919677_download.jpeg',
		  path: '/Users/borysmeshkov/Projects/goit-study/students-app/temp/1710709919677_download.jpeg',
		  size: 7
	  }
	*/

  res.status(200).json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result,
  });
};
