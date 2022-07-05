const Discord = require("discord.js");
module.exports = {
    name: "placeholder",
    aliases: [],
    desc: "amogus",
    usage: "You can't use this no balls",
        /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {String[]} args 
     * @returns 
     */
    async execute(client,message,args) {
        try{
             
            if(message.author.id !== "386490806716071946") return message.reply("You do not have permission to use this command!")
            return message.channel.send("Placeholder")


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