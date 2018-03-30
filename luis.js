require('dotenv').config();
const restify = require('restify');
const builder = require('botbuilder');
const request = require('request-promise-native');
const cognitive = require('./cognitivServis');
const server = restify.createServer();

server.listen(process.env.port || process.env.PORT || 3978, () => {
  console.log('%s listening to %s', server.name, server.url);
});

const connector = new builder.ChatConnector({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD,
});

const accessKey = process.env.KEY1_AZURE;
const url = process.env.URL_AZURE;
const path = process.env.PATH;

server.post('/api/messages', connector.listen());

const inMemoryStorage = new builder.MemoryBotStorage();
const bot = new builder.UniversalBot(connector);
bot.set('storage', inMemoryStorage);

const luisAppId = process.env.LuisAppId 
const luisAPIKey = process.env.LuisAPIKey 
const luisAPIHostName = process.env.LuisAPIHostName

const LuisModelUrl = `https://${luisAPIHostName}/luis/v2.0/apps/${luisAppId}7?subscription-key=${luisAPIKey}&verbose=true&timezoneOffset=0&q=`;
const recognizer = new builder.LuisRecognizer(LuisModelUrl);
const intents = new builder.IntentDialog({ recognizers: [recognizer] })
.matches('Greeting', (session) => {
    cognitive.sentiment(session.message.text, session.message.address.id);
    console.log(session.userData.notes)
    session.send('You reached Greeting intent, you said \'%s\'.', session.message.text);
  })
.matches('Help', (session) => {
    session.send('You reached Help intent, you said \'%s\'.', session.message.text);
  })
.matches('Cancel', (session) => {
    session.send('You reached Cancel intent, you said \'%s\'.', session.message.text);
  })
.matches('None', (session) => {
    console.log(session.message.text);
    console.log(session.userData.notes);
    session.send('Hi... I am the note bot sample. I can create new notes, read saved notes to you and delete notes.')
  })


bot.dialog('/', intents);