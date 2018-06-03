module.exports = function(message, args) {
  try {
    if (!args[0]) return message.member;
    const tag = message.mentions.members.first();
    if (tag) return tag;
    let mem = args.join(" ").toLowerCase();
    if (args[0].toLowerCase() === 'me') return message.member;
    if (mem.length == 18) {
      try {
        return message.guild.members.get(mem);
      } catch (e) {
        return 'DNE';
      };
    } else try {
      let m = message.guild.members.find(m => m.user.username.toLowerCase().startsWith(mem));
      if (m != null) return m;
      let u = message.guild.members.find(m => m.nickname ? m.nickname.toLowerCase().startsWith(mem) : null);
      if (u != null) return u;
      return 'DNE';
    } catch (e) {
      return 'ERROR';
    };
  } catch (e) {
    throw 'DNE';
  };
};
