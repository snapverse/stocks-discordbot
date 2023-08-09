import type Discord from 'discord.js';

export default async ({
  role,
  to
}: {
  role: Discord.Role;
  to: Discord.GuildMember;
}): Promise<string> => {
  return await new Promise((resolve, reject) => {
    if (role && to.permissions.has('ManageRoles')) {
      to.roles
        .add(role)
        .then(() => resolve('Role assigned to: '))
        .catch(_ => reject('Error adding role to: '));
    } else {
      reject("Role not found or bot doesn't have permission to manage roles.");
    }
  });
};
