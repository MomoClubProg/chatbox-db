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
  static int32ToBuffer(messageBuf) {

      if (messageBuf instanceof Buffer || typeof messageBuf == "string") {
        return messageBuf;
      }

      let byte_size = messageBuf.data[messageBuf.data.length-1]
      console.log('messageBuf', messageBuf)
      let ans = new Uint8Array(byte_size * messageBuf.data.length + 1);
      ans[ans.length-1] = 0xff - byte_size;
  

      for (let i = 0; i < messageBuf.data.length-1; i++) {
        ans[i  ] = (messageBuf.data[i]&0xff000000)>> 24;
        ans[i+1] = (messageBuf.data[i]&0x00ff0000)>>16;
        ans[i+2] = (messageBuf.data[i]&0x0000ff00)>> 8;
        ans[i+3] = (messageBuf.data[i]&0x000000ff)>> 0; 

        for (let j = 0; j < byte_size; j++) {
          let shift = -8 * j + ((byte_size - 1) * 8);
          ans[i+j] = (messageBuf.data[i]&(0xff << shift) << shift);
        }
      }

      

      return Buffer.from(ans);
  }

  static toInt32Array(buffer) {
    if (typeof buffer === 'string') {
      return buffer;
    };
    
    let data = [];
    let byte_size = 0xff - buffer[buffer.length-1];

    if (byte_size > 4) return;

    for (let i = 0; i < buffer.length-1; i += byte_size) {
      let val = 0x00000000;
      for (let j = 0; j < byte_size; j++) {
        val |= buffer[i+j] << (-(8) * j + ((byte_size-1) * 8));
      }
      data.push(val);
    }
    return {data, byte_size};
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


    if (this.messages[channel] !== undefined) return {
      messages: this.messages[channel]
    };


    let data = JSON.parse(
      fs.readFileSync(`./data/${channel}.json`, 'utf-8')
    );
    console.log(data)

    data.messages = data.messages.map(x => {
      console.log(x);
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
    console.log('DB DATA', data)
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
      console.log('DEBUG: ', this.messages);
      return;
    }
    
    // Add a message
    this.messages[channel].push(msg);
  }

}

module.exports = DB;
