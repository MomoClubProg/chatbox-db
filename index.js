const fs = require('node:fs');

// Definition de DB 
class DB {
  constructor() {
    this.messages = {};
  }
  static DEFAULT =(
    channel,
    time = new Date()
  ) => {

    let time_of_day = time.toTimeString().split(' ')[0];
    let date = time.toDateString();
    return {
      messages:[{
        username:'Marvin',
        message:`\x1b[90mThis chat room \x1b[32m${channel}\x1b[90m was created at ${time_of_day} on ${date}\x1b[0m`,
        userTag:'BOT'
      }]
    }

  }

  /**
  * Load the local server file if it exists
  */ 
  loadIfExists(channel) {
    console.log(channel, this.messages);
    if (
      !fs.existsSync(`./data/${channel}.json`)
    ) {
      // default bot greeting for new channels
      return DB.DEFAULT(channel);
    }

    // read from file
    return JSON.parse(
      fs.readFileSync(`./data/${channel}.json`, 'utf-8')
    );
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
   return [...this.messages[channel]]; 
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

    if (this.messages[channel] === undefined) {
      console.log('DEBUG: ', this.messages);
      return;
    }

    // Add a message
    this.messages[channel].push(msg);
  }

}

module.exports = DB;
