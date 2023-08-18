export default ({ channel, message }: { channel: any; message: string }) => {
  channel
    .send(message)
    .then(() =>
      console.info(
        JSON.stringify({
          time: Date.now(),
          trigger: 'throwFeedbackMessage func',
          msg: 'Feedback message sent by the bot'
        })
      )
    )
    .catch((e: any) =>
      console.error(
        JSON.stringify({
          time: Date.now(),
          trigger: 'throwFeedbackMessage func',
          msg: e?.message || 'Error'
        })
      )
    );
};
