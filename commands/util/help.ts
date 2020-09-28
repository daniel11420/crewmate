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
            "description": "Crewmate is a Discord bot for helping you play Among Us.\nDeveloped by daniel11420.\n\nThis bot is still a work in progress; I am actively making new features,\nand if you'd like to suggest something for me to add, please [DM me (daniel11420#0069)](https://discord.com/users/243472272264921088).\n\n[More Information (readme)](https://github.com/daniel11420/crewmate/blob/master/README.md)\n[Invite the bot here](https://discord.com/api/oauth2/authorize?client_id=754552331797790740&permissions=314368&redirect_uri=https%3A%2F%2Fgithub.com%2Fdaniel11420%2Fcrewmate%2Fwiki%2FThanks-for-inviting-the-bot%21&scope=bot) | [top.gg Page](https://top.gg/bot/754552331797790740)"
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
                "value": "Show help and command list",
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
                "value": "Search for something on the wiki and show a summary",
                "inline": true
              },
              {
                "name": "`maps`",
                "value": "Quick access to map guides",
                "inline": true
              }
            ]
        });
        
        await message.channel.send(about);
        await message.channel.send(meta);
        return message.channel.send(assist);
    }
}