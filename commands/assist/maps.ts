import * as Commando from 'discord.js-commando';
import { Message, MessageEmbed } from 'discord.js';
import * as _ from 'lodash';
const request = require('request');

module.exports = class MapGuides extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'maps',
            group: 'assist',
            memberName: 'maps',
            description: 'Sends message with map guides',
            guildOnly: false,
            throttling: {
                usages: 1,
                duration: 1
            }
        });
    }
    async run(message) {
        let mapEmbed: MessageEmbed = new MessageEmbed()
            .setFooter("daniel11420/crewmate")
            .setTitle("Map Guides");
        config.maps.forEach(map => {
            mapEmbed.addField(`${map.emoji} ${map.displayname}`, `[Guide](${map.image}) (by ${map.author})`, true)
        });
        return message.channel.send(mapEmbed)
    }
}