import createHttpError from 'http-errors';

import {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
} from '../services/contacts.js';

export const getContactsController = async (req, res) => {
  const contacts = await getAllContacts();

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  // Відповідь, якщо контакт не знайдено
  //   if (!contact) {
  //     res.status(404).json({
  //       message: 'Contact not found',
  //     });
  //     return;
  //   }
  // А тепер додаємо базову обробку помилки замість res.status(404)
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
    // next(new Error('Contact not found'));
    // return;
  }

  // Відповідь, якщо контакт знайдено
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const contact = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const contact = await deleteContact(req.params.contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
    // next(new Error('Contact not found'));
    // return;
  }

  res.status(204).send();
};

export const patchContactController = async (req, res, next) => {
  const result = await updateContact(req.params.contactId, req.body);

  if (!result) {
    throw createHttpError(404, 'Contact not found');
    // next(new Error('Contact not found'));
    // return;
  }

  res.status(200).json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result,
    // data: result.contact,
  });
};
