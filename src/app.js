import Discord, {
  Events,
  GatewayIntentBits,
  Partials,
  PermissionsBitField
} from 'discord.js';
import { BOT_TOKEN, CHANNEL_ID } from './env';
import { Roles } from './constants';
import sendBotMessage from './handlers/sendBotMessage';
import { setUserRole } from './handlers/setUserRole';

const client = new Discord.Client({
  intents: [
    GatewayIntentBits.AutoModerationConfiguration,
    GatewayIntentBits.AutoModerationExecution,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent
  ],
  partials: [
    Partials.Channel,
    Partials.GuildMember,
    Partials.GuildScheduledEvent,
    Partials.Message,
    Partials.Reaction,
    Partials.ThreadMember,
    Partials.User
  ]
});

client.once(Events.ClientReady, client =>
  console.log(`Ready! Logged in as ${client.user.tag}`)
);

client.on(Events.MessageCreate, message => {
  if (message.author.bot) return;

  if (message.channelId === CHANNEL_ID) {
    const basicRole = message.guild?.roles.cache.get(Roles.BASIC);
    const standardRole = message.guild?.roles.cache.get(Roles.STANDARD);
    const premiumRole = message.guild?.roles.cache.get(Roles.PREMIUM);

    switch (message.content.toLowerCase()) {
      case 'b':
        setUserRole({ message, role: basicRole });
        break;
      case 's':
        setUserRole({ message, role: standardRole });
        break;
      case 'p':
        setUserRole({ message, role: premiumRole });
        break;
      default:
        sendBotMessage({
          message,
          description: 'Something went wrong, pls try again :/'
        });
    }
  }
});

client.on(Events.Error, error => {
  console.error('An error occurred:', error);
});

client.login(BOT_TOKEN);
