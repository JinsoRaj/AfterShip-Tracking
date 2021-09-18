// Telegram bot - on development
// set BOT_TOKEN and deta variables in .env

const { Telegraf } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);
const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');
const session = require('telegraf/session');

//Scene Manage
const stage = new Stage();

//Scene register
const getOrderId = new Scene('getOrderId')
stage.register(getOrderId);

//Session
bot.use(session());
bot.use(stage.middleware());

bot.start((ctx) => {
    ctx.reply('Hey !');
})

bot.command('track', (ctx) => {
    ctx.scene.enter('getOrderId')
})


getOrderId.enter((ctx) => {
    ctx.reply('Okay. Enter Order id:')
})

getOrderId.on('message', async (ctx,next) => {
    if (ctx.message.text){
        var id = ctx.message.text;
        if(id != '/start' && id != '/track'){ 
            await ctx.reply(`ok got ${id}.`);
            //get provider name frm calbck
            callFn(id,provider);
        }       
        ctx.scene.leave('getOrderId');
    }
    else{
        //non-text case
        ctx.reply("Order id ?? 🤨😐")
    }
    await next()
});

//launch
bot.launch()