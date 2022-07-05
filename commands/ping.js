const Discord = require("discord.js");
module.exports = {
    name: "ping",
    aliases: [],
    desc: "Returns the bot's latency.",
    usage: "",
        /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {Array} args 
     * @returns 
     */
    async execute(client,message,args) {
        try{
            if (message.channel.id !== "962377198315130941" && message.guild.id !== "867743161208143884" && message.channel.type !== "GUILD_PUBLIC_THREAD") {
                if (message.author.id !== "406811978762551298" && message.author.id !== "386490806716071946") {

                    return message.reply(`Hey ${message.author.username}! I can't help you here, please use <#962377198315130941>. BlueTheSniper checks all messages there so he can help you look for a build (and to identify missing builds in the database that can be added).`)
                }
            }

        let embed = new Discord.MessageEmbed()
        .setDescription("Pinging...")
        .setColor("BLUE")
        let msg = await message.channel.send({embeds: [embed]})
        embed.setDescription(`**Pong!**\nLatency: **\`${msg.createdTimestamp - message.createdTimestamp}ms\`**\nAPI Latency: **\`${Math.round(client.ws.ping)}ms\`**`)
        embed.setColor("GREEN")

        return msg.edit({embeds: [embed]})
        } catch (e) {
            let em = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle("Error!")
            .setDescription(`${e}`)
            .setTimestamp()
            .setFooter({text: "Please report this to GgBiscuit#9111 if you think this is a bug.", iconURL: client.user.displayAvatarURL()})
            console.log(`Error! \n${e}`)
           return message.reply({embeds: [em]})
        }
    }
}