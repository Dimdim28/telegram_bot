'use strict';

//const { messageTypes } = require('node-telegram-bot-api/src/telegram');
const { Telegraf } = require('telegraf');
const fs = require('fs');

const GifPath = 'gif.txt';
const StickPath = 'sticker.txt';
const MessPath = 'messagearray.txt';

/*const add = (data, file) => {
  fs.appendFileSync(file, `${data}`, () => {});
  fs.appendFileSync(file, '\n', () => {});
};*/

const contentUTF8 = (file) => fs.readFileSync(file, 'utf8');
const GifContent = contentUTF8(GifPath);
const StickContent = contentUTF8(StickPath);
const MessContent = contentUTF8(MessPath);

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
bot.help((ctx) => ctx.reply('трахать мишку Чирозиди'));
bot.command('CumCum', (ctx) => ctx.telegram.leaveChat(ctx.message.chat.id));
bot.command('ban', (ctx) => ctx.reply('Гачи топ, зачем банить?'));
bot.command('leave', (ctx) => ctx.reply('Я не уйду, пока мне мой Master  не прикажет!'));
bot.command('exit', (ctx) => ctx.reply('И не надейся)))'));
bot.command('stop', (ctx) => ctx.reply('Gachi поезд не остановить!!!'));


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

    const spamTypes = {
      spammess(mes){
        ctx.reply(mes);
      },
      spamstick(mes){
        ctx.replyWithSticker(mes);
      },
      spamgif(mes){
        ctx.replyWithAnimation(mes);
      }
    };

    const spam = (content, n, TYPE) => {
      const array = AddToArray(content);
      const interval = setInterval(() => {
        if (n <= 0) clearInterval(interval);
        n--;
        const randMes = randomMessageFromArray(array);
        if (!!randMes) {
          spamTypes[TYPE](randMes);
        }
      }, 1000);
    };

    const randomfromContent = (content) => {
      const arrayContent = AddToArray(content);
      const randomElement = randomMessageFromArray(arrayContent);
      return randomElement;
    };

    const randomGif =(content) => ctx.replyWithAnimation(randomfromContent(content));
    const randomMess =(content) => ctx.reply(randomfromContent(content));
    const randomStick =(content) => ctx.replyWithSticker(randomfromContent(content));


    if (text.includes('spammess')) {
      spam(MessContent, 10, 'spammess');
    }
    if (text.includes('spamstick')) {
      spam(StickContent, 10, 'spamstick');
    }
    if (text.includes('spamgif')) {
      spam(GifContent, 10, 'spamgif');
    };
    if(text === 'randmes'){
      randomMess(MessContent);
    };
    if(text === 'randgif'){
      randomGif(GifContent);
    };
    if(text === 'randstick'){
      randomStick(StickContent);
    };
  }
});

bot.launch();
console.log('Похуярили!!');
