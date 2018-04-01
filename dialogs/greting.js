const giphy = require('../giphy');

module.exports = (bot, builder) => {
  bot.dialog('GreetingDialog', [
    (session) => {
      session.send('Hello');
      builder.Prompts.text(session, 'What would you like to see?');
    },
    (session, results) => {
      giphy.getGiphy(results.response).then((gif) => {
        session.send({
          text: 'Here you go!',
          attachments: [
            {
              contentType: 'image/gif',
              contentUrl: JSON.parse(gif).data.images.original.url,
            },
          ],
        });
      });
      session.endDialog();
    },
  ]).triggerAction({
    matches: 'Greeting',
  });
};
/* module.exports = (bot, builder) => {
  bot.dialog('GreetingDialog', [
    (session) => {
      session.send('Welcome to the dinner reservation.');
      session.beginDialog('askForDateTime');
    },
    (session, results) => {
      session.dialogData.reservationDate = builder.EntityRecognizer.resolveTime([results.response]);
      session.beginDialog('askForPartySize');
    },
    (session, results) => {
      session.dialogData.partySize = results.response;
      session.beginDialog('askForReserverName');
    },
    (session, results) => {
      session.dialogData.reservationName = results.response;
      session.send(`Reservation confirmed. Reservation details: <br/>Date/Time: ${session.dialogData.reservationDate} <br/>Party size: ${session.dialogData.partySize} <br/>Reservation name: ${session.dialogData.reservationName}`);
      session.replaceDialog('mainMenu');
    },
  ])
    .triggerAction({
      matches: 'Greeting',
      confirmPrompt: 'This will cancel your current request. Are you sure?',
    });
  bot.dialog('askForDateTime', [
    (session) => {
      builder.Prompts.time(session, 'Please provide a reservation date and time (e.g.: June 6th at 5pm)');
    },
    (session, results) => {
      session.endDialogWithResult(results);
    },
  ]);

  bot.dialog('askForPartySize', [
    (session) => {
      builder.Prompts.text(session, 'How many people are in your party?');
    },
    (session, results) => {
      session.endDialogWithResult(results);
    },
  ])
    .beginDialogAction('partySizeHelpAction', 'partySizeHelp', { matches: /^help$/i });
  bot.dialog('partySizeHelp', (session, args, next) => {
    const msg = 'Party size help: Our restaurant can support party sizes up to 150 members.';
    session.endDialog(msg);
  });

  bot.dialog('askForReserverName', [
    (session) => {
      builder.Prompts.text(session, "Who's name will this reservation be under?");
    },
    (session, results) => {
      session.endDialogWithResult(results);
    },
  ]);
}; */
