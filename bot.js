process.on("uncaughtException", console.error)
process.on("unhandledRejection", console.error)
const fs = require("fs")
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const config = require("./config.json")
let blueBypass = false
const Discord = require("discord.js")

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILD_WEBHOOKS, Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });


client.on("error", console.error)
client.on("threadDelete", async () => {
    async function check(){
        await delay(1000)
        let msg = await client.channels.cache.get("963507797771845642").messages.fetch(`965804653331771392`)
        let channel = JSON.parse(JSON.stringify(await client.channels.cache.get("963507797771845642").threads.fetch()))
            //sort channel by most recent
            for(var i = 0; i !== channel.threads.length; i++){
                channel.threads[i].lastMessage = await client.channels.cache.get(channel.threads[i].id).messages.fetch(channel.threads[i].lastMessageId)
                
            }
            channel.threads.sort((a, b) => b.lastMessage.createdTimestamp - a.lastMessage.createdTimestamp)
            //only keep the top 5
            channel.threads = channel.threads.slice(0, 10)
    
        let string = ``
        for(var i = 0; i !== channel.threads.length; i++){
            string += `- <#${channel.threads[i].id}> <t:${(channel.threads[i].lastMessage.createdTimestamp/ 1000).toFixed(0)}:R>\n`
        }
        if(string.length === 0) string = "No threads!"
        
    
        let embed = new Discord.MessageEmbed()
        .setTitle("Builds Discussion")
        .setDescription(`${string}`)
        .setColor("BLUE")
        .setFooter({text: `Last updated`})
        .setTimestamp()
        msg.edit({content: "Please click on one of the threads to view the discussion",embeds: [embed]})
        
    
     }
     check()
})
client.on("ready", async () => {
    async function check(){
        await delay(1000)
        let msg = await client.channels.cache.get("963507797771845642").messages.fetch(`965804653331771392`)
        let channel = JSON.parse(JSON.stringify(await client.channels.cache.get("963507797771845642").threads.fetch()))
            //sort channel by most recent
            for(var i = 0; i !== channel.threads.length; i++){
                channel.threads[i].lastMessage = await client.channels.cache.get(channel.threads[i].id).messages.fetch(channel.threads[i].lastMessageId)
                
            }
            channel.threads.sort((a, b) => b.lastMessage.createdTimestamp - a.lastMessage.createdTimestamp)
            //only keep the top 5
            channel.threads = channel.threads.slice(0, 10)
    
        let string = ``
        for(var i = 0; i !== channel.threads.length; i++){
            string += `- <#${channel.threads[i].id}> <t:${(channel.threads[i].lastMessage.createdTimestamp/ 1000).toFixed(0)}:R>\n`
        }
        if(string.length === 0) string = "No threads!"
        
    
        let embed = new Discord.MessageEmbed()
        .setTitle("Builds Discussion")
        .setDescription(`${string}`)
        .setColor("BLUE")
        .setFooter({text: `Last updated`})
        .setTimestamp()
        msg.edit({content: "Please click on one of the threads to view the discussion",embeds: [embed]})
        
    
     }
     async function nosystem(){
         try{
        const filter = (msg) => msg.system 
        let msg = await client.channels.cache.get("963507797771845642").messages.fetch()
        msg = msg.filter(filter)
        //delete all messages
        msg.forEach(async (m) => {
            await m.delete()
        }
        )
    } catch (e){

    }
    }
     check()
     nosystem()
        setInterval(check, 20000)
        setInterval(nosystem, 20000)


    // First parameter needs to be a discord.js channel object
    // Second parameter is a optional set of options.

    console.log(`${client.user.tag}`)
    client.user.setActivity(`with builds || ${config.prefix}help `, { type: "PLAYING" });

})
client.on("threadCreate", async () => {
    async function check(){
        await delay(1000)
        let msg = await client.channels.cache.get("963507797771845642").messages.fetch(`965804653331771392`)
         let channel = JSON.parse(JSON.stringify(await client.channels.cache.get("963507797771845642").threads.fetch()))
            //sort channel by most recent
            for(var i = 0; i !== channel.threads.length; i++){
                channel.threads[i].lastMessage = await client.channels.cache.get(channel.threads[i].id).messages.fetch(channel.threads[i].lastMessageId)
                
            }
            channel.threads.sort((a, b) => b.lastMessage.createdTimestamp - a.lastMessage.createdTimestamp)
            //only keep the top 5
            channel.threads = channel.threads.slice(0, 10)
    
        let string = ``
        for(var i = 0; i !== channel.threads.length; i++){
            string += `- <#${channel.threads[i].id}> <t:${(channel.threads[i].lastMessage.createdTimestamp/ 1000).toFixed(0)}:R>\n`
        }
        if(string.length === 0) string = "No threads!"
        
    
        let embed = new Discord.MessageEmbed()
        .setTitle("Builds Discussion")
        .setDescription(`${string}`)
        .setColor("BLUE")
        .setFooter({text: `Last updated`})
        .setTimestamp()
        msg.edit({content: "Please click on one of the threads to view the discussion",embeds: [embed]})
        
    
     }

     check()
     async function nosystem(){
        try{
       const filter = (msg) => msg.system 
       let msg = await client.channels.cache.get("963507797771845642").messages.fetch()
       msg = msg.filter(filter)
       //delete all messages
       msg.forEach(async (m) => {
           await m.delete()
       }
       )
   } catch (e){

   }
   }
   nosystem()
})
client.on('threadUpdate', async () => {
    async function check(){
        await delay(1000)
        let msg = await client.channels.cache.get("963507797771845642").messages.fetch(`965804653331771392`)
        let channel = JSON.parse(JSON.stringify(await client.channels.cache.get("963507797771845642").threads.fetch()))
            //sort channel by most recent
            for(var i = 0; i !== channel.threads.length; i++){
                channel.threads[i].lastMessage = await client.channels.cache.get(channel.threads[i].id).messages.fetch(channel.threads[i].lastMessageId)
                
            }
            channel.threads.sort((a, b) => b.lastMessage.createdTimestamp - a.lastMessage.createdTimestamp)
            //only keep the top 5
            channel.threads = channel.threads.slice(0, 10)
    
        let string = ``
        for(var i = 0; i !== channel.threads.length; i++){
            string += `- <#${channel.threads[i].id}> <t:${(channel.threads[i].lastMessage.createdTimestamp/ 1000).toFixed(0)}:R>\n`
        }
        if(string.length === 0) string = "No threads!"
        
    
        let embed = new Discord.MessageEmbed()
        .setTitle("Builds Discussion")
        .setDescription(`${string}`)
        .setColor("BLUE")
        .setFooter({text: `Last updated`})
        .setTimestamp()
        msg.edit({content: "Please click on one of the threads to view the discussion",embeds: [embed]})
        
    
     }
})
client.commands = new Discord.Collection()

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
  
    const command = require(`./commands/${file}`);
    console.log(command.name)
    client.commands.set(command.name,command);
    //check if the command is already in temp folder
  

}

client.on("messageCreate", async message => {
    
    if(message.author.bot) return;
    if(!message.guild) return;
    if(message.channel.id === "870469583469957201"){
        if(message.content.toLowerCase().startsWith("!suggest")){
            let suggestion = message.content.replace("!suggest", "")
            if(suggestion.length < 2){
               let msg = await message.reply("Please enter a suggestion")

            await delay(4000)
            await msg.delete()
            return message.delete();
            }
            message.delete()
            let embed = new Discord.MessageEmbed()
            .setTitle("Suggestion from " + message.author.tag)
            .setDescription(suggestion)
            .setColor("#333afc")
            .setFooter({text: `Suggested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL()})
            .setTimestamp()
            let msg = await client.channels.cache.get("870469583469957201").send({embeds: [embed]})
            await msg.react("🔼")
            return msg.react("🔽");
            

        }
    }
    
    if(message.channel.id === "963507797771845642"){
       
        if(message.author.id === "406811978762551298" || message.author.id === "386490806716071946") {
           
                if(message.content.toLowerCase().includes("!bypass")){
                    blueBypass = true;
                    let msg = await message.reply("The next message will be bypassed. This message will be deleted after you send your message or when you cancel the bypass by typing \`cancel\` (doesn't matter if you use caps or not)");
                    let collector = message.channel.createMessageCollector(m => m.author.id === message.author.id)
                    collector.on("collect", async m => {
                        if(m.content.toLowerCase() === "cancel"){
                            blueBypass = false;
                            await msg.delete()
                            await m.delete()
                            await message.delete()
                            return collector.stop()

                        }
                        blueBypass = false;
                        await message.delete()
                        await msg.delete()
                        return collector.stop();
                    })
                    return;
                }
                if(blueBypass === true) return;
            }
            
        const delay = ms => new Promise(res => setTimeout(res, ms));
        const channel = client.channels.cache.get("963507797771845642");
        
        
        var expression = /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi;
        var links = message.content.match(expression);
        let l = ``
        if(links){
            let name = false;
             
            for(var link = 0; link !== links.length; link++){
                if(links.length !== 1){

                    if(links[link].includes("youtube")){
                        l += `**[Youtube Video](${links[link]})**\n`
                    } else {
                   l += `**[Build #0${link+1}](${links[link]})**\n`
                    }
                   } else {
                       l = `**[Build](${links[link]})**\n`
                   }

            }
            let clear = message.content.replace(expression, "").replaceAll("*", "")
            if(clear.length === 0){
                clear = `No Description`
            }
            if(clear.replaceAll(" ", "").length === 0){
                clear = `No Description`

            }
            if(clear.replaceAll("\n", "").length === 0){
                clear = `No Description`

            }
            
          let thread = await  channel.threads.create(
                {
                    name: `- ${message.author.tag}`,
                    autoArchiveDuration: "MAX"

                })
               
            let embed = new Discord.MessageEmbed()
            .setTitle(`${message.author.tag}'s Build`)
            .setColor("#333afc")
            .addField(clear, l)
            .addField(`Live Reaction has been removed!`, `Please use the reactions to vote on the build!`)
            .setFooter({text: `Message sent by ${message.author.tag}, Please vote down below.`, iconURL: message.author.displayAvatarURL()})
            .setTimestamp();
            await thread.send(`**<@${message.author.id}>**:\n${message.content}`)
            
            let msg = await thread.send({content: `<@&929867712606388274>`,embeds: [embed]})
            let mg = await thread.send(`<@${message.author.id}>,\nPlease provide a name for your build by typing \`!name <name>\`. \nYou can only do this once.`)
            msg.pin()
            message.delete()
            await msg.react(`🔼`)
            await msg.react(`🔽`)
            
            const filter = (reaction, user) => {
                return ['🔼', '🔽'].includes(reaction.emoji.name) && user.id !== client.user.id;
            }
            const fill = (user) => user.id !== client.user.id;
            let collector = msg.createReactionCollector({filter, dispose: true})
            let collect = msg.channel.createMessageCollector({filter: fill})

            collector.on("collect", async (reaction,user) => {
                //check if user has role 929867712606388274
                if(!client.guilds.cache.get("696616686928920598").members.cache.get(user.id).roles.cache.has("929867712606388274"))return reaction.users.remove(user)
                
            })

            collect.on("collect", async (m) => {
                if(m.content.toLowerCase() === "!closevote" || m.content.toLowerCase() === "!close"){
                    if(m.author.id === "386490806716071946" || m.author.id === "406811978762551298"){
               
                   return collector.stop()
                    }

                }
                const args = m.content.slice("!".length).trim().split(/ +/g)
                const command = args.shift().toLowerCase();
                if(command === "name"){
                    
                    if(m.author.id === message.author.id){
                    if(name === true) return m.reply(`You already provided a name.`).then(async m => {await delay(3000); m.delete()})
   
                        if(args.length > 0){
                        name = true
                         thread.setName(`${args.join(" ")} - ${message.author.tag}`)
                         return mg.edit(`<@${message.author.id}>, your can no longer change the name of your build.\n\nBlue can type \`!closevote\` or \`!close\` to stop the vote or \`!archive\` or \`!delete\` to DELETE the thread.`)
                        }
                    
                    } else return m.reply(`You don't have permission to do this.`).then(async m => {await delay(3000); m.delete()})
                }
                if(m.content.toLowerCase() === "!archive" || m.content.toLowerCase() === "!delete"){
                    
                    if(m.author.id === "386490806716071946" || m.author.id === "406811978762551298"){
                        if(collector.ended === false){
                            collector.stop()
                        }
                        await delay(3000)
                        
                     collect.stop()
                     return thread.delete()


                    }
                }
            })
            collector.on("end", async (collected) => {
                let embed = new Discord.MessageEmbed()
                .setTitle("Results")
                .setColor("#333afc")
                .addField(`${collected.size} votes were casted!`, `\`${msg.reactions.cache.get("🔼").count-1} 🔼\`    \`${msg.reactions.cache.get("🔽").count-1} 🔽\``)
                .setFooter({text: `This thread can now be archived with !archive.`, iconURL: message.author.displayAvatarURL()})
                    .setTimestamp()       
                return thread.send({embeds: [embed]})

            })
        } else return message.reply(`That message does not contain any links!`).then(async m =>{
            await delay(3000).then(() => { 
            m.delete()
            message.delete()
        })})

    }
    if(!message.content.startsWith(config.prefix)) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(client.commands.has(command) || client.commands.find(cmd => cmd.aliases.includes(command))) {
    //aliaes
    let cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases.includes(command));

    try{
      
        cmd.execute(client,message,args)
    } catch (e) {
        let em = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle("Error!")
        .setDescription(e)
        .setTimestamp()
        .setFooter("Please report this to GgBiscuit#9111 if you think this is a bug.")
        console.log(`Error! \n${e}`)
       return message.reply({embeds: [em]})
    }
} else return;
})

client.login(config.token)