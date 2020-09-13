import * as Commando from 'discord.js-commando';
import { Message, MessageEmbed } from 'discord.js';
import * as _ from 'lodash';
const request = require('request');

module.exports = class ShowHelp extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'help',
            group: 'util',
            memberName: 'help',
            description: 'Lists all commands & shows info about the bot',
            guildOnly: false,
            throttling: {
                usages: 1,
                duration: 1
            }
        });
    }
    async run(message) {
        let about: MessageEmbed = new MessageEmbed({
            "title": "About Crewmate",
            "description": "Crewmate is a Discord bot for Among Us written by daniel11420.\n\nThis bot is still a work in progress; I am actively making new features,\nand if you'd like to suggest something for me to add, please [DM me](https://discord.com/users/243472272264921088).\n\nAfter I am satisfied with the functionality of the bot, I will make the\ninvite link public so that it can be added to any server. Until then, the\nbot is exclusive to the Weakness Group Chat."
        });

        let meta: MessageEmbed = new MessageEmbed({
            "title": "Meta Commands (groups: `commands`, `utility`)",
            "fields": [
              {
                "name": "`enable` & `disable`",
                "value": "Enable or Disable a command or command group."
              },
              {
                "name": "`prefix`",
                "value": "Check what the current prefix is",
                "inline": true
              },
              {
                "name": "`prefix <value>`",
                "value": "Change prefix in current server",
                "inline": true
              },
              {
                "name": "`ping`",
                "value": "Check bot's connection to Discord servers",
                "inline": true
              },
              {
                "name": "`help`",
                "value": "Show this message",
                "inline": true
              }
            ]
        });

        let assist: MessageEmbed = new MessageEmbed({
            "title": "Among Us (group: `assist`)",
            "footer": {
              "text": "daniel11420/crewmate"
            },
            "fields": [
              {
                "name": "`wiki <value>`",
                "value": "Search for something on the wiki",
                "inline": true
              },
              {
                "name": "`maps`",
                "value": "Show map guides",
                "inline": true
              }
            ]
        });
        
        await message.channel.send(about);
        await message.channel.send(meta);
        return message.channel.send(assist);
    }
}