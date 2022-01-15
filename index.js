"use strict";

//const { messageTypes } = require('node-telegram-bot-api/src/telegram');
const { Telegraf } = require("telegraf");
const fs = require("fs");

const GifPath = "gif.txt";
const StickPath = "sticker.txt";
const MessPath = "messagearray.txt";

const add = (data, file) => {
  fs.appendFileSync(file, `${data}`, () => {});
  fs.appendFileSync(file, "\n", () => {});
};

const contentUTF8 = (file) => fs.readFileSync(file, "utf8");
const GifContent = contentUTF8(GifPath);
const StickContent = contentUTF8(StickPath);
const MessContent = contentUTF8(MessPath);

const AddToArray = (data) => data.split("\n");

const randomMessageFromArray = (array) => {
  const index = Math.floor(Math.random() * (array.length-1));
  const message = array[index];
  console.log(index + '  ' + array[index]);
  return message;
};

const token = "5041846136:AAFjwTdTJI9vwbYiLLvWDe4OupltRqesXrc";
const bot = new Telegraf(token);

bot.on("sticker", (ctx) => {
  const idStick = ctx.update.message.sticker.file_id;
  add(idStick, StickPath);
  ctx.reply("Succesfully aded to file");
});
bot.help((ctx) => ctx.reply("трахать мишку Чирозиди"));
bot.on("animation", (ctx) => {
  const idGif = ctx.update.message.animation.file_id;
  add(idGif, GifPath);
  ctx.reply("Succesfully aded to file");
});
bot.on("message", async (ctx) => {
  const msg = ctx.message;
  //ctx.reply(msg.message_id);
  //console.log('msg = ');
  //console.log(msg);
  if (!!msg.text) {
    const text = msg.text.toLowerCase();
    if (text.includes("fuck")) {
      ctx.reply("Fuck yourself");
    }
    if (text == "cummingout") {
      ctx.telegram.leaveChat(ctx.message.chat.id);
    }
    if (text.includes("fistingsticker")) {
      ctx.replyWithSticker(
        "CAACAgIAAxkBAAIEIWHhtQNq1csVwleUpSasDYjour8HAAI6DgACxzcxSrerMJ7zVWfaIwQ"
      );
    }
    if (text.includes("fistinggif")) {
      ctx.replyWithAnimation(
        "CgACAgIAAxkBAAIDHWHhtCNByHTejiznln6ggcOZD3nHAAIoDQAC93O4St5iZTgtQs5aIwQ"
      );
    }

    if (text.includes("spam")) {
      let n = 40;
      const arrayMes = AddToArray(MessContent);
      const interval = setInterval(() => {
        if (n === 0) clearInterval(interval);
        n -= 4;
        const messageRand = randomMessageFromArray(arrayMes);
        if(!!messageRand){ctx.reply(messageRand);}
      }, 1000);
    }
  }
});

bot.launch();
console.log("Похуярили!!");

console.log("GIF:");
console.log(AddToArray(GifContent));
console.log(AddToArray(GifContent).length)

console.log("Sticker:");
console.log(AddToArray(StickContent));
console.log(AddToArray(StickContent).length)

console.log("Messages");
console.log(AddToArray(MessContent));
console.log(AddToArray(MessContent).length)
