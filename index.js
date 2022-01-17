'use strict';

//const { messageTypes } = require('node-telegram-bot-api/src/telegram');
const { Telegraf } = require('telegraf');
const fs = require('fs');

const GIF_PATH = 'gif.txt';
const STICK_PATH = 'sticker.txt';
const MESS_PATH = 'messagearray.txt';

/*const add = (data, file) => {
  fs.appendFileSync(file, `${data}`, () => {});
  fs.appendFileSync(file, '\n', () => {});
};*/

const contentUTF8 = (file) => fs.readFileSync(file, 'utf8');
const CONTENT = {
  gifContent: contentUTF8(GIF_PATH),
  stickContent: contentUTF8(STICK_PATH),
  messContent: contentUTF8(MESS_PATH),
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

/*bot.on('sticker', (ctx) => {
  const idStick = ctx.update.message.sticker.file_id;
  add(idStick, StickPath);
  ctx.reply('Succesfully aded to file');
});
bot.on('animation', (ctx) => {
  const idGif = ctx.update.message.animation.file_id;
  add(idGif, GifPath);
  ctx.reply('Succesfully aded to file');
});*/

const commands = {
  ban: 'Гачи топ, зачем банить?',
  leave: 'Я не уйду, пока мне мой Master  не прикажет!',
  exit: 'И не надейся)))',
  stop: 'Gachi поезд не остановить!!!',
  help: 'трахать мишку Чирозиди',
  trueLeave: 'CumCum',
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
  const msg = ctx.message;
  const replies = {
    бан: 'Себя забань пидор',
    ban: 'Нахуй иди!',
    kik: 'Нихуя не выйдет!',
    кик: 'Себя блять кикни!',
  };
  const keys = Object.keys(replies);

  if (!!msg.text) {
    const text = msg.text.toLowerCase();
    for(const key of keys) {
      if (text.includes(key)){
        ctx.reply(replies[key]);
      }
    }

    const replyTypes = {
      mess(mes){
        ctx.reply(mes);
      },
      stick(mes){
        ctx.replyWithSticker(mes);
      },
      gif(mes){
        ctx.replyWithAnimation(mes);
      }
    };

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

    const types = Object.keys(replyTypes);
    for (const type of types) {
      if (text.includes(type)) {
        if (text.includes('spam' + type)) spam(type + 'Content', 10, type);
        if (text.includes('rand' + type)) randomCont(type + 'Content', type);
      }
    }

  }
});

bot.launch();
console.log('Похуярили!!');
