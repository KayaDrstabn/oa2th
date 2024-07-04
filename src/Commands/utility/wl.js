const { WL } = require('../../Models/index');
const { addWL, removeWL } = require('../../Structures/Functions')

module.exports = {
	name: 'wl',
	category: 'Utility',
	ownerOnly: true,
	run: async (client, message, args) => {

		if(!args[0] || !["add", "remove", "list"].includes(args[0])) return message.channel.send('Spécifiez (add/remove/list)');

		const whitelistUser = message.mentions.users.first() || await client.users.fetch(args[1]).catch(() => null);
		if(!whitelistUser && args[0] !== "list") return message.reply("Utilisateur invalide");

		if(whitelistUser) wlData = await WL.findOne({ id: whitelistUser.id });

		switch (args[0]) {

			case "list": {
				const list = await WL.find({});
				message.channel.send(`Utilisateurs WL : \n${list.map(l => `<@${l.id}>`).join('\n')}`)
				break;
			}


			case "add": {
				if(wlData) return message.reply("Utilisateur déjà whitelist");
				addWL(whitelistUser);
				message.channel.send("Utilisateur ajouté de la whitelist")
				break;
			}

			case "remove": {
				if(!wlData) return message.reply("Utilisateur n'est pas whitelist");
				removeWL(whitelistUser);
				message.channel.send("Utilisateur retiré de la whitelist")
				break;
			}
		}

	}
}