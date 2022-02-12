const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const products = JSON.parse(data);
  return products;
}

async function getContactById(contactId) {
  const listContact = await listContacts();
  const result = listContact.find((item) => item.id === contactId);
  if (!result) {
    throw new Error(`Contact with id=${contactId} not found`);
  }
  return result;
}

async function removeContact(contactId) {
  const listContact = await listContacts();
  const delContact = listContact.find((item) => item.id === contactId);
  if (!delContact) {
    throw new Error(`Contact with id=${contactId} not found`);
  } else {
    const newListContact = listContact.filter((item) => item.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(newListContact));
  }
  return delContact;
}

async function addContact(name, email, phone) {
  const listContact = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  const newOb = [...listContact, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(newOb));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
