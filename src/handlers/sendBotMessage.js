import Discord from 'discord.js';

export default ({
  message,
  description = 'This is an example of an embed message.'
}) => {
  const exampleEmbed = new Discord.EmbedBuilder()
    .setColor('#8B0000')
    .setTitle('Embed Message')
    .setDescription(description)
    .addFields(
      { name: 'Field 1', value: 'Value 1' },
      { name: 'Field 2', value: 'Value 2', inline: true }
    )
    .setTimestamp()
    .setFooter({
      text: 'Some footer text here',
      iconURL: 'https://i.imgur.com/AfFp7pu.png'
    });

  // Send the embed message
  message.channel
    .send({ embeds: [exampleEmbed] })
    .then(() => console.log('Embed message sent!'))
    .catch(error => console.error('Error sending embed:', error));
};
