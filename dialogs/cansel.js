module.exports = (bot) => {
  bot.dialog(
    'CancelDialog',
    (session) => {
      session.send('You reached the Cancel intent. You said \'%s\'.', session.message.text);
      session.endDialog();
    },
  ).triggerAction({
    matches: 'Cancel',
  });
};

