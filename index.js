'use strict';

//const { messageTypes } = require('node-telegram-bot-api/src/telegram');
const {Telegraf} = require('telegraf');

const token = '5041846136:AAFjwTdTJI9vwbYiLLvWDe4OupltRqesXrc';
//const TelegramApi = require('node-telegram-bot-api');
//const bot = new TelegramApi(token, {pooling: true});

const bot = new Telegraf(token);

bot.on('message', async ctx =>{
   const msg = ctx.message;
    if(!!msg.text){
      const text =  msg.text.toLowerCase();
      if(text.includes('fuck')){
        ctx.reply('Fuck yourself');
    }
    }
    /*const msg = ctx.message.toLowerCase();
    if(msg.includes('fuck')){
        ctx.reply('fisting');
    }*/
    
})
bot.launch();
console.log('Похуярили!!');


