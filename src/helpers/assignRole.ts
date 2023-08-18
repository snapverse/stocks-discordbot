import type Discord from 'discord.js';
import throwFeedbackMessage from './throwFeedbackMessage';

export default async ({
  role,
  channel,
  to
}: {
  role: Discord.Role;
  channel: any;
  to: Discord.GuildMember;
}): Promise<string> => {
  return await new Promise(async (resolve, reject) => {
    if (role && to.permissions.has('ManageRoles')) {
      try {
        await to.roles.add(role);
        const message = `Role <@&${role.id}> assigned to <@${to.user.id}>, check your new content!`;
        throwFeedbackMessage({ channel, message });
        resolve(message);
      } catch {
        const message = `Error adding role to <@${to.user.tag}>`;
        throwFeedbackMessage({ channel, message });
        reject(message);
      }
    } else {
      reject("Role not found or bot doesn't have the required permissions.");
    }
  });
};
