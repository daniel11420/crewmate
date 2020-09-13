import * as Commando from 'discord.js-commando';
import { Message, MessageEmbed } from 'discord.js';
import * as _ from 'lodash';
const request = require('request');

module.exports = class WikiLookup extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'wiki',
            group: 'assist',
            memberName: 'wiki',
            description: 'Finds something on the Among Us wiki',
            guildOnly: false,
            args: [
                {
                    key: 'article',
                    prompt: 'What to search for?',
                    type: 'string'
                }
            ],
            throttling: {
                usages: 1,
                duration: 10
            }
        });
    }
    async run(message, { article }) {
        let parsedArticle: string = _.trim(article);
        parsedArticle.split(' ').join('_');
        let toReturn;
        await request.get(`https://among-us-wiki.fandom.com/api/v1/Articles/Details?titles=${parsedArticle}`, { json: true }, function(err, res, body) {
            if (err) { toReturn = message.reply(`An error has occured: ${err}`); } else
            if (Object.keys(body.items).length === 0) { toReturn = message.reply(`Wiki article not found.`); } else {
                let embed = new MessageEmbed();
                embed.setTitle(body.items[Object.keys(body.items)[0]].title);
                embed.setFooter("from among-us-wiki@fandom");
                embed.setDescription(`${body.items[Object.keys(body.items)[0]].abstract}
                    
                [Read More](${body.basepath}${body.items[Object.keys(body.items)[0]].url})`);
                embed.setImage(body.items[Object.keys(body.items)[0]].thumbnail);
                toReturn = message.channel.send(`<@${message.author.id}>`, embed);
            }
            
        });

        return toReturn;
    }
}