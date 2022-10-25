let DB = require('./index.js');
// Utilisation de DB

// avoir une liste de tous les objets `msg`
const allMessages = DB.getMessages('channelABC');
console.log(allMessages)

// Ajouter un message a notre base de donnees
DB.addMessage('channelABC', { 
  user: 'myName',
  msg: 'this is a sample message'
});

// Ajouter un message a notre base de donnees
DB.addMessage('1234567', { 
  user: 'vlev',
  msg: 'this is a sample message, new channel'
});
