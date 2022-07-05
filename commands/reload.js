const Discord = require("discord.js");
const fs = require("fs");
module.exports = {
    name: "reload",
    aliases: ["r"],
    desc: "Reloads a command",
    usage: "reload {command}",
        /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {String[]} args 
     * @returns 
     */
    async execute(client,message,args) {
        try{
            if (message.channel.id !== "962377198315130941" && message.guild.id !== "867743161208143884" && message.channel.type !== "GUILD_PUBLIC_THREAD") {
                if (message.author.id !== "406811978762551298" && message.author.id !== "386490806716071946") {

                    return message.reply(`Hey ${message.author.username}! I can't help you here, please use <#962377198315130941>. BlueTheSniper checks all messages there so he can help you look for a build (and to identify missing builds in the database that can be added).`)
                }
            }
            if(message.author.id !== "386490806716071946") return message.reply(`You don't have perms to use this command.`);
            if(!args[0]) return message.reply(`Please specify a command to reload.`);
            if(args[0] === "all"){
                client.commands.forEach(cmd => {
                    try{
                    delete require.cache[require.resolve(`./${cmd.name}.js`)];
                    } catch (e){
                        console.log(`Error reloading ${cmd.name}\n${e}\n\nCould be a deleted command.`);
                    }
                })
                const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./${file}`);
    client.commands.set(command.name,command);
}
                return message.reply(`Reloaded all commands!`);
            }
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
                delete require.cache[require.resolve(`./${command.name}.js`)];
            args[0] = command.name;
                client.commands.delete(command.name);
                const pull = require(`./${args[0]}.js`);
                client.commands.set(args[0], pull);


                let embed = new Discord.MessageEmbed()
                .setTitle(`${command.name} has been reloaded!`)
                .setDescription(`The changes has been applied.`)
                .setColor("GREEN")
                .setTimestamp()
                .setFooter({text: message.author.tag, iconURL: message.author.displayAvatarURL()})
                return message.reply({embeds: [embed]})


            }




        } catch (e) {
            let em = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle("Error!")
            .setDescription(`${e}`)
            .setTimestamp()
            .setFooter({text: "Please report this to GgBiscuit#9111 if you think this is a bug."})
            console.log(`Error! \n${e}`)
           return message.reply({embeds: [em]})
        }
    }
}