// Config version required:
let required_config_version: number = 1;

// Check if config version correct
let fs = require('fs');
declare var config;
config = fs.readFileSync('./local/config.json');
config = JSON.parse(config);

if (config.config_version == required_config_version) {
    console.log("Config version correct, starting.");
} else {
    console.log("Your configuration file is either too old or missing! Please update it.");
    process.exit();
}

let main = require('./main');