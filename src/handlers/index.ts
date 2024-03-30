import Discord from 'discord.js';
import { CHANNEL_ID } from '../env';
import assignRole from '../helpers/assignRole';
import capitalizeWord from '../helpers/capitalizeWord';
import echo from '../helpers/echo';
import throwFeedbackMessage from '../helpers/throwFeedbackMessage';
import useRoles from '../hooks/useRoles';
import checkIfCancelled from '../jobs/checkIfCancelled';
import scheduleJob from '../jobs/scheduleJob';
import verifyChannelDiscord from '../services/verifyChannelDiscord.service';

export default {
  clientReady(client: Discord.Client<true>) {
    echo.log(
      `src/handlers/index.ts:15`,
      `Ready! Logged in as ${client.user.tag}`
    );

    scheduleJob('0 8,20 * * * *', checkIfCancelled(client)); // 8 AM and 8 PM
    // scheduleJob('*/30 * * * * *', checkIfCancelled(client)); // each 30s
  },
  messageCreate(message: Discord.Message<boolean>) {
    if (message.author.bot) return;

    if (message.channelId === CHANNEL_ID) {
      const roles = useRoles(message.guild!.roles);
      const messageContent = message.content.toUpperCase();

      if (
        !roles.Basic ||
        !roles.Standard ||
        !roles.Premium ||
        !message.member
      ) {
        echo.error(`src/handlers/index.ts:31`, 'Role or Member was not found!');
        return;
      }

      if (messageContent.split('-').length === 3) {
        verifyChannelDiscord({
          discordUserId: message.member.id,
          verificationCode: messageContent
        })
          .then(async res => {
            const packageName = capitalizeWord(res.data);

            const result = await assignRole({
              to: message.member,
              role: roles[packageName],
              // channel: message.channel
            });

            throwFeedbackMessage({
              channel: message.channel,
              message: result
            });
          })
          .catch(err => {
            throwFeedbackMessage({
              channel: message.channel,
              message: err?.message || err
            });
          });

        return;
      }

      throwFeedbackMessage({
        channel: message.channel,
        message:
          'Oops! ❌ Looks like that code is unavailable. Double-check your email and try again later! 📧'
      });
    }
  },
  error(e: Error) {
    echo.error(`src/handlers/index.ts:59`, e.message);
  }
};
