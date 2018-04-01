module.exports = (bot) => {
  bot.dialog(
    'HelpDialog',
    (session) => {
      session.send('You reached the Help intent. You said \'%s\'.', session.message.text);
      session.endDialog();
    },
  ).triggerAction({
    matches: 'Help',
  });
};

