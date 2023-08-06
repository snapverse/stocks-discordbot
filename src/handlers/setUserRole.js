export const setUserRole = ({ role, message }) => {
  // Check if the role exists and if the bot has permission to manage roles
  if (role && message.member?.permissions.has('ManageRoles')) {
    // Assign the role to the author of the message
    message.member.roles
      .add(role)
      .then(() => console.log(`Role added to ${message.author.tag}`))
      .catch(error => console.error('Error adding role:', error));
  } else {
    console.error(
      "Role not found or bot doesn't have permission to manage roles."
    );
  }
};
