let DB = require('./index.js');
// Utilisation de DB

// avoir une liste de tous les objets `msg`
const allMessages = DB.getMessages();
console.log(allMessages)

// Ajouter un message a notre base de donnees
DB.addMessage({ 
  user: 'myName',
  msg: 'this is a sample message'
});
