const fs = require('node:fs');


// Definition de DB 
class DB {
 
  // ... Retourner tous les messages storees
  static getMessages() {
    //  ... votre code ... 
  }


  // ... prend un objet `msg` et l'ajoute a `./messages.json`
  static addMessage(msg) {
    // ... votre code ... 
  }

}

// Utilisation de DB

// avoir une liste de tous les objets `msg`
const allMessages = DB.getMessages();

// Ajouter un message a notre base de donnees
DB.addMessage({ 
  user: 'myName',
  msg: 'this is a sample message'
});



