var version = "1.7.1";
//Version 1.7.1
const axios = require("axios");
const cors = require("cors");
const path = require("path");

axios
	.get("https://raw.githubusercontent.com/TahaGorme/slashy/main/index.js")
	.then(function (response) {
		var d = response.data;
		let v = d.match(/Version [0-9]*\.[0-9]+/)[0]?.replace("Version ", "");
		if (v) {
			console.log("Version " + version);
			if (v !== version) {
				console.log(
					"There is a new version " +
						v +
						" available. Please update. https://github.com/TahaGorme/slashy"
				);
			}
		}
	})
	.catch(function (error) {
		console.log(error);
	});

process.on("unhandledRejection", (reason, p) => {
	const ignoreErrors = [
		"MESSAGE_ID_NOT_FOUND",
		"INTERACTION_TIMEOUT",
		"BUTTON_NOT_FOUND",
	];
	if (ignoreErrors.includes(reason.code)) return;
	console.log(" [Anti Crash] >>  Unhandled Rejection/Catch");
	console.log(reason, p);
});

process.on("uncaughtException", (e, o) => {
	console.log(" [Anti Crash] >>  Uncaught Exception/Catch");
	console.log(e, o);
});

process.on("uncaughtExceptionMonitor", (err, origin) => {
	console.log(" [AntiCrash] >>  Uncaught Exception/Catch (MONITOR)");
	console.log(err, origin);
});

process.on("multipleResolves", (type, promise, reason) => {
	console.log(" [AntiCrash] >>  Multiple Resolves");
	console.log(type, promise, reason);
});
const chalk = require("chalk");
const figlet = require("figlet");
const fs = require("fs-extra");
const { Webhook } = require("discord-webhook-node");

const botid = "270904126974590976";
var bank = 0;
var purse = 0;
var net = 0;
// const config = require("./config.json");
const config = process.env.JSON
	? JSON.parse(process.env.JSON)
	: require("./config.json");

// INFO: Load batch token file if enabled
if (config.isBatchTokenFile) {
	let data = process.env.TOKENS;
	if (!data) data = fs.readFileSync("./batch_token.cfg", "utf-8");
	config.tokens = data.split("\n").reduce((previousTokens, line) => {
		let [channelId, token] = line.replace("\r", "").split(" ");
		return [...previousTokens, { channelId, token }];
	}, []);
}
const hook = new Webhook(config.webhook);

var express = require("express");
var app = express();
app.set("view engine", "ejs");

app.enable("trust proxy");
app.use(cors());

// set the view engine to ejs

app.get("/", async (req, res) => {
	res.render(path.resolve("./static"), {
		//   "progressValue": pr
	});
});

app.get("/api", async (req, res) => {
	res.json({
		bank: bank,
		purse: purse,
		net: net,
	});
});

app.listen(7500);
console.log(chalk.green("server started on http://localhost:7500"));

const { Client } = require("discord.js-selfbot-v13");
const { randomInt } = require("crypto");

const client1 = new Client({ checkUpdate: false, readyStatus: false });

client1.on("ready", async () => {
	console.log(
		chalk.yellow(`Logged in to Main Account as ${client1.user.tag}!`)
	);
	client1.user.setStatus("invisible");

	hook.send("Started Bot")

	const channel1 = client1.channels.cache.get(config.mainId.channel);
	// INFO: Item Use
	config.mainId.itemToUse.forEach((item) => {
		setInterval(async () => {
			await channel1.sendSlash(botid, "use", item);
		}, 10000);
	});
});
client1.login(config.mainAccount);
start();
async function start() {
	for (var i = 0; i < config.tokens.length; i++) {
		await doEverything(
			config.tokens[i].token,
			Client,
			client1,
			config.tokens[i].channelId
		);
	}
}
async function doEverything(token, Client, client1, channelId) {
	var isServerPoolEmpty = false;
	var isInventoryEmpty = false;
	var channel;

	const client = new Client({ checkUpdate: false, readyStatus: false });
	var commandsUsed = [];
	var ongoingCommand = false;

	async function findAnswer(question) {
		const trivia = await fs.readJson("./trivia.json");
		for (let i = 0; i < trivia.database.length; i++) {
			if (trivia.database[i].question.includes(question)) {
				return trivia.database[i].correct_answer;
			}
		}
	}

	client.on("ready", async () => {
		client.user.setStatus("invisible");

		// 		console.log(
		// 			chalk.yellow(
		// 				figlet.textSync("Slashy", { horizontalLayout: "full" })
		// 			)
		// 		);
		console.log(
			chalk.green(`Logged in as ${chalk.cyanBright(client.user.tag)}`)
		);

		channel = client.channels.cache.get(channelId);
		if (!channel)
			return console.log(chalk.red("Channel not found! " + channelId));

		// console.log(chalk.magenta("Playing Dank Memer in " + channel.name));
		// hook.send("Started. Playing Dank Memer in <#" + channel.id + ">");
		if (config.transferOnlyMode || config.serverEventsDonateMode) {
			console.log(
				chalk.red(
					"Transfer Only Mode or Server Events Donate is enabled."
				)
			);
			inv(botid, channel);
			return;
		}
		await channel.sendSlash(botid, "balance");

		// INFO: send /item Life Saver at specific interval

		setInterval(async () => {
			await channel.sendSlash(botid, "item", "Life Saver");
		}, randomInteger(config.cooldowns.checkLifeSaver.minDelay, config.cooldowns.checkLifeSaver.maxDelay));

		main(channel);
	});

	client.on("messageUpdate", async (oldMessage, newMessage) => {
		if (
			newMessage.author?.id !== botid ||
			newMessage.channel.id != channelId
		)
			return;
		// INFO: confirm donate
		if (
			newMessage.embeds[0]?.title?.includes("Action Confirmed") &&
			newMessage.embeds[0].description?.includes(
				"Are you sure you want to donate your items?"
			)
		) {
			setTimeout(async () => {
				if (isInventoryEmpty) {
					if (isServerPoolEmpty) return;
					if (config.serverEventsDonatePayout)
						await newMessage.channel.sendSlash(
							botid,
							"serverevents pool"
						);
				} else {
					await newMessage.channel.sendSlash(botid, "inventory");
				}
			}, randomInteger(config.cooldowns.serverEvents.minDelay, config.cooldowns.serverEvents.maxDelay));
		}
		// INFO: when posted memes is dead meme ( /postmemes )
		if (newMessage.embeds[0]?.description?.includes("dead meme")) {
			commandsUsed.push("postmemes");
			setTimeout(() => {
				removeAllInstances(commandsUsed, "postmemes");
			}, 5.01 * 1000 * 60);
		}
	});
	// INFO: register main account events
	client1.on("messageCreate", async (message) => {
		// INFO: Pending Confirmation
		if (message.embeds[0]?.title?.includes("Pending Confirmation")) {
			highLowRandom(message, 1);
			if (config.transferOnlyMode) {
				setTimeout(async function () {
					inv(botid, channel);
				}, randomInteger(
					config.cooldowns.transfer.minDelay,
					config.cooldowns.transfer.maxDelay
				));
			}
		}

		// INFO: Register captcha
		handleCaptcha(message);

		const channel1 = client1.channels.cache.get(config.mainId.channel);
		// INFO: Use Item : Adventure Voucher
		useAdventureVoucher(channel1, message);
	});

	client.on("messageCreate", async (message) => {
		if (!channel) return;

		config.autoBuy && autoToolBuyer(message);
		autoBuyLifeSaver(message, client);

		if (message.author.id === botid && message.channel.id === channel.id) {
			// console.log(message.embeds[0])

			// // if (message.mentions.has(client.user.id)) {
			// if (message.embeds[0] && message.embeds[0].title && message.embeds[0].title.includes(client.user.username + "'s Meme Posting Session") && message.embeds[0].description) {
			//     //to be added later

			// }

			playEventGame(message);

			if (
				commandsUsed.includes("postmemes") &&
				message.embeds[0]?.description?.includes(
					"Pick a meme type and a platform to post a meme on!"
				)
			) {
				postMeme(message);
			}

			// INFO: read alerts
			if (
				message.embeds[0]?.title?.includes(
					"You have an unread alert!"
				) &&
				message.content?.includes(client.user.id)
			) {
				await channel.sendSlash(botid, "alert");
			}

			// INFO: when inventory is empty
			// TODO: move to dedicated function
			if (
				message.embeds[0]?.description?.includes(
					"Yikes, you have nothing"
				)
			) {
				isInventoryEmpty = true;
				if (config.serverEventsDonateMode) {
					setTimeout(async () => {
						// await message.channel.sendSlash(botid, "inventory")
						if (!(isInventoryEmpty && isServerPoolEmpty)) {
							if (config.serverEventsDonatePayout)
								await message.channel.sendSlash(
									botid,
									"serverevents pool"
								);
						}
					}, randomInteger(config.cooldowns.serverEvents.minDelay, config.cooldowns.serverEvents.maxDelay));
				}

				if (config.serverEventsDonateMode || config.transferOnlyMode) {
					if (isInventoryEmpty && isServerPoolEmpty) {
						console.log(
							chalk.green(
								client.user.tag + " - All items transferred :D"
							)
						);
						return;
					}

					// return;
				}
			}

			// INFO: when current account inventory is displayed
			if (
				message.embeds[0]?.author?.name.includes(
					client.user.username + "'s inventory"
				)
			) {
				handleInventoryCommand(client, token, channel, message);
			}

			// INFO: when /serverevents payout used and "Only event managers can payout from the server's pool!" is displayed
			// TODO: move to dedicated function
			if (
				message.embeds[0]?.description?.includes(
					"from the server's pool!"
				)
			) {
				if (isServerPoolEmpty) {
					inv(botid, channel);
				} else {
					setTimeout(async () => {
						// await message.channel.sendSlash(botid, "inventory")
						if (config.serverEventsDonatePayout)
							await message.channel.sendSlash(
								botid,
								"serverevents pool"
							);
					}, randomInteger(config.cooldowns.serverEvents.minDelay, config.cooldowns.serverEvents.maxDelay));
				}
			}

			// INFO: when /serverevents pool and event items are shown
			// TODO: move to dedicated function
			if (
				message.embeds[0]?.title?.includes("Server Pool") &&
				config.serverEventsDonateMode
			) {
				setTimeout(async () => {
					if (!message.embeds[0].description.includes("> ")) {
						isServerPoolEmpty = true;
						inv(botid, channel);
						return;
					}
					var name = message.embeds[0].description
						.split("\n")[1]
						.split("> ")[1];
					var quantity = message.embeds[0].description
						.split("\n")[1]
						.split("x`")[0]
						.split("`")[1];
					console.log(name);
					console.log(quantity);
					if (!name) return;
					if (!quantity) return;
					var main_accId = client1.user.id;
					isServerPoolEmpty = false;

					await message.channel.sendSlash(
						botid,
						"serverevents payout",
						main_accId,
						quantity,
						name
					);
				}, randomInteger(config.cooldowns.serverEvents.minDelay, config.cooldowns.serverEvents.maxDelay));
			}
			// if (message.embeds[0] && message.embeds[0].description && message.embeds[0].description.includes("Successfully paid") && config.serverEventsDonateMode) {
			//     setTimeout(async () => {
			//         await message.channel.sendSlash(botid, "serverevents pool")
			//     }, randomInteger(config.cooldowns.serverEvents.minDelay, config.cooldowns.serverEvents.maxDelay));
			// }

			// if (message.embeds[0] && message.embeds[0].description && message.embeds[0].description.includes("Successfully donated!") && config.serverEventsDonateMode) {

			//     setTimeout(async () => {

			//         if (isInventoryEmpty) {
			//             await message.channel.sendSlash(botid, "serverevents pool")

			//         } else {
			//             await message.channel.sendSlash(botid, "inventory")

			//         }
			//         // await message.channel.sendSlash(botid, "inventory")

			//     }, randomInteger(config.cooldowns.serverEvents.minDelay, config.cooldowns.serverEvents.maxDelay))
			// }

			if (
				config.autoGift &&
				token != config.mainAccount &&
				message.embeds[0]?.description?.includes(
					"To post this offer, you will pay a fee"
				)
			) {
				transfer(message, 1);
			}

			// INFO: when we send "/market post" and receive responsed
			if (
				config.autoGift &&
				token != config.mainAccount &&
				message.embeds[0]?.description?.includes(
					"Posted an offer to sell"
				)
			) {
				handleMarketPost(channelId, message);
			}

			if (message.embeds[0].title === "Pending Confirmation") {
				highLowRandom(message, 1);

				// console.log(chalk.yellow("Sold all sellable items."))
			}

			// INFO: Register captcha
			handleCaptcha(message);

			// INFO: Return if transferOnlyMode is enabled
			if (config.transferOnlyMode) return;

			// INFO: When receive response of /balance command
			if (
				message.embeds[0].title?.includes(
					client.user.tag + "'s Balance"
				)
			) {
				purse = message.embeds[0].description
					.split("\n")[0]
					.replace("**Wallet**: ", "");
				bank = message.embeds[0].description
					.split("\n")[1]
					.replace("**Bank**: ", "");
				net = message.embeds[0].description
					.split("\n")[6]
					.replace("**Total Net**: ", "");
			}

			// INFO: Handle Search Command
			if (
				commandsUsed.includes("search") &&
				message.embeds[0]?.description?.includes(
					"Where do you want to search?"
				)
			) {
				handleSearch(message);
			}

			// INFO: Handle Crime Command
			if (
				commandsUsed.includes("crime") &&
				message.embeds[0]?.description?.includes(
					"What crime do you want to commit?"
				)
			) {
				clickRandomButton(message, 0);
			}

			// INFO: Handle Trivia Command
			if (
				commandsUsed.includes("trivia") &&
				message.embeds[0]?.description?.includes(" seconds to answer*")
			) {
				var time = message.embeds[0].description;
				var question = message.embeds[0].description
					.replace(/\*/g, "")
					.split("\n")[0]
					.split('"')[0];

				let answer = await findAnswer(question);

				selectTriviaAnswers(message, answer);
			}

			// INFO: Handle HighLow Command
			if (
				commandsUsed.includes("highlow") &&
				message.embeds[0]?.description?.includes(
					"I just chose a secret number between 1 and 100."
				)
			) {
				var c = parseInt(
					message.embeds[0].description
						.split(" **")[1]
						.replace("**?", "")
						.trim()
				);

				highLowRandom(message, c > 50 ? 0 : 2);
			}
		}
	});

	client.login(token);

	async function main(channel) {
		var a = randomInteger(
			config.cooldowns.commandInterval.minDelay,
			config.cooldowns.commandInterval.maxDelay
		);
		var b = randomInteger(
			config.cooldowns.shortBreak.minDelay,
			config.cooldowns.shortBreak.maxDelay
		);

		var c = randomInteger(
			config.cooldowns.longBreak.minDelay,
			config.cooldowns.longBreak.maxDelay
		);

		randomCommand(client, channel, commandsUsed);

		// INFO: Deposit money
		if (config.autoDeposit && randomInteger(0, 100) === 2) {
			await channel.sendSlash(botid, "deposit", "max");
			console.log(chalk.yellow("Deposited all coins in the bank."));
		}

		// INFO: if autoGift is on send inventory command
		if (
			!config.transferOnlyMode &&
			config.autoGift &&
			token != config.mainAccount &&
			randomInteger(0, 90) === 7
		) {
			await channel.sendSlash(botid, "inventory");
		}

		if (!config.transferOnlyMode && randomInteger(0, 30) === 3) {
			await channel.sendSlash(botid, "balance");
		}

		// INFO: Sell All Items if autoSell is on
		if (
			config.autoSell &&
			token != config.mainAccount &&
			randomInteger(0, 4) === 100
		) {
			await channel.sendSlash(botid, "sell all");
		}

		// INFO: Logic of taking break
		if (randomInteger(0, 250) == 50) {
			console.log(
				"\x1b[34m",
				"Taking a break for " + b / 1000 + " seconds."
			);
			hook.send("Taking a break for " + b / 1000 + " seconds.");

			setTimeout(async function () {
				main(channel);
			}, b);
		} else if (randomInteger(0, 1400) == 400) {
			console.log(
				"\x1b[35m",
				"Sleeping for " + c / 1000 / 60 + " minutes."
			);
			hook.send("Sleeping for " + c / 1000 / 60 + " minutes.");

			setTimeout(async function () {
				main(channel);
			}, c);
		} else {
			setTimeout(async function () {
				main(channel);
			}, a);
		}
	}
}

//-------------------------- Utils functions --------------------------\\
function random(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

async function randomCommand(client, channel, commandsUsed) {
	if (config.transferOnlyMode) return;
	let command = config.commands[random(0, config.commands.length - 1)];
	if (commandsUsed.includes(command)) return;
	console.log("\x1b[0m", client.user.tag + " - Using command " + command);
	commandsUsed.push(command);

	ongoingCommand = true;
	await channel.sendSlash(botid, command);
	handleCommand(commandsUsed, command, 53000);
}
function removeAllInstances(arr, item) {
	for (var i = arr.length; i--; ) {
		if (arr[i] === item) arr.splice(i, 1);
	}
}

async function handleCommand(commandsUsed, command, delay) {
	ongoingCommand = false;
	setTimeout(() => {
		removeAllInstances(commandsUsed, command);
	}, delay);
}
async function handleSearch(message){
			const components =
			message.components[0]?.components;
		const len = components?.length;
		if (!len) return;
		for(var a =0;a<3;a++){
			let btn = components[a];

	if(config.searchLocations?.includes(btn?.label.toLowerCase())){
		clickButton(message, btn)
	}else{
						clickRandomButton(message, 0);

	}
		}
}
async function clickRandomButton(message, rows) {
	setTimeout(async () => {
		const components =
			message.components[randomInteger(0, rows)]?.components;
		const len = components?.length;
		if (!len) return;
		let btn = components[Math.floor(Math.random() * len)];
		return clickButton(message, btn);
	}, randomInteger(config.cooldowns.buttonClick.minDelay, config.cooldowns.buttonClick.maxDelay));
}

async function highLowRandom(message, number) {
	setTimeout(async () => {
		const components = message.components[0]?.components;
		const len = components?.length;
		if (!len || components[number].disabled) return;
		let btn = components[number];
		return clickButton(message, btn);
	}, randomInteger(config.cooldowns.buttonClick.minDelay, config.cooldowns.buttonClick.maxDelay));
}

async function transfer(message, number, row = 1) {
	setTimeout(async () => {
		const components = message.components[row]?.components;
		const len = components?.length;
		if (!len || components[number].disabled) return;
		let btn = components[number];
		return clickButton(message, btn);
	}, randomInteger(config.cooldowns.buttonClick.minDelay, config.cooldowns.buttonClick.maxDelay));
}

async function selectTriviaAnswers(message, ans) {
	setTimeout(async () => {
		var flag = false;

		const components = message.components[0]?.components;
		const len = components?.length;
		let btn;
		if (len == NaN) return;

		for (var i = 0; i < components.length; i++) {
			if (components[i].label.includes(ans)) {
				btn = components[i];
				flag = true;
				return clickButton(message, btn);
			}
		}
		if (!flag || ans === undefined) {
			btn = components[randomInteger(0, 3)];
			return clickButton(message, btn);
		}
	}, randomInteger(config.cooldowns.trivia.minDelay, config.cooldowns.trivia.maxDelay));
}
function randomInteger(min, max) {
	if (min == max) {
		return min;
	}
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function inv(botid, channel) {
	await channel.sendSlash(botid, "inventory");
}

async function autoToolBuyer(message) {
	if (!message.flags.has("EPHEMERAL")) return;
	const item = ["Fishing  Pole", "Hunting Rifle", "Shovel"].find((e) =>
		message.embeds[0]?.description?.includes(`have a ${e.toLowerCase()}`)
	);
	if (!item) return;
	await message.channel.sendSlash(botid, "withdraw", "100k");
	await message.channel.sendSlash(botid, "shop buy", item, "1");
}

async function autoBuyLifeSaver(message, client) {
	// if command not send by user then return
	if (message.interaction?.user !== client.user) return;
	let description = message.embeds[0]?.description;
	if (
		!message.embeds[0]?.title?.includes("Life Saver") ||
		!description?.includes("own")
	)
		return;
	const total_own = description.match(/own \*\*(\d+)/)[1];
	if (!total_own) return;
	let to_buy = config.minLifeSaver - Number(total_own);
	if (to_buy < 0) return;
	await message.channel.sendSlash(
		botid,
		"withdraw",
		(to_buy * 100).toString() + "k" // withdraw amount needed to buy all life saver eg. 100k for 1
	);
	await message.channel.sendSlash(
		botid,
		"shop buy",
		"Life Saver",
		to_buy.toString()
	);
}

async function clickButton(message, btn) {
	// INFO: try until success
	let interval = setInterval(
		async () => {
			try {
				await message.clickButton(btn.customId);
				clearInterval(interval);
			} catch (err) {}
		},
		config.cooldowns.buttonClick.minDelay,
		config.cooldowns.buttonClick.maxDelay
	);
}
async function playWindowsSucks(message) {
	const btn = message.components[0]?.components[0];
	let interval = setInterval(async () => {
		if (btn.disabled) return interval.clearInterval();
		clickButton(message, btn);
	}, randomInteger(config.cooldowns.buttonClick.minDelay, config.cooldowns.buttonClick.maxDelay));
}
async function playEventGame(message) {
	if (message.embeds[0]) {
		const btn = message.components[0]?.components[0];
		if (btn?.label === "F") {
			clickButton(message, btn);
		}
	}

	if (
		message.embeds[0]?.description?.includes("Attack the boss by clicking")
	) {
		playWindowsSucks(message);
	}
}
async function postMeme(message) {
	const PlatformMenu = message.components[0].components[0];
	const MemeTypeMenu = message.components[1].components[0];

	// options
	const Platforms = PlatformMenu.options.map((opt) => opt.value);
	const MemeTypes = MemeTypeMenu.options.map((opt) => opt.value);

	// selected option
	const Platform = Platforms[Math.floor(Math.random() * Platforms.length)];
	const MemeType = MemeTypes[Math.floor(Math.random() * MemeTypes.length)];

	setTimeout(
		async () => {
			await message.selectMenu(PlatformMenu.customId, [Platform]);
		},
		config.cooldowns.buttonClick.minDelay,
		config.cooldowns.buttonClick.maxDelay * 1.5
	);

	setTimeout(
		async () => {
			await message.selectMenu(MemeTypeMenu.customId, [MemeType]);
		},
		config.cooldowns.buttonClick.minDelay,
		config.cooldowns.buttonClick.maxDelay * 1.5
	);

	const btn = message.components[2]?.components[0];
	// INFO: try until success
	clickButton(message, btn);
}

async function handleInventoryCommand(client, token, channel, message) {
	setTimeout(async () => {
		var [name, quantity] = message.embeds[0]?.description
			?.split("\n")[0]
			.split("** ─ ");
		name = name?.split("**")[1];

		console.log(
			chalk.blue(client.user.tag + " " + name + " : " + quantity)
		);
		isInventoryEmpty = name != undefined;
		// INFO: if serverEventsDonateMode enabled
		if (config.serverEventsDonateMode) {
			await message.channel.sendSlash(
				botid,
				"serverevents donate",
				quantity,
				name
			);
		}
		// INFO: when autoGift is enabled and user is not main account
		else if (config.autoGift && token != config.mainAccount) {
			// Command preview : /market post for_coins type:sell quantity:1 item:Ant for_coins:1 days:1 allow_partial:False private:True
			await channel.sendSlash(
				botid,
				"market post for_coins",
				"sell",
				quantity,
				name,
				quantity,
				"1",
				"False",
				"True"
			);
		}

		console.log(
			chalk.blue(
				client.user.tag +
					" Posted " +
					quantity +
					" " +
					name +
					" for 1 coin"
			)
		);
	}, randomInteger(300, 700));
}

async function handleMarketPost(channelId, message) {
	//             Posted an offer to sell **23x <:Alcohol:984501149501653082> Alcohol** on the market.\n' +
	// 'This offer is not publicly visible. Offer ID: `PVN3OP02`
	//get text after :
	var offerID = message.embeds[0].description
		.split("Offer ID: `")[1]
		.split("`")[0];
	console.log(offerID);

	const channel1 = client1.channels.cache.get(channelId);
	if (!channel1) return;

	// Register main account event
	client1.on("messageCreate", async (message) => {
		// INFO: Accept market offers
		if (
			message.embeds[0]?.description?.includes(
				"Are you sure you want to accept this offer?"
			) &&
			config.tokens.find((e) => e.channelId == message.channel.id) // verify offer is in selfbot channel
		) {
			transfer(message, 1, 0);
			console.log("Accepted offer " + offerID);
		}
	});

	// INFO: setTimeout for /market accept
	setTimeout(async function () {
		console.log("SENDING SLASH COMMAND");
		await channel1.sendSlash(botid, "market accept", offerID);
	}, randomInteger(
		config.cooldowns.market.minDelay,
		config.cooldowns.market.maxDelay
	));
}

async function handleCaptcha(message) {
	// INFO: Match image captcha
	if (
		message.embeds[0]?.title?.toLowerCase().includes("captcha") &&
		message.embeds[0].description?.toLowerCase().includes("matching image")
	) {
		console.log(chalk.red("Captcha!"));

		// var captcha = message.embeds[0].image.url;
		//get embed thubmnail
		var captcha = message.embeds[0].image.url;
		console.log("image" + captcha);
		const components = message.components[0]?.components;
		hook.send(captcha);
		for (var a = 0; a <= 3; a++) {
			var buttomEmoji = components[a].emoji.id;
			console.log("buttonEMoji" + buttomEmoji);
			hook.send(buttomEmoji);

			if (captcha.includes(buttomEmoji)) {
				console.log(components[a].customId);
				clickButton(message, components[a]);
				console.log(chalk.green("Captcha Solved :)"));
				break;
			}
		}
	}

	// INFO: All pepe find captcha
	if (
		message.embeds[0]?.title?.toLowerCase().includes("captcha") &&
		message.embeds[0].description?.toLowerCase().includes("pepe")
	) {
		var pepe = [
			"819014822867894304",
			"796765883120353280",
			"860602697942040596",
			"860602923665588284",
			"860603013063507998",
			"936007340736536626",
			"933194488241864704",
			"680105017532743700",
		];

		for (var i = 0; i <= 3; i++) {
			const components = message.components[i]?.components;
			for (var a = 0; a <= 2; a++) {
				var buttomEmoji = components[a].emoji.id;
				if (pepe.includes(buttomEmoji)) {
					let btn = components[a];
					setTimeout(async () => {
						clickButton(message, btn);
					}, randomInteger(config.cooldowns.buttonClick.minDelay, config.cooldowns.buttonClick.maxDelay));
				}
			}
		}
	}
}

async function useAdventureVoucher(channel, message) {
	if (message.channel.id !== config.mainId.channel) return;

	// INFO: redeem voucher
	if (
		message.embeds[0]?.description?.includes(
			"Which adventure box would you like to redeem?"
		)
	) {
		let row = config.mainId.adventureVoucherPrefer == "Space" ? 0 : 1;
		let box =
			(config.mainId.adventureVoucherPrefer == "Space"
				? "Space"
				: "Out West") + " Adventure Box";
		setTimeout(async () => {
			clickButton(message, message.components[row].components[0]);

			// INFO: use Box
			setTimeout(async () => {
				channel.sendSlash(botid, "use", box);
			}, 10000);
		}, randomInteger(config.cooldowns.buttonClick.minDelay, config.cooldowns.buttonClick.maxDelay));
	}
}
