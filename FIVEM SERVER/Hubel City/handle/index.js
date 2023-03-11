const { Client } = require("discord.js");
const { glob } = require("glob");
const { promisify } = require("util");
const { messageCommands, slashCommands } = require("..");
const loadEvents = require("./loadEvents");
const loadSlashCommands = require("./loadSlashCommands");
const proGlob = promisify(glob);

/**
 *
 * @param {Client} client
 */
module.exports = async (client) => {
  const arrayMessageCommands = [];
  console.log(proGlob("./messageCommands/**/*.js"));
  const messageCommand = await proGlob("/messageCommands/**/*.js");

  for (const files of messageCommand) {
    const command = require(`.${files}`);
    arrayMessageCommands.push(command);
    messageCommands.set(command.name, command);
    console.log("[load messageCommands] " + command.name);
  }

  const arraySlashCommands = [];
  const slashCommand = await proGlob("../slashCommands/**/*.js");
  for (const files of slashCommand) {
    const command = require(`.${files}`);
    arraySlashCommands.push(command);
    slashCommands.set(command.name, command);
    console.log("[load slashCommand] " + command.name);
  }

  loadEvents(client);
  client.on("ready", () => {
    client.application.commands
      .set(arraySlashCommands)
      .catch((e) => {
        console.log(e);
      })
      .then(() => {
        console.log("Slash Commands Loaded");
      });
  });
};
