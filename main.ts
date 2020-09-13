import * as Discord from 'discord.js';
import * as Commando from 'discord.js-commando';
import * as path from 'path';
import * as sqlite3 from 'sqlite3';
import * as sqlite from 'sqlite';
import { table } from 'table';
import * as figlet from 'figlet';
import * as package_json from './package.json';
let name = package_json.name;

let client: Commando.CommandoClient;
client = new Commando.CommandoClient(
    {
        owner: config.owner,
        commandPrefix: config.prefix,
        nonCommandEditable: false
    }
);

client.setProvider(
    sqlite.open({
        filename: path.join(__dirname, 'local/settings.sqlite3'),
        driver: sqlite3.Database
    }).then(db => new Commando.SQLiteProvider(db))
).catch(console.error);

client.on('ready', async () => {
    await client.user.setActivity(config.activity.text, {type: config.activity.type}) // Setting the activity
        .then(presence => console.log(`Activity set successfully: ${presence.activities[0].type} ${presence.activities[0].name}`)) // Log activity
        .catch(console.error);
    
    //console.log(`Bot-ts is ready.\nHelp: ${config.prefix}help\nAccount: ${client.user.tag}\nCopyright daniel11420 © 2020.\nSee license in LICENSE.`);
    // Logging basic info
    console.log(figlet.textSync(name));
    console.log(package_json.description);
    console.log(table([
        ['Account', client.user.tag],
        ['Activity', `${config.activity.type} ${config.activity.text}`],
        ['Help (Default)', `${config.prefix}help`],
        [`${name} info`, `${name} version ${package_json.version}\n${package_json.license}\nCopyright ${package_json.author} (c) 2020`]
    ]));
});

client.registry
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, 'commands'))
    .unknownCommand = null;

client.login(config.token)