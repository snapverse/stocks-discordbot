import type Discord from 'discord.js';
import echo from './echo';

const assignRole = async ({
  role,
  // channel,
  to: member
}: {
  role: Discord.Role;
  // channel: any;
  to: Discord.GuildMember;
}): Promise<string> => {
  // etc
  return await new Promise(async (resolve, reject) => {
    try {
      // if (role && !member.permissions.has('ManageRoles')) {
      await member.roles.add(role);
      const message = `Role <@&${role.id}> assigned to <@${member.user.id}>, check your new content!`;
      resolve(message);
    } catch (err) {
      echo.error('src/helpers/assignRole.ts:22', err.message);
      const message = `Error adding role to <@${member.user.id}>`;
      reject(message);
    }
  });
};

export default assignRole;
