import type Discord from 'discord.js';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { RolesById } from '../constants';
import { CHANNEL_ID, SERVER_ID } from '../env';
import throwFeedbackMessage from '../helpers/throwFeedbackMessage';

export default {
  ping(client: Discord.Client<boolean>) {
    return async (_request: FastifyRequest, _reply: FastifyReply) => {
      const guildName = client.guilds.cache.get(SERVER_ID).name;
      return `Pong from ${guildName}`;
    };
  },
  roleSwap(client: Discord.Client<boolean>) {
    return async (request: FastifyRequest, _reply: FastifyReply) => {
      try {
        const { uid } = request.params as any;
        const { roleId } = request.body as any;
        const guildRoleId = RolesById[roleId];

        const guild = client.guilds.cache.get(SERVER_ID);
        const member = guild.members.cache.get(uid);
        const newRole = guild.roles.cache.get(guildRoleId);
        const channel = guild.channels.cache.get(CHANNEL_ID);

        await member.roles.set([]); // wipe roles
        await member.roles.add(newRole);

        const message = `Role of user <@${member.user.id}> was swapped to <@&${newRole.id}>`;

        throwFeedbackMessage({ channel, message });

        return {
          success: true,
          message
        };
      } catch (e) {
        return {
          success: false,
          message: e.message
        };
      }
    };
  }
};
