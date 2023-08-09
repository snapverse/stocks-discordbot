import Discord from 'discord.js';
import { Roles } from '../constants';

export default (roles: Discord.RoleManager) => {
  return {
    Basic: roles.cache.get(Roles.BASIC),
    Standard: roles.cache.get(Roles.STANDARD),
    Premium: roles.cache.get(Roles.PREMIUM)
  };
};
