module.exports = async function(client, text) {
  if (text && text.constructor.name == "Promise")
    text = await text;
  if (typeof evaled !== "string") text = require("util").inspect(text, {
    depth: 0
  });
  let token = "mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0";
  text = text
    .replace(/`/g, "`" + String.fromCharCode(8203))
    .replace(/@/g, "@" + String.fromCharCode(8203))
    .replace(client.token, token)
    .replace('client.token', token);
  return text;
};
