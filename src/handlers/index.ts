import Discord from 'discord.js';
import Fastify from 'fastify';
import ctrl from '../controllers';
import { CHANNEL_ID } from '../env';
import assignRole from '../helpers/assignRole';
import capitalizeWord from '../helpers/capitalizeWord';
import throwFeedbackMessage from '../helpers/throwFeedbackMessage';
import useRoles from '../hooks/useRoles';
import checkIfCancelled from '../jobs/checkIfCancelled';
import scheduleJob from '../jobs/scheduleJob';
import verifyChannelDiscord from '../services/verifyChannelDiscord.service';

const fastify = Fastify({
  logger: true
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

export default {
  clientReady(client: Discord.Client<true>) {
    console.info(
      JSON.stringify({
        time: Date.now(),
        trigger: 'clientReady event',
        msg: `Ready! Logged in as ${client.user.tag}`
      })
    );

    fastify.register(
      (app, _, next) => {
        app.get('/ping', () => 'pong');
        app.put('/role/swap/:uid', ctrl.roleSwap(client));

        next();
      },
      { prefix: '/v1' }
    );

    start();
    scheduleJob('0 8,20 * * * *', checkIfCancelled(client)); // 8 AM and 8 PM
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
        console.error(
          JSON.stringify({
            time: Date.now(),
            trigger: 'messageCreate event',
            msg: 'Role or Member was not found!'
          })
        );
        return;
      }

      if (messageContent.split('-').length === 3) {
        verifyChannelDiscord({
          discordUserId: message.member.id,
          verificationCode: messageContent
        })
          .then(res => {
            const packageName = capitalizeWord(res.data);

            assignRole({
              to: message.member,
              role: roles[packageName],
              channel: message.channel
            });
          })
          .catch(err => {
            throwFeedbackMessage({
              channel: message.channel,
              message: err.message
            });
          });
      }
    }
  },
  error(e: any) {
    console.error(
      JSON.stringify({
        time: Date.now(),
        trigger: 'error event',
        msg: e || 'Error'
      })
    );
  }
};
