const { Client } = require("discord.js")
const { slashCommands } = require("..");
const LoadFiles = require("../function/LoadFiles");

/**
 *
 * @param {Client} client
 */
module.exports = async function loadSlashCommands(client) {
  await slashCommands.clear();

  let commandsArray = [];

  const Files = await LoadFiles("slashCommands");

  Files.foreach((files) => {
    const commands = require(files);
    slashCommands.set(commands.name, commands);
    commandsArray.push(commands);
  });

  client.application.commands
    .set(commandsArray)
    .catch((e) => {
      console.log(e);
    })
    .then(() => {
      console.log("Slash Commands Loaded");
    });
}
