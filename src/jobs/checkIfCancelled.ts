import type Discord from 'discord.js';
import { SERVER_ID } from '../env';
import usersToBeCancel from '../services/usersToBeCancel.service';

export default (client: Discord.Client<true>) => async () => {
  try {
    const { data: users } = await usersToBeCancel();

    users.forEach(async user => {
      const uid = user.client.id_user_discord;
      const guild = client.guilds.cache.get(SERVER_ID);
      const member = guild.members.cache.get(uid);

      if (member.roles.cache.size === 0) return
      
      await member.roles.set([]); // wipe roles

      console.info(
        JSON.stringify({
          time: Date.now(),
          trigger: 'checkIfCancelled func',
          msg: `All roles wipe for the member <@${uid}>`
        })
      );
    });

    return {
      success: true,
      message: `All roles wipe for the members ${users
        .map(user => `<@${user.client.id_user_discord}>`)
        .join(' ')}`
    };
  } catch (e) {
    return {
      success: false,
      message: e.message
    };
  }
};
