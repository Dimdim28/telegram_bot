'use strict';

//const { messageTypes } = require('node-telegram-bot-api/src/telegram');
const { Telegraf } = require('telegraf');
const fs = require('fs');

const GifPath = 'gif.txt';
const StickPath = 'sticker.txt';
const MessPath = 'messagearray.txt';

const add = (data, file) => {
  fs.appendFileSync(file, `${data}`, () => {});
  fs.appendFileSync(file, '\n', () => {});
};

const contentUTF8 = (file) => fs.readFileSync(file, 'utf8');
const GifContent = contentUTF8(GifPath);
const StickContent = contentUTF8(StickPath);
const MessContent = contentUTF8(MessPath);

const AddToArray = (data) => data.split('\n');

const randomMessageFromArray = (array) => {
  const index = Math.floor(Math.random() * (array.length - 1));
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
  //ctx.reply(msg.message_id);
  //console.log('msg = ');
  //console.log(msg);
  if (!!msg.text) {
    const text = msg.text.toLowerCase();
    if (text.includes('бан')) {
      ctx.reply('Себя забань пидор!');
    };
    if (text.includes('ban')) {
      ctx.reply('Нахуй иди!');
    };
    if (text.includes('kik')) {
      ctx.reply('нихуя не выйдет!');
    };
    if (text.includes('кик')) {
      ctx.reply('Себя блять кикни!');
    };

    const SpamMes = (contentMes, n) => {
      const arrayMes = AddToArray(contentMes);
      const interval = setInterval(() => {
        if (n <= 0) clearInterval(interval);
        n--;
        const messageRand = randomMessageFromArray(arrayMes);
        if (!!messageRand) {
          ctx.reply(messageRand);
        }
      }, 1000);
    };

    const SpamStick = (contentStick, n) => {
      const arrayStick = AddToArray(contentStick);
      const interval = setInterval(() => {
        if (n <= 0) clearInterval(interval);
        n--;
        const stickRand = randomMessageFromArray(arrayStick);
        if (!!stickRand) {
          ctx.replyWithSticker(stickRand);
        }
      }, 1000);
    };

    const SpamGif = (contentGif, n) => {
      const arrayGif = AddToArray(contentGif);
      const interval = setInterval(() => {
        if (n <= 0) clearInterval(interval);
        n--;
        const gifRand = randomMessageFromArray(arrayGif);
        if (!!gifRand) {
          ctx.replyWithAnimation(gifRand);
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
      SpamMes(MessContent, 10);
    }
    if (text.includes('spamstick')) {
      SpamStick(StickContent, 10);
    }
    if (text.includes('spamgif')) {
      SpamGif(GifContent, 10);
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
