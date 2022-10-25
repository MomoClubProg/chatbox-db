const fs = require('node:fs');

// Definition de DB 
class DB {
 
  
  /**
   * get all messages in DB
   * @returns obj message list
   */
  static getMessages(channel) {
    if(!fs.existsSync('./data')){
      fs.mkdirSync('./data');
    }

    if(fs.existsSync('./data/' + channel + '.json')){
      let words = JSON.parse(fs.readFileSync('./data/' + channel + '.json','utf-8'));
      return words;
    }
    else{
      
      fs.writeFileSync('./data/' + channel + '.json','[]');
      return [];
    }
  }

  /**
   * add a message to DB
   * @param {Message} msg - the message to add to the DB 
   */
  static addMessage(channel, msg) {

    let msgs = DB.getMessages(channel);
    msgs.push(msg);
    let str_msgs = JSON.stringify(msgs);
    fs.writeFileSync('./data/' + channel + '.json',str_msgs);
  }

}

module.exports = DB;


