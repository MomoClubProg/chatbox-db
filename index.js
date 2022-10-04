const fs = require('node:fs');


// Definition de DB 
class DB {
 
  // ... Retourner tous les messages storees
  static getMessages() {

    let words = JSON.parse(fs.readFileSync('./messages.json','utf-8'));
    return words;
  }


  // ... prend un objet `msg` et l'ajoute a `./messages.json`
  static addMessage(msg) {

    let msgs = DB.getMessages();
    msgs.push(msg);
    let str_msgs = JSON.stringify(msgs);
    fs.writeFileSync('./messages.json',str_msgs);
  }

}

// Utilisation de DB

// avoir une liste de tous les objets `msg`
const allMessages = DB.getMessages();
console.log(allMessages)

// Ajouter un message a notre base de donnees
DB.addMessage({ 
  user: 'myName',
  msg: 'this is a sample message'
});



