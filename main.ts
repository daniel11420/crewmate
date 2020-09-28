import * as Discord from 'discord.js';
import * as Commando from 'discord.js-commando';
import * as path from 'path';
import * as sqlite3 from 'sqlite3';
import * as sqlite from 'sqlite';
import { table } from 'table';
import * as figlet from 'figlet';
import * as package_json from './package.json';
import * as _ from 'lodash';
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
    
    console.log(figlet.textSync(name));
    console.log(package_json.description);
    console.log(table([
        ['Account', client.user.tag],
        ['Activity', `${config.activity.type} ${config.activity.text}`],
        ['Help (Default)', `${config.prefix}help`],
        [`${name} info`, `${name} version ${package_json.version}\n${package_json.license}, by ${package_json.author}`]
    ]));
});

client.on("guildCreate", guild => {
    if (config.joinNotifs == true) client.users.cache.get(config.owner).send(`Joined guild ${guild.name}`);
});

client.on("guildDelete", guild => {
    if (config.joinNotifs == true) client.users.cache.get(config.owner).send(`Left guild ${guild.name}`);
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['assist', 'Assist']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands({help: false})
    .registerCommandsIn(path.join(__dirname, 'commands'))
    .unknownCommand = null;

client.login(config.token)