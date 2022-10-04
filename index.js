const { existsSync, writeFileSync } = require('node:fs');
const fs = require('node:fs');
const { builtinModules } = require('node:module');


// Definition de DB 
class DB {
 
  
  /**
   * get all messages in DB
   * @returns obj message list
   */
  static getMessages() {
    if(fs.existsSync('./messages.json')){
      let words = JSON.parse(fs.readFileSync('./messages.json','utf-8'));
      return words;
    }
    else{
      fs.writeFileSync('./messages.json','[]');
      return [];
    }
  }

  /**
   * add a message to DB
   * @param {Message} msg - the message to add to the DB 
   */
  static addMessage(msg) {

    let msgs = DB.getMessages();
    msgs.push(msg);
    let str_msgs = JSON.stringify(msgs);
    fs.writeFileSync('./messages.json',str_msgs);
  }

}

module.exports = DB;


