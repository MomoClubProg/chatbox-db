const fs = require('node:fs');

// Definition de DB 
class DB {

  /**
  * Load the local server file if it exists
  */ 
  loadIfExists(channel) {
    if (!fs.existsSync(`./data/${channel}.json`)) {
      let d = new Date();
      return {
        messages:[{
          username:'Marvin',
          message:`\x1b[90mThis chat room \x1b[32m${channel}\x1b[90m was created at ${d.toTimeString().split(' ')[0]} on ${d.toDateString()}\x1b[0m`,
          userTag:'BOT'
        }]
      }; 
    }
    return JSON.parse(fs.readFileSync(`./data/${channel}.json`, 'utf-8'));
  }

  /**
  * Load the local server file
  */ 
  load(channel) {
    const data = this.loadIfExists(channel);   
    this.messages[channel] = data.messages;
  } 
  
  /**
   * get all messages in DB
   * @returns obj message list
   */
  getMessages(channel) {
   return this.messages[channel]; 
  }
  
  /**
  * Save to a local server file
  */ 
  save(channel) {
    fs.writeFileSync(`./data/${channel}.json`, JSON.stringify({
      messages: this.messages[channel]
    }), 'utf-8');
  }

  /**
   * add a message to DB
   * @param {Message} msg - the message to add to the DB 
   */
  addMessage(channel, msg) {   
    // Add a message
    this.messages[channel].push(msg);

    let str_msgs = JSON.stringify(msgs);
  }

}

module.exports = DB;


