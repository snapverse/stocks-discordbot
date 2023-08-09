import Discord from 'discord.js';
import { CHANNEL_ID } from '../env';
import assignRole from '../helpers/assignRole';
import capitalizeWord from '../helpers/capitalizeWord';
import useRoles from '../hooks/useRoles';
import verifyUser from '../services/verifyUser.service';

export default {
  clientReady(client: Discord.Client<true>) {
    console.info(`Ready! Logged in as ${client.user.tag}`);
  },
  messageCreate(message: Discord.Message<boolean>) {
    if (message.author.bot) return;

    if (message.channelId === CHANNEL_ID) {
      const roles = useRoles(message.guild!.roles);
      const messageContent = message.content.toLowerCase();
      const authorTag = message.author.tag

      if (
        !roles.Basic ||
        !roles.Standard ||
        !roles.Premium ||
        !message.member
      ) {
        console.error('Role or Member was not found!');
        return;
      }

      if (messageContent.split('-').length === 3) {
        verifyUser({
          discordUserId: message.member.id,
          verificationCode: messageContent
        })
          .then(res => {
            const packageName = capitalizeWord(res.data.client.plans[0].name);

            assignRole({ to: message.member, role: roles[packageName] })
              .then(res => console.info(res + authorTag))
              .catch(res => console.error(res + authorTag));
          })
          .catch(err => console.error(err + authorTag));
      }
    }
  },
  error(error: Error) {
    console.error('An error occurred:', error);
  }
};
