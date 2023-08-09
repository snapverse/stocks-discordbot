import Discord from 'discord.js';

export default ({
  channel,
  description = 'This is an example of an embed message.'
}: {
  channel: Discord.TextChannel;
  description: string;
}) => {
  const embed = new Discord.EmbedBuilder()
    .setColor('#FF0000')
    .setTitle('Something went wrong :/')
    .setDescription(description)
    .setTimestamp()
    .setFooter({
      text: 'Consult to the owner of this server to get support',
      iconURL: 'https://i.imgur.com/AfFp7pu.png'
    });

  // Send the embed message
  channel
    .send({ embeds: [embed] })
    .then(() => console.info('Embed message sent!'))
    .catch(error => console.error('Error sending embed:', error));
};
