
const fetchAll = require('discord-fetch-all');
const delay = (ms) => new Promise(res => setTimeout(res, ms));
const Discord = require("discord.js");
module.exports = {
    name: "search",
    aliases: ["s"],
    desc: "Search for a build, returns a list of builds sorted by the most recent edited/created. (Timestamp is last edited/created)",
    usage: "search {class} {query/build name (case insenstivie)}",
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
                if(!args[0]) return message.reply(`Please input a class in the command!`);
                args[0] = args[0].toLowerCase()
                if(args[0] === "warrior" || args[0] === "wa" || args[0] === "w" || args[0] === "mage" || args[0] === "m" ||args[0] === "ma" || args[0] === "archer" || args[0] === "ar" || args[0] === "assassin" || args[0] === "as" || args[0] === "shaman" || args[0] === "sh" || args[0] === "s"){
                if(!args[1])return message.reply(`Please input something to search for!`);
                async function search(category){
                    
                    args.shift()
                    let classes
                    if(category.toLowerCase() === "warrior"){
                    classes = client.channels.cache.get("700427329825931303")
                    } else if(category.toLowerCase() === "mage"){
                    classes = client.channels.cache.get("700427362852012135")
                    } else if(category.toLowerCase() === "archer"){
                    classes = client.channels.cache.get("700427281121804380")
                    } else if(category.toLowerCase() === "assassin"){
                    classes = client.channels.cache.get("700427303087374396")
                    } else if(category.toLowerCase() === "shaman"){
                    classes = client.channels.cache.get("700427385492996106")
                    }
                   let messages = await fetchAll.messages(classes)
                  
                    //join the args
                    // let search = args.join(" ")
                    // //search the messages for the query
                    // let found = messages.filter(m => m.content.toLowerCase().includes(search.toLowerCase()))
                    // found is an array of messages that checks for
                    let code = ``
                    for(var i in args){
                        args[i] = args[i].toLowerCase()
                        if(args.indexOf(args[i]) === args.length - 1){
                            code += `m.content.toLowerCase().includes('${args[i]}')`
                        } else {
                        code += `m.content.toLowerCase().includes('${args[i]}') &&`
                        }
                    }

                    let found = messages.filter(m => eval(code))
                
                    //sort messages by timestamp high to low

                    found.sort((a, b) => {
                        if (a.editedTimestamp > b.editedTimestamp) return -1;
                        if (a.editedTimestamp < b.editedTimestamp) return 1;
                        return 0;
                    })
                    

                    // let found = messages.filter(m => {
                    //     let content = m.content.toLowerCase()
                    //     for(var i in args){
                    //         if(!content.includes(args[i])){
                    //             return false
                    //         }
                    //     }
                    //     return true
                    // })





                    //if no results, return
                    let embed = new Discord.MessageEmbed()
                    //reverse the array so the most recent is first
                    if(found.length == 0) return message.reply({embeds: [embed.setDescription(`No results found for \`${args.join(" ")}\` in ${category.toLowerCase()}\nMaybe try using full form instead of abbreviation (eg. tstack to tierstack/olily to orange lily)?\n\n(We recommend you to search like this "b!search <class> <playstyle> <weapon>" for example b!search <ar> <spellspam> <spring>)`).setColor("RED").setTimestamp().setFooter({text: message.author.tag, iconURL: message.author.displayAvatarURL()})]})

         
                        if(found.length <= 5){
                        embed.setTitle(`Found ${found.length} builds with the query \`${args.join(" ")}\``)
                        embed.setDescription(`Category: **\`${category}\`**`)
                        embed.setColor("BLUE")
                        embed.setTimestamp()
                        embed.setFooter({text: `${message.author.tag} || Didn't find what you were looking for? Contact BlueTheSniper#7295`, iconURL: message.author.displayAvatarURL()})

                        found.forEach(m => {
                            
                            var expression = /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi;
                            let links = m.content.match(expression)
                            let l = ""
                            //replace all the links with nothing
                            let clear = m.content.replace(expression, "").replaceAll("*", "")
                                        if(clear.includes("(By ")){
                                clear = clear.replace(/\(By .*?\)/g, "")
                            }
                          //check if there are custom emojis that doesn't belong to 696616686928920598 server
                            let emojis = m.content.match(/<a?:.*?:.*?>/g)
                            if(emojis){
                                emojis.forEach(e => {
                                    //get id of the emoji (its number)
                                    let id = e.match(/\d+/g)

                                    let em = client.emojis.cache.get(id[0])

                                    if(!em){
                                        //make the string turn from <:mythic_boots:868979987783487579> to mythic_boots
                                        //replace 0-9 with nothing

                                        let name = `(${e.replaceAll(":", "").replace("<", "").replace(">", "").replace(/\d/g, "")})`
                                        clear = clear.replace(e, name)

                                    }
                                })
                            }




                            for(var link = 0; link !== links.length; link++){
                                if(links.length !== 1){

                                    if(links[link].includes("youtu")){
                                        l += `**[Youtube Video](${links[link]})**\n`
                                    } else {
                                   l += `**[Build #0${link+1}](${links[link]})**\n`
                                    }
                                   } else {
                                       l = `**[Build](${links[link]})**\n`
                                   }
                            }
                            //check if clear is more than 200 letters, if so split it into 2 embeds
                            if(clear.length > 200){
                                let split = clear.split(" ")
                                let first = ""

                                for(var i = 0; i !== split.length; i++){
                                    if(first.length + split[i].length < 200){
                                        first += `${split[i]} `
                                    } else break;
                                }
                                embed.addField(`${first}...<t:${m.editedTimestamp !== null ? (m.editedTimestamp/1000).toFixed(0) : (m.createdTimestamp/1000).toFixed(0)}:f>`, `${l}`)

                            } else {

                            embed.addField(`${clear}<t:${m.editedTimestamp !== null ? (m.editedTimestamp/1000).toFixed(0) : (m.createdTimestamp/1000).toFixed(0)}:f>\n`, `${l}`)
                            }
                        })
                        message.reply({embeds: [embed]})

                        } else {

                            let sliced = []
                            let page = 1
                            let arraypage = 0
                            //for every 5 results, create a new embed
                                let embed = new Discord.MessageEmbed()
                                .setTitle(`Found ${found.length} builds with the query \`${args.join(" ")}\``)
                                .setDescription(`Category: **\`${category}\`**`)
                                .setColor("BLUE")
                                .setTimestamp()
                                
                                for (let i = 0; i < found.length; i += 5) {
                                    const chunk = found.slice(i, i + 5);
                                  sliced.push(chunk)
                                    // do whatever
                                }
                                embed.setFooter({text: `${page}/${sliced.length} page`, iconURL: message.author.displayAvatarURL()})
                                sliced[arraypage].forEach(m => {
                                    var expression = /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi;
                                    let links = m.content.match(expression)
                                    let l = ""
                                    //replace all the links with nothing
                                    let clear = m.content.replace(expression, "").replaceAll("*", "")
                                                if(clear.includes("(By ")){
                                        clear = clear.replace(/\(By .*?\)/g, "")
                                    }
                                  //check if there are custom emojis that doesn't belong to 696616686928920598 server
                                    let emojis = m.content.match(/<a?:.*?:.*?>/g)
                                    if(emojis){
                                        emojis.forEach(e => {
                                            //get id of the emoji (its number)
                                            let id = e.match(/\d+/g)

                                            let em = client.emojis.cache.get(id[0])

                                            if(!em){
                                                //make the string turn from <:mythic_boots:868979987783487579> to mythic_boots
                                                //replace 0-9 with nothing

                                                let name = `(${e.replaceAll(":", "").replace("<", "").replace(">", "").replace(/\d/g, "")})`
                                                clear = clear.replace(e, name)

                                            }
                                        })
                                    }
                                    
                            for(var link = 0; link !== links.length; link++){
                                if(links.length !== 1){

                                    if(links[link].includes("youtu")){
                                        l += `**[Youtube Video](${links[link]})**\n`
                                    } else {
                                   l += `**[Build #0${link+1}](${links[link]})**\n`
                                    }
                                   } else {
                                       l = `**[Build](${links[link]})**\n`
                                   }
                            }
                            
                            if(clear.length > 200){
                                let split = clear.split(" ")
                                let first = ""

                                for(var i = 0; i !== split.length; i++){
                                    if(first.length + split[i].length < 200){
                                        first += `${split[i]} `
                                    } else break;
                                }
                                embed.addField(`${first}...<t:${m.editedTimestamp !== null ? (m.editedTimestamp/1000).toFixed(0) : (m.createdTimestamp/1000).toFixed(0)}:f>`, `${l}`)

                            } else {
                                    embed.addField(`${clear}<t:${m.editedTimestamp !== null ? (m.editedTimestamp/1000).toFixed(0) : (m.createdTimestamp/1000).toFixed(0)}:f>\n`, `${l}`)
                            }
                                })


                                let msg = await message.reply({embeds: [embed]})
                                await msg.react("⬅️")
                                await msg.react("➡️")


                                const filter = (reaction, user) => ["➡️","⬅️"].includes(reaction.emoji.name) && user.id === message.author.id;

                                let collector = msg.createReactionCollector(filter, {time: 90000})

                                collector.on("collect", async (reaction, user) => {
                                    if(user.id !== message.author.id) return;
                                    if(user.bot) return;
                            if(reaction.emoji.name === "➡️"){
                                        reaction.users.remove(user)
                                        if(arraypage !== sliced.length - 1){ 
                                            arraypage++
                                            page++
                                            embed.fields = []
                                            sliced[arraypage].forEach(m => {
                                                var expression = /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi;
                                                let links = m.content.match(expression)
                                                let l = ""
                                                //replace all the links with nothing
                                                let clear = m.content.replace(expression, "").replaceAll("*", "")
                                                            if(clear.includes("(By ")){
                                                    clear = clear.replace(/\(By .*?\)/g, "")
                                                }
                                              //check if there are custom emojis that doesn't belong to 696616686928920598 server
                                                let emojis = m.content.match(/<a?:.*?:.*?>/g)
                                                if(emojis){
                                                    emojis.forEach(e => {
                                                        //get id of the emoji (its number)
                                                        let id = e.match(/\d+/g)

                                                        let em = client.emojis.cache.get(id[0])

                                                        if(!em){
                                                            //make the string turn from <:mythic_boots:868979987783487579> to mythic_boots
                                                            //replace 0-9 with nothing

                                                            let name = `(${e.replaceAll(":", "").replace("<", "").replace(">", "").replace(/\d/g, "")})`
                                                            clear = clear.replace(e, name)

                                                        }
                                                    })
                                                }
                                                
                                            for(var link = 0; link !== links.length; link++){
                                                if(links.length !== 1){

                                                    if(links[link].includes("youtu")){
                                                        l += `**[Youtube Video](${links[link]})**\n`
                                                    } else {
                                                   l += `**[Build #0${link+1}](${links[link]})**\n`
                                                    }
                                                   } else {
                                                       l = `**[Build](${links[link]})**\n`
                                                   }

                                            }
                                            if(clear.length > 200){
                                                let split = clear.split(" ")
                                                let first = ""
                
                                                for(var i = 0; i !== split.length; i++){
                                                    if(first.length + split[i].length < 200){
                                                        first += `${split[i]} `
                                                    } else break;
                                                }
                                                embed.addField(`${first}...<t:${m.editedTimestamp !== null ? (m.editedTimestamp/1000).toFixed(0) : (m.createdTimestamp/1000).toFixed(0)}:f>`, `${l}`)
                
                                            } else {
                                                    embed.addField(`${clear}<t:${m.editedTimestamp !== null ? (m.editedTimestamp/1000).toFixed(0) : (m.createdTimestamp/1000).toFixed(0)}:f>\n`, `${l}`)
                                            }
                                                })
                                                if(sliced.length === page) {
                                                    embed.setFooter({text: `${page}/${sliced.length} page || Didn't find what you were looking for? Contact BlueTheSniper#7295`, iconURL: message.author.displayAvatarURL()})
                                                } else {
                                                                                       embed.setFooter({text: `${page}/${sliced.length} page`, iconURL: message.author.displayAvatarURL()})
                                                }
                                                msg.edit({embeds: [embed]})
                                        }
                                        
                                    } else if(reaction.emoji.name === "⬅️"){
                                        reaction.users.remove(user)
                                        if(arraypage !== 0){ 
                                            arraypage--
                                            page--
                                            embed.fields = []
                                            sliced[arraypage].forEach(m => {
                                                var expression = /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi;
                                                let links = m.content.match(expression)
                                                let l = ""
                                                //replace all the links with nothing
                                                let clear = m.content.replace(expression, "").replaceAll("*", "")
                                                            if(clear.includes("(By ")){
                                                    clear = clear.replace(/\(By .*?\)/g, "")
                                                }
                                              //check if there are custom emojis that doesn't belong to 696616686928920598 server
                                                let emojis = m.content.match(/<a?:.*?:.*?>/g)
                                                if(emojis){
                                                    emojis.forEach(e => {
                                                        //get id of the emoji (its number)
                                                        let id = e.match(/\d+/g)

                                                        let em = client.emojis.cache.get(id[0])

                                                        if(!em){
                                                            //make the string turn from <:mythic_boots:868979987783487579> to mythic_boots
                                                            //replace 0-9 with nothing

                                                            let name = `(${e.replaceAll(":", "").replace("<", "").replace(">", "").replace(/\d/g, "")})`
                                                            clear = clear.replace(e, name)

                                                        }
                                                    })
                                                }
                                                
                                            for(var link = 0; link !== links.length; link++){
                                                if(links.length !== 1){

                                                    if(links[link].includes("youtu")){
                                                        l += `**[Youtube Video](${links[link]})**\n`
                                                    } else {
                                                   l += `**[Build #0${link+1}](${links[link]})**\n`
                                                    }
                                                   } else {
                                                       l = `**[Build](${links[link]})**\n`
                                                   }

                                            }
                                            if(clear.length > 200){
                                                let split = clear.split(" ")
                                                let first = ""
                
                                                for(var i = 0; i !== split.length; i++){
                                                    if(first.length + split[i].length < 200){
                                                        first += `${split[i]} `
                                                    } else break;
                                                }
                                                embed.addField(`${first}...<t:${m.editedTimestamp !== null ? (m.editedTimestamp/1000).toFixed(0) : (m.createdTimestamp/1000).toFixed(0)}:f>`, `${l}`)
                
                                            } else {
                                                    embed.addField(`${clear}<t:${m.editedTimestamp !== null ? (m.editedTimestamp/1000).toFixed(0) : (m.createdTimestamp/1000).toFixed(0)}:f>\n`, `${l}`)
                                            }
                                                })
                              
                                                                                       embed.setFooter({text: `${page}/${sliced.length} page`, iconURL: message.author.displayAvatarURL()})
                                                
                                                msg.edit({embeds: [embed]})
                                        }
                                    }
                                         
                                           

                                })


                            }

                }
                if(args[0] == "warrior" || args[0] == "wa"){
                    search("warrior")
                }else if(args[0] === "archer" || args[0] === "ar"){
                    search("archer")
                } else if(args[0] === "assassin" || args[0] === "as"){
                    search("assassin")
                } else if(args[0] === "mage" || args[0] === "ma"){
                    search("mage")
                } else if(args[0] === "shaman" || args[0] === "sh"){
                    search("shaman")
                }

            } else  return message.reply(`Please input a valid class!\n(warrior/wa) (mage/ma) (archer/ar) (assassin/as) (shaman/sh)`);
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