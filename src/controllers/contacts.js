import { getAllContacts, getContactById } from '../services/contacts.js';

export const getContactsController = async (req, res, next) => {
  try {
    const contacts = await getAllContacts();

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (err) {
    next(err);
  }
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
    next(new Error('Student not found'));
    return;
  }

  // Відповідь, якщо контакт знайдено
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};
