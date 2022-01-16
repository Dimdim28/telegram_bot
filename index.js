'use strict';

const { Telegraf } = require('telegraf');
const fs = require('fs');

const token = '5041846136:AAFjwTdTJI9vwbYiLLvWDe4OupltRqesXrc';
const bot = new Telegraf(token);

const GifPath = 'gif.txt';
const StickPath = 'sticker.txt';
const MessPath = 'messagearray.txt';

const contentUTF8 = (file) => fs.readFileSync(file, 'utf8');

const GifContent = contentUTF8(GifPath);
const StickContent = contentUTF8(StickPath);
const MessContent = contentUTF8(MessPath);

const AddToArray = (data) => data.split('\n');

const randomMessageFromArray = (array) => {
  const index = Math.round(Math.random() * (array.length - 1));
  const message = array[index];
  return message;
};

bot.help((ctx) => ctx.reply ('трахать мишку чирозиди'));
bot.command('CumCum', (ctx) => ctx.telegram.leaveChat(ctx.message.chat.id));
bot.command('ban', (ctx) => ctx.reply ('Гачи топ, зачем банить?'));
bot.command('leave', (ctx) => ctx.reply ('Я не уйду, пока мне мой Master не прикажет!'));
bot.command('exit', (ctx) => ctx.reply ('И не надейся)))'));
bot.command('stop', (ctx) => ctx.reply ('Gachi поезд не остановить!!!'));

const spam = (content, n) => {
  const array = AddToArray(content);
  const interval = setInterval(() => {
    if (n <= 0) clearInterval(interval);
    n--;
    const rand = randomMessageFromArray(array);
    if (!!rand) {
      ctx.reply(rand);
    }
  }, 1000);
};

const randomFromContent = (content) => {
  const arrayContent = AddToArray(content);
  const randomElement = randomMessageFromArray(arrayContent);
  return randomElement;
};

bot.on('message', async (ctx) => {
  const msg = ctx.message;

  if (!!msg.text) {
    const text = msg.text.toLowerCase();

    const randomGif = (content) => ctx.replyWithAnimation(randomFromContent(content));
    const randomMess = (content) => ctx.reply(randomFromContent(content));
    const randomStick = (content) => ctx.replyWithSticker(randomFromContent(content));

    if (text.includes('бан')) {
      ctx.reply('Себя забань пидор!');
    }
    if (text.includes('ban')) {
      ctx.reply('Нахуй иди!');
    }
    if (text.includes('kik')) {
      ctx.reply('нихуя не выйдет!');
    }
    if (text.includes('кик')) {
      ctx.reply('Себя блять кикни!');
    }
    if (text.includes('spammess')) {
      spam(MessContent, 10);
    }
    if (text.includes('spamstick')) {
      spam(StickContent, 10);
    }
    if (text.includes('spamgif')) {
      spam(GifContent, 10);
    }
    if (text.includes('randmes')) {
      randomMess(MessContent);
    }
    if (text.includes('randgif')) {
      randomGif(GifContent);
    }
    if (text.includes('randstick')) {
      randomStick(StickContent);
    }
  }
});

bot.launch();
console.log('Похуярили!!');
