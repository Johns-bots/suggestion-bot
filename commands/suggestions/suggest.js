const Command = require('../../structures/Command');
const config = require('../../config.json');
const Discord = require('discord.js');

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'suggest',
        aliases: ["s", "sug"],
        description: `Suggest anything!`,
        category: 'Suggestions',
        cooldown: 20,
        botPermission: ["ADD_REACTIONS"]
      });
    }
    async run(message, args) {
      console.log(`Discord Suggestion Ran. From user ${message.author.tag}`)
      const channelId = `${config.logChannelID}`; 
      let channel;
      if(config.suggestion_channel_id){
        channel = await message.guild.channels.cache.get(config.suggestion_channel_id)
      } else channel = await message.guild.channels.cache.find(c => c.name == "suggestions" && c.type == "text");
      if(!channel){
      return message.channel.send(`${message.client.emoji.fail} | I could not find the suggestion channel in the current guild.`)
      };
      const suggestion = args.slice(0).join(" ")
      if(!suggestion){
        return message.channel.send(`${message.client.emoji.fail} | You need to type !suggest [Your suggestion]`)
      };
      const embed = new Discord.MessageEmbed()
      .setThumbnail(message.author.avatarURL())
      .setDescription(`**Submitter**\n ${message.author.tag} \n\n**Suggestion**\n ${suggestion}`)
      .setFooter(`Suggested by ${message.author.id}`)
      .setTimestamp()
      .setColor(message.client.color.blue)
      channel.send(embed)
      .then((s)=>{
      s.react(`✅`)
      s.react(`❌`)
      })
      .catch(()=>{
        return message.reply(`${message.client.emoji.fail} | Could not send a message to the suggestion Channel.`)
      });
      message.delete();
      return message.channel.send(`${message.client.emoji.success} | Successfuly sent your suggestion to ${channel}`)
      }
};

