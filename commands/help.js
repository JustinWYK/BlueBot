const Discord = require("discord.js");
const config = require("../config.json");

module.exports = {
    name: "help",
    aliases: [],
    desc: "Returns a list with all the commands.",
    usage: "help [command]",
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
            if(args[0]){
                //search the command
                let command = client.commands.get(args[0]) || client.commands.find(cmd => cmd.aliases.includes(args[0]));
                //if the command doesn't exist, try to find a similar one like did you mean help instead of hell?
                if(!command){
                    let similar = client.commands.filter(cmd => cmd.name.includes(args[0]) || cmd.aliases.includes(args[0]));
                    if(similar.size == 1){
                        command = similar.first();
                    }
                        let embed = new Discord.MessageEmbed()
                        .setColor("RED")
                        .setTitle(`Command ${args[0].toUpperCase()} not found`)
                        .setDescription(`😵 **Oops!** Command not found! ${similar.size === 1 ? `Did you mean **${command.name}**?` : "Please try again."}`)
                        .setTimestamp()
                        .setFooter({text: message.author.tag, iconURL: message.author.displayAvatarURL()})
                        return message.reply({embeds: [embed]})
                    

                } else {
                    let embed = new Discord.MessageEmbed()
                    .setTitle(`${command.name}`)
                    .setDescription(`**Description**: ${command.desc}${command.usage.length > 0 ? `\n\n**Usage**: ${config.prefix}${command.usage}` : ""}${command.aliases.length > 0 ? `\n\n**Aliases**: ${command.aliases}` : ""}\n\n\n{} : Required\n[] : Optional`)
                    
                    .setColor("RANDOM")
                    .setTimestamp()
                    .setFooter({text: message.author.tag, iconURL: message.author.displayAvatarURL()})
                    return message.reply({embeds: [embed]})
                }

            } else {
            let embed = new Discord.MessageEmbed()
            .setTitle("Command List")
            .setDescription("Here is a list of all the commands you can use.")
            .setColor("BLUE")
            .setTimestamp()
            .setFooter({text: message.author.tag, iconURL: message.author.displayAvatarURL()})
            client.commands.forEach(cmd => {
                embed.addField(`${cmd.name}`, `${cmd.desc}`, true)
            })
                return message.reply({embeds: [embed]})
        }
           }   catch (e) {
            let em = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle("Error!")
            .setDescription(`${e}`)
            .setTimestamp()
            .setFooter({text: "Please report this to GgBiscuit#9111", iconURL: message.author.displayAvatarURL()})
            console.log(`Error! \n${e}`)
           return message.reply({embeds: [em]})
        }
       
        }
}