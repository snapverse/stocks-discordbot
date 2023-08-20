import Discord, { Events, GatewayIntentBits, Partials } from 'discord.js';
import Fastify from 'fastify';
import ctrl from './controllers';
import { BOT_TOKEN } from './env';
import handlers from './handlers';

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

client.once(Events.ClientReady, handlers.clientReady);
client.on(Events.MessageCreate, handlers.messageCreate);
client.on(Events.Error, handlers.error);

client.login(BOT_TOKEN);

fastify.register(
  (app, _, next) => {
    app.get('/ping', ctrl.ping(client));
    app.put('/role/swap/:uid', ctrl.roleSwap(client));

    next();
  },
  { prefix: '/v1' }
);

start();
