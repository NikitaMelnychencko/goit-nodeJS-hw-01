const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const contacts = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const listContact = await contacts.listContacts();
      console.log(listContact);
      break;
    case "add":
      const addContact = await contacts.addContact(name, email, phone);
      console.log(addContact);
      break;
    case "get":
      const getContactById = await contacts.getContactById(id);
      console.log(getContactById);
      break;

    case "remove":
      const removeContactById = await contacts.removeContact(id);
      if (!removeContactById) {
        throw new Error(`Contact with id=${id} not found`);
      }
      console.log(removeContactById);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
