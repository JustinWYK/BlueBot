const Discord = require("discord.js");
module.exports = {
    name: "activity",
    aliases: [],
    desc: "Sets the bot's activity.",
    usage: "activity [type] [activity]",
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
                if(message.author.id !== "386490806716071946") return;

                if(!args[0]) return message.reply(`No args 0 given!`)
                //check if args0 is a type of activity
                args[0] = args[0].toUpperCase()
                if(args[0] !== "WATCHING" && args[0] !== "PLAYING" && args[0] !== "LISTENING" && args[0] !== "STREAMING") return message.reply(`Invalid activity type!`)
                if(!args[1]) return message.reply(`No args 1 given!`)
                let args2 = args.slice(1).join(" ")
                client.user.setActivity({name: args2, type: args[0]})
                return message.reply(`Activity set to **\`${args[0]} ${args2}\`**`)
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