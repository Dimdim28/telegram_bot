'use strict';

//const { messageTypes } = require('node-telegram-bot-api/src/telegram');
const { Telegraf, Context } = require('telegraf');
const fs = require('fs');
const { userInfo } = require('os');

const GIF_PATH = 'gif.txt';
const STICK_PATH = 'sticker.txt';
const MESS_PATH = 'messagearray.txt';
const VOICE_PATH = 'voice.txt';
const HELLO_GIF_PATH = 'gif/hello.txt';
const HELLO_STICK_PATH = 'stick/hello.txt';
const HELLO_MESS_PATH = 'mess/hello.txt';
const CHAT_MEMBERS_PATH = 'chatmembers.txt';

const add = (data, file) => {
  fs.appendFileSync(file, `${data}`, () => {});
  fs.appendFileSync(file, "\n", () => {});
};

const contentUTF8 = (file) => fs.readFileSync(file, 'utf8');
const CONTENT = {
  gifContent: contentUTF8(GIF_PATH),
  stickContent: contentUTF8(STICK_PATH),
  messContent: contentUTF8(MESS_PATH),
  gifHelloContent: contentUTF8(HELLO_GIF_PATH),
  stickHelloContent: contentUTF8(HELLO_STICK_PATH),
  voiceContent: contentUTF8(VOICE_PATH),
  messHelloContent: contentUTF8(HELLO_MESS_PATH),
  chatMembersContent: contentUTF8(CHAT_MEMBERS_PATH),
};

const AddToArray = (data) =>{
  const res = data.split('\n');
  res.pop();
  return res;
};

const randomMessageFromArray = (array) => {
  const index = Math.floor(Math.random() * array.length);
  const message = array[index];
  return message;
};

const token = '5041846136:AAFjwTdTJI9vwbYiLLvWDe4OupltRqesXrc';
const bot = new Telegraf(token);

/*bot.on("sticker", (ctx) => {
  const idStick = ctx.update.message.sticker.file_id;
    add(idStick, HelloStickPath);
    ctx.reply("Succesfully aded to file");
});
bot.on("animation", (ctx) => {
  const idGif = ctx.update.message.animation.file_id;
  add(idGif, HelloGifPath);
  ctx.reply("Succesfully aded to file");
});*/

/*bot.on('voice', (ctx) => {
  const idVoice = ctx.update.message.voice.file_id;
  add(idVoice,VOICE_PATH);
  ctx.reply('added to file');
});*/

const commands = {
  ban: 'Зачем банить?',
  leave: 'Я не уйду, пока мне мой Master  не прикажет!',
  exit: 'И не надейся)))',
  stop: 'Поезд не остановить!!!',
  help: 'Мне бы кто помог...',
  trueLeave: 'GoOut',
};
const commandKeys = Object.keys(commands);

for (const key of commandKeys) {
  if (key === 'help') {
    bot.help((ctx) => ctx.reply(commands[key]));
  } else if (key === 'trueLeave') {
    bot.command(commands[key], (ctx) => ctx.telegram.leaveChat(ctx.message.chat.id));
  } else {
    bot.command(key, (ctx) => ctx.reply(commands[key]));
  }
}

bot.on('message', async (ctx) => {
  console.log(ctx);
  /*const user = ctx.update.message.from;
  if(!!user){
    const USERSOBJ = AddToArray(CONTENT.chatMembersContent);
    console.log(USERSOBJ);
    for(const i in USERSOBJ){
      console.log(USERSOBJ[i]);
     // if(!USERSOBJ[i].includes(user.id)){
       add(user.id + ' ' + user.first_name + ' ' + user.last_name + ' ' + ' ' + user.username,CHAT_MEMBERS_PATH);
      // }
    }
  }*/
  //collections
  const msg = ctx.message;
  const replies = {
    бан: 'Не выйдет!!!',
    ban: 'Не сможешь)!',
    kik: 'Комманда не найдена, просьба пойти на три буквы',
    кик: 'Себя кикни, олень!',
  };
  const replyKeys = Object.keys(replies);

  const replyTypes = {
    mess(mes){
      ctx.reply(mes);
    },
    stick(mes){
      ctx.replyWithSticker(mes);
    },
    gif(mes){
      ctx.replyWithAnimation(mes);
    },
    voice(mes){
      ctx.replyWithVoice(mes);
    }
  };
  const types = Object.keys(replyTypes);

  const greetings = {
    stick: ['приве'],
    gif: ['здрав', 'здаров'],
    mess:['доброе утро','дорый день','добрый вечер','доброй ночи']
  }
  const greetTypes = Object.keys(greetings);

  if (!!msg.text) {
    //console.log(ctx.update.message.from);
    const text = msg.text.toLowerCase();
    //functions
    const spam = (contentKey, n, TYPE) => {
      const array = AddToArray(CONTENT[contentKey]);
      const interval = setInterval(() => {
        if (n <= 0) clearInterval(interval);
        n--;
        const randMes = randomMessageFromArray(array);
        if (!!randMes) {
          replyTypes[TYPE](randMes);
        }
      }, 1000);
    };

    const randomFromContent = (content) => {
      const arrayContent = AddToArray(content);
      const randomElement = randomMessageFromArray(arrayContent);
      return randomElement;
    };

    const randomCont = (contentKey, TYPE) => replyTypes[TYPE](randomFromContent(CONTENT[contentKey]));
    //work
    for(const key of replyKeys) {
      if (text.includes(key)){
        ctx.reply(replies[key]);
      }
    }
    
    for (const type of greetTypes) {
      for (const keyWord of greetings[type]) {
        if (text.includes(keyWord)) randomCont(type + 'Hello' + 'Content', type);
      }
    }

    for (const type of types) {
      if (text.includes(type)) {
        if (text.includes('spam' + type)) spam(type + 'Content', 10, type);
        if (text.includes('rand' + type)) randomCont(type + 'Content', type);
      }
    }

  }
});

bot.launch();
console.log('бот запущен');