const fs = require('node:fs');

// Definition de DB 
class DB {
  constructor() {
    this.messages = {};
  }

  /**
  * Default Channel Template
  */ 
  static DEFAULT =(
    channel,
    time = new Date()
  ) => {

    // Get time
    let time_of_day = time.toTimeString().split(' ')[0];
    let date = time.toDateString();
    return {
      messages:[{
        username:'Marvin',
        message:
          `\x1b[90mThis chat room \x1b[32m${channel}\x1b[90m `+
          `was created at ${time_of_day} on ${date}\x1b[0m`,
        userTag:'BOT'
      }]
    }

  }


  static int32ToBuffer(buffer) {

      if (
        buffer instanceof Buffer ||
        typeof buffer == "string"
      ) return buffer;
      

      let byte_size = buffer[buffer.length-1]
      let ans = new Uint8Array(byte_size * buffer.length + 1);

      // Set the last byte as int byte size indicator
      ans[ans.length-1] = 0xff - byte_size;
  
      // Set the Uint8Array buffer
      for (let i = 0; i < buffer.length-1; i++) {

        for (let j = 0; j < byte_size; j++) {
          // Calculate byte size shift
          let shift = -8 * j + ((byte_size - 1) * 8);

          // Mask only 1 byte N times, MSB first
          // Set the value in buffer
          ans[i+j] = (buffer[i]&(0xff << shift) << shift);
        }
      }

      return Buffer.from(ans);
  }

  /**
  * Load the local server file if it exists
  */ 
  loadIfExists(channel) {
    // If channel's message history does exist in Heap,
    // return it.
    if (this.messages[channel] !== undefined) return {
      messages: this.messages[channel]
    };

    // If no message history for a channel is found, 
    // return a channel template.
    if (
      !fs.existsSync(`./data/${channel}.json`)
    ) {
      // default bot greeting for new channels
      return DB.DEFAULT(channel);
    }

    // Read from a channel file
    let data = JSON.parse(
      fs.readFileSync(`./data/${channel}.json`, 'utf-8')
    );

    // Convert to Uint8Arrays to buffers, ignore strings
    data.messages = data.messages.map(x => {
      if (typeof x.message == 'string') return x;
      x.message = Buffer.from(x.message.data);
      return x;
    });

    // read from file
    return data; 
  }

  /**
  * Load the local server file
  */ 
  load(channel) { 
    const data = this.loadIfExists(channel).messages;   
    data.map(msg => {
      msg.message = DB.int32ToBuffer(msg.message);
      return msg;
    })
    
    this.messages[channel] = data;
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
    fs.writeFileSync(
      `./data/${channel}.json`,
      JSON.stringify({ messages:this.messages[channel]  }),
      'utf-8'
    );
  }

  /**
   * add a message to DB
   * @param {Message} msg - the message to add to the DB 
   */
  addMessage(channel, msg) {
    
    if (this.messages[channel] === undefined) {
      console.log('Message was sent to an channel which is not in heap ');
      return;
    }
    
    // Add a message
    this.messages[channel].push(msg);
  }

}

module.exports = DB;
