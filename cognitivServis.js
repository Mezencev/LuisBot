
const request = require('request-promise-native');

const accessKey = process.env.KEY1_AZURE;
const url = process.env.URL_AZURE;
const path = process.env.PATH;

module.exports.sentiment = async function (text, id) {
  try {
    const params = {
      method: 'POST',
      url,
      path,
      headers: {
        'Ocp-Apim-Subscription-Key': accessKey,
        'Content-Type': 'application/json',
      },
      body: {
        documents: [{ id, language: 'en', text }],
      },
      json: true,
    };
    const requestResutl = await request.post(url, params);
    console.log(requestResutl);
    const { documents: [{ score }] } = requestResutl;

    return score;
  } catch (error) {
    console.error(error);
  }
};


/* const bot = new builder.UniversalBot(connector, (session) => {
    sentiment(session.message.text, session.message.address.id).then(v => {
      if (v <= 0.5) {
        fs.appendFile('message.txt', `\n ${session.message.address.id}   ${session.message.text}  ${v}`,(err) => {
          if (err) throw err
        });
        console.log(v);
        session.send('Sorry !')
      } else {
        session.send(`You said: ${session.message.text}`);
      }
    });
  }).set('storage', inMemoryStorage); */

