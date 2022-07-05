const Discord = require("discord.js");
const os = require('os');
module.exports = {
    name: "about",
    aliases: ["info", "botinfo"],
    desc: "Returns information about the bot.",
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

            let totalSeconds = (client.uptime / 1000);
let days = Math.floor(totalSeconds / 86400);
totalSeconds %= 86400;
let hours = Math.floor(totalSeconds / 3600);
totalSeconds %= 3600;
let minutes = Math.floor(totalSeconds / 60);
let seconds = Math.floor(totalSeconds % 60);
if(days < 10){
    days = "0" + days
}
if(hours < 10){
    hours = "0" + hours
}
if(minutes < 10){
    minutes = "0" + minutes
}
if(seconds < 10){
    seconds = "0" + seconds
}

let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`

            let embed = new Discord.MessageEmbed()
            .setTitle("About BlueBot")
            .setDescription("A Discord bot written in JavaScript by GgBiscuit#9111.")
            .setThumbnail(client.user.displayAvatarURL())
            .addField("Library used:", `Discord.js ${Discord.version}`)
            .addField("Node.js version:", `${process.version}`)
            .addField("Bot uptime:", `${uptime}`)
            .addField("Memory Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`)
            .addField("Operating System", `${os.platform()}`)            
            .addField("Operating System Release", `${os.release()}`)
            .addField("Operating System Type", `${os.type()}`)
            .addField("Processer Architecture", `${process.arch}`)
            .addField("CPU Speed", `${os.cpus()[0].speed} MHz`)

            .setColor("BLUE")
        
            .setTimestamp()
            .setFooter({text: message.author.tag, iconURL: message.author.displayAvatarURL()})
            return message.reply({embeds: [embed]})



            

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