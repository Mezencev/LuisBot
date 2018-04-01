require('dotenv').config();
const restify = require('restify');
const builder = require('botbuilder');

const cognitive = require('./cognitivServis');


const server = restify.createServer();

server.listen(process.env.port || process.env.PORT || 3978, () => {
  console.log('%s listening to %s', server.name, server.url);
});

const connector = new builder.ChatConnector({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD,
});


server.post('/api/messages', connector.listen());

const inMemoryStorage = new builder.MemoryBotStorage();
const bot = new builder.UniversalBot(connector, (session) => {
  cognitive.sentiment(session.message.text, session.message.address.id);
  session.send(`Welcome. I am bot. You say ${session.message.text}`);
});
bot.set('storage', inMemoryStorage);

const luisAppId = process.env.LuisAppId;
const luisAPIKey = process.env.LuisAPIKey;
const luisAPIHostName = process.env.LuisAPIHostName;

const LuisModelUrl = `https://${luisAPIHostName}/luis/v2.0/apps/${luisAppId}7?subscription-key=${luisAPIKey}&verbose=true&timezoneOffset=0&q=`;

const recognizer = new builder.LuisRecognizer(LuisModelUrl);
bot.recognizer(recognizer);

require('./dialogs/greting')(bot, builder);
require('./dialogs/help')(bot);
require('./dialogs/cansel')(bot);
