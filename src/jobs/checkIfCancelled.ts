import type Discord from 'discord.js';
import { SERVER_ID } from '../env';
import usersToBeCancel from '../services/usersToBeCancel.service';
import echo from '../helpers/echo';

export default (client: Discord.Client<true>) => async () => {
  try {
    const { data: users } = await usersToBeCancel();

    const promises = users.map(user => {
      const uid = user.client.id_user_discord;
      const guild = client.guilds.cache.get(SERVER_ID);
      const member = guild.members.cache.get(uid);

      if (member.roles.cache.size === 0) return null;

      member.roles.set([]); // wipe roles
      return uid;
    });

    const fulfilled = await Promise.all(promises);

    fulfilled.forEach(uid => {
      echo.log(
        'src/jobs/checkIfCancelled.ts:25',
        `All roles wipe for the member <@${uid}>`
      );
    });

    return {
      success: true,
      message: `All roles wipe for the members ${fulfilled
        .map(uid => `<@${uid}>`)
        .join(' ')}`
    };
  } catch (e) {
    return {
      success: false,
      message: e.message
    };
  }
};
