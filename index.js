'use strict';

//const { messageTypes } = require('node-telegram-bot-api/src/telegram');
const {Telegraf} = require('telegraf');

const token = '5041846136:AAFjwTdTJI9vwbYiLLvWDe4OupltRqesXrc';
//const TelegramApi = require('node-telegram-bot-api');
//const bot = new TelegramApi(token, {pooling: true});

const bot = new Telegraf(token);

bot.on('sticker', (ctx) => {ctx.replyWithSticker(ctx.update.message.sticker.file_id);});
bot.help((ctx) => ctx.reply('трахать мишку Чирозиди'));
bot.on('animation',(ctx)=>{ctx.replyWithAnimation(ctx.update.message.animation.file_id)});
bot.on('message', async ctx =>{
  
   const msg = ctx.message;
   //ctx.reply(msg.message_id);
   //console.log('msg = ');
   //console.log(msg);
    if(!!msg.text){
      const text =  msg.text.toLowerCase();
      if(text.includes('fuck')){
        ctx.reply('Fuck yourself');
    }
    if(text == 'cummingout'){
      ctx.telegram.leaveChat(ctx.message.chat.id);
    }
    if(text.includes('fisting')){
      ctx.replyWithSticker("CAACAgIAAxkBAAP7Yd8mN57v6mAuCpiV0YAW_5LerXEAAjwAAyNZzgxK0bhiL0XOOSME")
  }
  if(text.includes('spam')){
    const badArray = ['Иди нахуй','Гачи топ','да ладно...','Ну ты и еблан...', 'Бравл СТААААРС!!','Я сказал, кринжуем','Билли покарает вас всех','Новый год is fucking cumming','Happy new year slaves'];

    const writeBadThings = () =>{
    const index =  Math.floor(Math.random() * badArray.length);
    const message = badArray[index];
    return message;
    }

    for(let i =0; i <10; i++){
      setInterval(()=>ctx.reply(writeBadThings()),5000);
    }
  }
    }
})




bot.launch();
console.log('Похуярили!!');


