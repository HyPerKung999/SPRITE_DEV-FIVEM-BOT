const { Client } = require("discord.js");
const { events } = require("..");
const LoadFiles = require("../function/LoadFiles");

/**
 *
 * @param {Client} client
 */
module.exports = async function loadEvents(client) {
  await events.clear();

  const Files = await LoadFiles("events");

  Files.foreach((files) => {
    const event = require(files);

    const execute = (...args) => event.execute(...args, client);
    event.set(event.name, execute);

    if (event.rest) {
      if (event.once) client.rest.once(event.name, execute);
      else client.rest.on(event.name, execute);
    } else {
      if (event.once) client.on(event.name, execute);
      else client.on(event.name, execute);
    }
  });

  return console.log(`[Loaded Events] ${Files.length} events loaded`);
};