import echo from './echo';

export default ({ channel, message }: { channel: any; message: string }) => {
  channel
    .send(message)
    .then(() =>
      echo.log(
        `src/helpers/throwFeedbackMessage.ts:5`,
        'Feedback message sent by the bot'
      )
    )
    .catch((e: any) =>
      echo.error(
        `src/helpers/throwFeedbackMessage.ts:14`,
        e?.message || 'Error'
      )
    );
};
