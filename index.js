// Version 2.1.2
const version = "2.1.2";
const isBeta = true;

const chalk = require("chalk");
console.log(chalk.red(`Slashy ${isBeta ? 'Beta' : 'Stable'} has started!${isBeta ? ' WARNING: some features may be unstable!' : ''}`))
console.log(chalk.hex('#FFA500')(`If you encounter any issues, join our Discord: \nhttps://discord.gg/HGfFFUQ7F7`))
console.log(chalk.yellowBright(`Your version is: ${version}`))

if (!process.version.startsWith('v20')) console.log(chalk.redBright('You are running a NodeJS version under v20. If you don\'t upgrade, you may get large lag spikes or ram overloads.'))
    
const {
  Webhook,
  MessageBuilder
} = require("discord-webhook-node");

let webhook;
let isOneAccPayingOut = false;
let itemsToPayout = [];

const config = process.env.config ? JSON.parse(process.env.config) : require("./config.json");
if (config.webhookLogging && config.webhook) webhook = new Webhook(config.webhook);

if (config.serverEventsDonate.enabled) console.log(chalk.redBright('SeverEvents Donate is VERY risky at the moment. Bot admins are monitoring server pools usage. You may want to turn this off.'))
if (config.commands.filter(a => a.command === 'trivia').length > 0) console.log(chalk.redBright('Trivia is VERY risky at the moment. Bot admins are monitoring trivia bots. You may want to turn this off.'))

process.on("unhandledRejection", (error) => {
  if (error.toString().includes("Cannot read properties of undefined (reading 'type')")) return;
  if (error.toString().includes("INTERACTION_TIMEOUT")) return;
  if (error.toString().includes("BUTTON_NOT_FOUND")) return;
  if (error.toString().includes("Invalid Form Body")) return;
  if (error.toString().includes("COMPONENT_VALIDATION_FAILED: Component validation failed")) return;
  if (error.toString().includes("Cannot send messages to this user")) return console.error(chalk.red("Make sure all of the users are in a server where Dank Memer is in"));
  console.log(chalk.gray("—————————————————————————————————"));
  console.log(chalk.white("["), chalk.red.bold("Anti-Crash"), chalk.white("]"), chalk.gray(" : "), chalk.white.bold("Unhandled Rejection/Catch"));
  console.log(chalk.gray("—————————————————————————————————"));

  console.error("unhandledRejection", error);
});

process.on("uncaughtException", (error) => {
  console.log(chalk.gray("—————————————————————————————————"));
  console.log(chalk.white("["), chalk.red.bold("Anti-Crash"), chalk.white("]"), chalk.gray(" : "), chalk.white.bold("Uncaught Exception/Catch"));
  console.log(chalk.gray("—————————————————————————————————"));

  console.error("uncaughtException", error);
});

process.on("multipleResolves", (type, promise, reason) => {
  console.log(chalk.gray("—————————————————————————————————"));
  console.log(chalk.white("["), chalk.red.bold("Anti-Crash"), chalk.white("]"), chalk.gray(" : "), chalk.white.bold("Multiple Resolves"));
  console.log(chalk.gray("—————————————————————————————————"));
  console.log(type, promise, reason);
});

const fs = require("fs-extra");
const axios = require("axios");
const SimplDB = require("simpl.db");
const stripAnsi = require("strip-ansi");
const express = require("express");

const db = new SimplDB();

axios.get(`https://raw.githubusercontent.com/TahaGorme/slashy/${isBeta ? 'beta' : 'main'}/index.js`).then((res) => {
  let v = res.data.match(/Version ([0-9]*\.?)+/)[0]?.replace("Version ", "");
  if (v && v !== version) console.log(chalk.bold.bgRed("There is a new version available: " + v + "\t\nPlease update. " + chalk.underline("https://github.com/TahaGorme/slashy")));
}).catch((error) => {
  console.log(error);
});

let logs = [];

const app = express();
app.use(express.json());

let websitePass = process.env.password || config.password;

app.get("/", (req, res) => res.sendFile(__dirname + "/website/index.html"));
app.get("/balance", (req, res) => res.sendFile(__dirname + "/website/bal.html"));

app.get("/api/console", (req, res) => {
  const password = req.headers.password;
  if (!password && config.password) return;
  if ((password !== websitePass) && config.password) return res.send("Invalid Password");

  const html = logs.map(msg => {
    return msg;
  }).join('\n');

  res.send(html);
});

app.post("/api/saveThings", (req, res) => {
  const password = req.headers.password;
  if (!password && config.password) return;
  if ((password !== websitePass) && config.password) return res.send("Invalid Password");

  let b = req.body;

  config.playInDms = b.playInDms;
  config.autoAdventure = b.autoAdventure;
  config.autoApple = b.autoApple;
  config.autoHorseshoe = b.autoHorseShoe;
  config.devMode = b.devMode;
  config.autoDeposit = b.autoDeposit;
  config.autoBuy = b.autoBuy;
  config.commands = b.commands;
  config.cooldowns = b.cooldowns;

  fs.writeFileSync('config.json', JSON.stringify(config, null, "\t"), 'utf8', (err) => {
    if (err) throw err;
    console.log('The config.json file has been updated!');
  });

  res.send("Config Updated")
});

app.get("/api/database", (req, res) => {
  const password = req.headers.password;
  if (!password && config.password) return;
  if ((password !== websitePass) && config.password) return res.send("Invalid Password");

  const data = db.toJSON();
  res.json(data);
});

app.get("/api/config", (req, res) => {
  const password = req.headers.password;
  if (!password && config.password) return;
  if ((password !== websitePass) && config.password) return res.send("Invalid Password");

  res.send(config);
});

app.listen(7600, () => console.log(`App listening on port 7600!`));

const {
  Client
} = require("discord.js-selfbot-v13");
const tokens = process.env.tokens ? process.env.tokens.split("\n") : fs.readFileSync("tokens.txt", "utf-8").split("\n");
const botid = "270904126974590976";
let i = 0;

if (config.serverEventsDonate.payoutOnlyMode && config.serverEventsDonate.tokenWhichWillPayout && config.serverEventsDonate.enabled) {
  const client1 = new Client({
    checkUpdate: false
  });

  client1.on('ready', async () => {
    console.log(`${client1.user.username} is ready!`);

    const channel = await client1.channels.fetch(config.serverEventsDonate.payoutChannelID);
    if (!channel) return console.log("Invalid Channel ID for Serverevents donate - Please check config.json");
    channel.sendSlash(botid, "serverevents pool")
  })

  client1.on("messageCreate", async (message) => {
    if (message?.interaction?.commandName?.includes("serverevents payout") && message?.embeds[0]?.title?.includes("Pending Confirmation")) {
      if (!message.components[0].components[1]) return;
      await clickButton(message, message.components[0].components[1]);

      itemsToPayout.shift();
      await wait(randomInt(1500, 2000))

      if (itemsToPayout.length <= 0) return message.channel.sendSlash(botid, "serverevents pool")
      await message.channel.sendSlash(botid, "serverevents payout", config.serverEventsDonate.mainUserId, itemsToPayout[0].quantity, itemsToPayout[0].item)
    }

    if (message?.embeds[0]?.title?.includes("Server Pool")) {
      if (!config.serverEventsDonate.payout) return;

      let coins = message.embeds[0].description
        .split("\n")[4]
        .split("⏣ ")[1]
        .replaceAll(',', '');

      if (coins > 0 && config.serverEventsDonate.payout) await message.channel.sendSlash(botid, "serverevents payout", config.serverEventsDonate.mainUserId, coins);

      message.embeds[0].description.split("\n").forEach((line) => {
        if (/` +([0-9,]+)/gm.test(line)) {
          let quantity = line.match(/` +([0-9,]+)/gm)[0]?.replace("`")?.trim()?.replaceAll(',', '')?.match(/\d+/)[0];
          let item = line.match(/> .*/gm)[0]?.replace("> ", "")?.trim();
          if (!quantity || !item) return;
          console.log(`${item}: ${quantity}`)
          itemsToPayout.push({
            item: item,
            quantity: quantity
          });
        }
      });
      if (itemsToPayout.length <= 0) return console.log(`${chalk.magentaBright(client1.user.tag)}: ${chalk.cyan(`Server Pool Empty`)} `)

      await message.channel.sendSlash(botid, "serverevents payout", config.serverEventsDonate.mainUserId, itemsToPayout[0].quantity, itemsToPayout[0].item)
    }
  })
  client1.login(config.serverEventsDonate.tokenWhichWillPayout);
} else {
  tokens.forEach((token) => {
    i++;

    setTimeout(() => {
      if (!token.trim().split(" ")[1]) start(token.trim().split(" ")[0]);
      else start(token.trim().split(" ")[1], token.trim().split(" ")[0]);
    }, i * config.loginDelay);
  });
};

async function start(token, channelId) {
  let onGoingCommands = [];
  let allItemsInInventory = [];
  let queueCommands = [];
  let isBotFree = true;
  let isOnBreak = false;
  let botNotFreeCount = 0;
  let isDeadMeme = false;
  let isPlayingAdventure = false;
  let wallet = 0;
  let bank = 0;
  let totalNet = 0;
  let market = 0;
  let invNet = 0;
  let emoji = '';
  let isHandling = '';

  const client = new Client({
    checkUpdate: false
  });

  let channel;

  client.on("rateLimit", (rateLimitInfo) => {
    console.log(chalk.white.bold('@' + client.user.username + " - Rate Limited"));
    console.log(chalk.gray(rateLimitInfo));
  });

  client.on("ready", async () => {
    client.user.setStatus(config.discordStatus);

    console.log(`${chalk.green("Logged in as @")}${chalk.blue(client.user.username)}`);

    const user = await client.users.fetch(botid);
    const createdDm = await user.createDM();

    if (config.playInDms) channelId = createdDm.id;

    channel = await client.channels.fetch(channelId);

    if (config.autoDaily) {
      const now = Date.now();
      const gmt0 = new Date(now).setUTCHours(0, 0, 0, 0);
      let remainingTime;
      if (now > gmt0) {
        const nextGmt0 = new Date(gmt0).setUTCDate(new Date(gmt0).getUTCDate() + 1);
        remainingTime = nextGmt0 - now;
      } else remainingTime = gmt0 - now;

      if (!db.has(client.user.id + ".daily")) {
        await channel.sendSlash(botid, "daily")
        console.log(chalk.yellow(`@${client.user.username} claimed daily`));

        db.set(client.user.id + ".daily", Date.now());
      }


      if (db.get(client.user.id + ".daily") && Date.now() - db.get(client.user.id + ".daily") > remainingTime) {
        await channel.sendSlash(botid, "daily").then(() => {
          db.set(client.user.id + ".daily", Date.now());
          console.log(chalk.yellow(`@${client.user.username} claimed daily`));

          setInterval(async () => {
            queueCommands.push({
              command: "daily"
            });
            db.set(client.user.id + ".daily", Date.now());
            console.log(chalk.yellow(`@${client.user.username} claimed daily`));
          }, remainingTime + randomInt(10000, 60000));
        })
          .catch((e) => {
            return console.log(e);
          });
      }
    }

    if (config.autoVote) {
      const vote = () => {
        axios.post("https://discord.com/api/v10/oauth2/authorize?client_id=477949690848083968&response_type=code&scope=identify", {
          authorize: true,
          permissions: 0
        }, {
          headers: {
            authorization: token
          }
        }).then((res) => {
          if (!res.data || !res.data.location) return;
          axios.get(`https://discordbotlist.com/api/v1/oauth?code=${res.data.location.split('code=')[1]}`).then((res) => {
            axios.post(`https://discordbotlist.com/api/v1/bots/270904126974590976/upvote`, {}, {
              headers: {
                authorization: res.data.token
              }
            }).then((res) => {
              if (res.data.success) console.log(chalk.yellow(`@${client.user.username} voted`));
            }).catch(err => {
              if (err.response) console.log(chalk.red(`@${client.user.username} Vote Error: (${err.response.status}) ${error.response.data}`))
              else console.log(chalk.red(`@${client.user.username} Vote Error: unknown`))
            });
          })
        });
      };

      setInterval(() => vote(), 4.32e+7, true);
    };

    if (config.serverEventsDonate.enabled && config.playInDms) return console.log(chalk.redBright("Server Events Donate is not supported in DMs. Please disable playInDms in config.json and add channel ids before the tokens in tokens.txt in the format <channelid> <token>"))
    if (config.serverEventsDonate.enabled) await channel.sendSlash(botid, "withdraw", "max")
    await channel.sendSlash(botid, "balance").catch((e) => console.log(e));
    await wait(1000);
    await channel.sendSlash(botid, "work shift").catch((e) => console.log(e));
    await wait(5000);
    await channel.sendSlash(botid, "pets care").catch((e) => console.log(e));
    

    db.set(client.user.id + ".username", client.user.username);

    if (config.serverEventsDonate.enabled) return channel.sendSlash(botid, "inventory")

    if (!db.get(client.user.id + ".apple") || Date.now() - db.get(client.user.id + ".apple") > 24 * 60 * 60 * 1000) {
      if (config.autoApple) {
        setTimeout(async () => {
          await channel.sendSlash(botid, "use", "apple")
            .catch((e) => {
              return console.error(e);
            });
        }, randomInt(5000, 150000))
      }
    }

    if (!db.get(client.user.id + ".horseshoe") || Date.now() - db.get(client.user.id + ".horseshoe") > 0.25 * 60 * 60 * 1000) {
      if (config.autoHorseshoe) {
        setTimeout(async () => {
          await channel.sendSlash(botid, "use", "lucky horseshoe")
            .catch((e) => {
              return console.error(e);
            });
        }, randomInt(5000, 150000))
      }
    }


    if (!db.get(client.user.id + ".ammo") || Date.now() - db.get(client.user.id + ".ammo") > 1 * 60 * 60 * 1000) {
      if (config.autoAmmo) {
        setTimeout(async () => {
          await channel.sendSlash(botid, "use", "ammo")
            .catch((e) => {
              return console.error(e);
            });
        }, randomInt(5000, 150000))
      }
    }

    if (!db.get(client.user.id + ".bait") || Date.now() - db.get(client.user.id + ".bait") > 1 * 60 * 60 * 1000) {
      if (config.autoFishingBait) {
        setTimeout(async () => {
          await channel.sendSlash(botid, "use", "fishing bait")
            .catch((e) => {
              return console.error(e);
            });
        }, randomInt(5000, 150000))
      }
    }
    
    if (!db.get(client.user.id + ".amulet") || Date.now() - db.get(client.user.id + ".amulet") > 1 * 60 * 60 * 1000) {
      if (config.autoDigAmulet) {
        setTimeout(async () => {
          await channel.sendSlash(botid, "use", "stolen amulet")
            .catch((e) => {
              return console.error(e);
            });
        }, randomInt(5000, 150000))
      }
    }
    

    if (config.autoAdventure) await channel.sendSlash(botid, "adventure").then(() => isPlayingAdventure = true);

    main(onGoingCommands, channel, client, queueCommands, isOnBreak);
  });

  client.on("messageUpdate", async (oldMessage, newMessage) => {
    if (newMessage?.interaction?.user !== client.user) return;
    if (newMessage?.author?.id !== botid) return;

    // =================== Dead Meme Start ===================

    if (newMessage?.embeds[0]?.description?.includes("dead meme")) {
      isDeadMeme = true;
      setTimeout(() => {
        isDeadMeme = false;
      }, 3.02 * 1000 * 60);
    }

    // =================== Dead Meme End ===================

    // =================== Pet Command Start ===================

    if (config.pets.autoPet) {
      if (newMessage.embeds[0]?.description?.includes('Dank Memer\'s Pet Store')) {
        if (newMessage.embeds[0]?.description?.includes(config.pets.preferredPet + ' is')) {
          if (newMessage.components[1].components[0].disabled) return console.log(`@${client.user.username}: Cannot afford the pet ${config.pets.preferredPet}.`);
          else clickButton(newMessage, newMessage.components[1].components[0]);
        } else {
          let petToBuy = config.pets.preferredPet;                
          let petMenu = newMessage.components[0].components[0];
          await newMessage.selectMenu(petMenu, [petToBuy]);
        };
      }

      if (newMessage.interaction?.type === 'APPLICATION_COMMAND' && newMessage.interaction?.commandName === 'pets care') {
        await autoPets(newMessage);
      };
    }

    // =================== Pet Command End ===================

    // =================== Adventure Start ===================

    autoAdventure(newMessage);

    let isCaught = newMessage.embeds[0]?.description?.match(/(Dragon|Kraken|Legendary Fish), nice (shot|catch)!/);
    if (isCaught) {
      let [_, item, action] = isCaught;
      console.log(chalk.magentaBright(`@${client.user.username} caught ${item}`));
    }

    if (newMessage?.embeds[0]?.title?.includes(client.user.username + ", choose items you want to take with you")) {
      if (newMessage.components[2].components[0].disabled) return (isPlayingAdventure = false);
      await clickButton(newMessage, newMessage.components[2].components[0]);
      setTimeout(async () => {
        isPlayingAdventure = false;
      }, 300000)
    }

    playMinigames(newMessage);

    if (config.serverEventsDonate.enabled && newMessage?.embeds[0]?.author?.name?.includes(`${client.user.username}'s inventory`)) {
      let inputString = newMessage.embeds[0].description;
      const regex = /([a-zA-Z0-9 ☭']+)\*\* ─ ([0-9,]+)/gm;

      let i = 0;
      inputString.match(regex).forEach(async (item) => {
        const itemName = item.trim().split("** ─ ")[0];
        const itemQuantity = item.trim().split("** ─ ")[1]?.replaceAll(',', '');
        if (config.serverEventsDonate.blacklist.includes(itemName)) return i++;
        if (i > 7) await clickButton(newMessage, newMessage.components[1].components[2]);
        allItemsInInventory.push({
          item: itemName,
          quantity: itemQuantity
        });
      });


      if (allItemsInInventory.length <= 0) {
        if (!isOneAccPayingOut && config.serverEventsDonate.payout && client.token.includes(config.serverEventsDonate.tokenWhichWillPayout)) {
          newMessage.channel.sendSlash(botid, "serverevents pool")
          isOneAccPayingOut = true;
        } else if (i > 7) return clickButton(newMessage, newMessage.components[1].components[2])
        return console.log(`@${chalk.magentaBright(client.user.username)}: ${chalk.cyan(`Donated all items`)}`)
      }
      await newMessage.channel.sendSlash(botid, "serverevents donate", allItemsInInventory[0].quantity, allItemsInInventory[0].item)
    }
  });

  client.on("messageCreate", async (message) => {
    if (message.author.id != botid) return;

    if (message?.flags?.has("EPHEMERAL") && message?.embeds[0]?.description?.includes("You are locked from doing commands and interacting until all active commands finish. Complete any ongoing commands or try again in a few minutes.")) {
      isBotFree = false;
      botNotFreeCount = 3;
    };
    
    if (message?.flags?.has("EPHEMERAL") && message?.embeds[0]?.title?.includes("You're currently banned!")) {
      console.log(chalk.redBright(`@${client.user.username} is banned!`));

      fs.writeFileSync("tokens.txt", fs.readFileSync("tokens.txt", 'utf8').replace(new RegExp(client.token + "\n", 'g'), ''));
      console.log(`String "${client.token}" removed from ${"tokens.txt"}`);

      return;
    }
    
    if (message?.flags?.has("EPHEMERAL") && message?.embeds[0]?.title?.includes("Sad, wish you were a human")) {
      console.log(chalk.redBright(`@${client.user.username} is banned! They fell for the fake captcha!`));

      fs.writeFileSync("tokens.txt", fs.readFileSync("tokens.txt", 'utf8').replace(new RegExp(client.token + "\n", 'g'), ''));
      console.log(`String "${client.token}" removed from ${"tokens.txt"}`);

      return;
    }
    
    if (message?.flags?.has("EPHEMERAL") && message?.embeds[0]?.title?.includes("Under Maintenance")) {
      console.log(chalk.redBright(`@${client.user.username} got maintenance! Stopping Slashy; restart it later.`));
      process.exit(0);
      return;
    }

    // =================== Captcha Start ===================

    if (message.embeds[0]?.title?.toLowerCase().includes("captcha") && message.embeds[0].description?.toLowerCase().includes("matching image") && message?.content?.includes(client.user.id)) {
      console.log(chalk.red("Captcha!"));
      
      let captcha = message.embeds[0].image.url;
      let isBotTest = message?.embeds[0]?.description?.includes('fail this');
      
      const components = message.components[0]?.components;
      for (let a = 0; a <= 3; a++) {
        let buttomEmoji = components[a].emoji.id;

        if (captcha.includes(buttomEmoji) && !isBotTest) {
          clickButton(message, components[a]);
          console.log(chalk.green(`@${client.user.username} solved the captcha!`));
          break;
        } else if (!captcha.includes(buttonEmoji) && isBotTest) {
          clickButton(message, components[a]);
          console.log(chalk.green(`@${client.user.username} solved the bot test captcha!`));
          break;
        };
      }
    }

    if (message?.embeds[0]?.title?.toLowerCase()?.includes("captcha") && message?.embeds[0]?.description?.toLowerCase()?.includes("pepe")) {
      let pepe = [
        "819014822867894304",
        "796765883120353280",
        "860602697942040596",
        "860602923665588284",
        "860603013063507998",
        "936007340736536626",
        "933194488241864704",
        "680105017532743700",
      ];
      let isBotTest = message?.embeds[0]?.description?.includes('wrong');

      for (let i = 0; i <= 2; i++) {
        const components = message.components[i]?.components;
        for (let a = 0; a <= 2; a++) {
          let buttonEmoji = components[a].emoji.id;
          if (pepe.includes(buttonEmoji) && !isBotTest) {
            let btn = components[a];
            setTimeout(async () => {
              clickButton(message, btn);
            }, randomInt(config.cooldowns.buttonClickDelay.minDelay, config.cooldowns.buttonClickDelay.maxDelay));
          } else if (!pepe.includes(buttonEmoji) && isBotTest) {
            let btn = components[a];
            setTimeout(async () => {
              clickButton(message, btn);
            }, randomInt(config.cooldowns.buttonClickDelay.minDelay, config.cooldowns.buttonClickDelay.maxDelay));
          };
        }
      }

      const button = message.components[3].components[0];
      if (!button) return;
      await wait(2000)
      await message.clickButton(button)
      await wait(2200)
      await message.clickButton(button);
    }
    // =================== Captcha End ===================

    // =================== Apple-Use Start ===================


    if (message?.embeds[0]?.title?.includes("Item Expiration") && config.autoApple && message?.embeds[0]?.description?.includes("Apple")) {
      queueCommands.push({
        command: "use",
        args: ["apple"]
      });
    }

    if (message?.embeds[0]?.title?.includes("Item Expiration") && config.autoHorseshoe && message?.embeds[0]?.description?.includes("Lucky Horseshoe")) {
      queueCommands.push({
        command: "use",
        args: ["lucky horseshoe"]
      });
    }

    if (message?.embeds[0]?.title?.includes("Item Expiration") && config.autoFishingBait && message?.embeds[0]?.description?.includes("Fishing Bait")) {
      queueCommands.push({
        command: "use",
        args: ["fishing bait"]
      });
    }
    
    if (message?.embeds[0]?.title?.includes("Item Expiration") && config.autoDigAmulet && message?.embeds[0]?.description?.includes("Stolen Amulet")) {
      queueCommands.push({
        command: "use",
        args: ["stolen amulet"]
      });
    }

    if (message?.embeds[0]?.title?.includes("Item Expiration") && config.autoAmmo && message?.embeds[0]?.description?.includes("Ammo")) {
      queueCommands.push({
        command: "use",
        args: ["ammo"]
      });
    }

    // =================== Apple-Use End ===================


    // =================== Autoalerts Start ===================

    if (message?.embeds[0]?.title?.includes("You have an unread alert") && message?.flags?.has("EPHEMERAL")) {
      isBotFree = false;
      setTimeout(async () => {
        await message.channel.sendSlash(botid, "alert")
        isBotFree = true;
      }, config.cooldowns.commandInterval.minDelay, config.cooldowns.commandInterval.maxDelay)
    }

    // =================== Autoalerts End ===================



    // =================== Click Minigame Start ===================

    if (message.channel.id === channelId) {
      if (message?.embeds[0]?.description?.includes("F")) {
        const btn = message.components[0]?.components[0];

        if (btn?.label === "F") await clickButton(message, btn);
        else if (message.embeds[0]?.description?.includes("Attack the boss by clicking")) {
          let interval = setInterval(async () => {
            if (btn.disabled) return interval.clearInterval();
            await clickButton(message, btn);
          }, randomInt(config.cooldowns.buttonClickDelay.minDelay, config.cooldowns.buttonClickDelay.maxDelay));
        }
      }
    }

    // =================== Click Minigame End ===================

    if (message?.interaction?.user !== client?.user) return;

    // =================== Auto Upgrades Start ===================
    if (message?.embeds[0]?.description?.includes("You've eaten an apple! If you die within the next 24 hours, you won't lose any items. You will, however, still lose coins.")) {
      db.set(client.user.id + ".apple", Date.now());
      console.log(chalk.yellow(`@${client.user.username} ate apple`));
    }

    if (message?.embeds[0]?.description?.includes("Lucky Horseshoe, giving you slightly better luck in a few commands")) {
      db.set(client.user.id + ".horseshoe", Date.now());
      console.log(chalk.yellow(`@${client.user.username} used horseshoe`));
    }

    if (message?.embeds[0]?.description?.includes("You load ammo into your hunting rifle. For the next 60 minutes, you cannot hunt and run into nothing.")) {
      db.set(client.user.id + ".ammo", Date.now());
      console.log(chalk.yellow(`@${client.user.username} used ammo`));
    }

    if (message?.embeds[0]?.description?.includes("You put bait on your fishing pole. For the next hour, you cannot fish and run into nothing")) {
      db.set(client.user.id + ".bait", Date.now());
      console.log(chalk.yellow(`@${client.user.username} used bait`));
    }
    
    if (message?.embeds[0]?.description?.includes("You equipped your shiny (totally NOT stolen) amulet.")) {
      db.set(client.user.id + ".amulet", Date.now());
      console.log(chalk.yellow(`@${client.user.username} used amulet`));
    }

    // =================== Auto Upgrades End ===================

    // =================== Stream Start ===================
    if (message?.embeds[0]?.author?.name.includes(" Stream Manager")) {
      try {
        if (message?.embeds[0]?.fields[1]?.name !== "Live Since") {
          const components = message.components[0]?.components;

          if (components[0]?.type !== "SELECT_MENU" && components[0]?.label.includes("Go Live")) {
            await message.clickButton(components[0].customId);

            setTimeout(async () => {
              if (message.components[0].components[0]?.type == "SELECT_MENU") {
                const Games = [
                  "Apex Legends",
                  "COD MW2",
                  "CS GO",
                  "Dead by Daylight",
                  "Destiny 2",
                  "Dota 2",
                  "Elden Ring",
                  "Escape from Tarkov",
                  "FIFA 22",
                  "Fortnite",
                  "Grand Theft Auto V",
                  "Hearthstone",
                  "Just Chatting",
                  "League of Legends",
                  "Lost Ark",
                  "Minecraft",
                  "PUBG Battlegrounds",
                  "Rainbox Six Siege",
                  "Rocket League",
                  "Rust",
                  "Teamfight Tactics",
                  "Valorant",
                  "Warzone 2",
                  "World of Tanks",
                  "World of Warcraft",
                ];
                const Game = (config.streamTrendingGame) ? (await fetch('https://raw.githubusercontent.com/TahaGorme/slashy/beta/trending.txt').then(res => res.text())).split('\n')[0] : Games[Math.floor(Math.random() * Games.length)];
                const GamesMenu = message.components[0].components[0]
                await message.selectMenu(GamesMenu, [Game]);
              } else return;

              setTimeout(async () => {
                const components2 = message.components[1]?.components;
                await message.clickButton(components2[0].customId)
              }, config.cooldowns.buttonClickDelay.minDelay, config.cooldowns.buttonClickDelay.maxDelay);

              setTimeout(async () => {
                const check = randomInt(0, 6);

                if (check == 0 || check == 1) {
                  await message.clickButton(message?.components[0]?.components[0]);
                  isBotFree = true;
                } else if (check == 2 || check == 3 || check == 4 || check == 5) {
                  await message.clickButton(message.components[0]?.components[1]);
                  isBotFree = true;
                } else if (check == 6) {
                  await message.clickButton(message.components[0]?.components[2]);
                  isBotFree = true;

                }
              }, config.cooldowns.buttonClickDelay.minDelay * 2, config.cooldowns.buttonClickDelay.maxDelay * 2);
            }, config.cooldowns.buttonClickDelay.minDelay, config.cooldowns.buttonClickDelay.maxDelay);
          }
        } else if (message.embeds[0].fields[1].name == "Live Since") {
          const check = randomInt(0, 6);

          if (check == 0 || check == 1) {
            await message.clickButton(message.components[0]?.components[0]);
            isBotFree = true;
          } else if (check == 2 || check == 3 || check == 4 || check == 5) {
            await message.clickButton(message.components[0]?.components[1]);
            isBotFree = true;
          } else if (check == 6) {
            await message.clickButton(message.components[0]?.components[2]);
            isBotFree = true;
          }
        }
      } catch (err) {
        console.error(err)
      }
    };

    // =================== Stream End ===================

    // =================== Update Balance Start ===================


    if (message?.embeds[0]?.fields[1]?.name?.includes("Current Wallet Balance")) {
      wallet = Number(message?.embeds[0]?.fields[1].value?.replace("⏣ ", "")?.replace(/,/g, ""));
      bank = Number(message?.embeds[0]?.fields[2].value?.replace("⏣ ", "")?.replace(/,/g, ""));

      console.log(`@${chalk.magentaBright(client.user.username)}: ${chalk.cyan(`Wallet: ${wallet}`)}, ${chalk.cyan(`Bank: ${bank}`)}`);
    }

    // =================== Update Balance End ===================

    // =================== Serverevents Donate Start ===================
    if (message?.interaction?.commandName?.includes("serverevents donate") && message?.embeds[0]?.title?.includes("Pending Confirmation")) {
      if (!message.components[0].components[1]) return;
      await clickButton(message, message.components[0].components[1]);
      allItemsInInventory.shift();
      await wait(randomInt(1500, 2000))
      if (allItemsInInventory.length <= 0) return message.channel.sendSlash(botid, "inventory")
      await message.channel.sendSlash(botid, "serverevents donate", allItemsInInventory[0].quantity, allItemsInInventory[0].item)
    }


    if (message?.embeds[0]?.title?.includes("Server Pool")) {
      if (!config.serverEventsDonate.payout) return;

      let coins = message.embeds[0].description.split("\n")[4].split("⏣ ")[1].replaceAll(',', '');
      if (coins > 0 && config.serverEventsDonate.payout) await message.channel.sendSlash(botid, "serverevents payout", config.serverEventsDonate.mainUserId, coins)

      message.embeds[0].description.split("\n").forEach((line) => {
        if (/` +([0-9,]+)/gm.test(line)) {
          let quantity = line.match(/` +([0-9,]+)/gm)[0]?.replace("`")?.trim()?.replaceAll(',', '')?.match(/\d+/)[0];
          let item = line.match(/> .*/gm)[0]?.replace("> ", "")?.trim();
          if (!quantity || !item) return;
          console.log(`${item}: ${quantity}`)
          itemsToPayout.push({
            item: item,
            quantity: quantity
          });
        }
      });

      if (itemsToPayout.length <= 0) return console.log(`@${chalk.magentaBright(client.user.username)}: ${chalk.cyan(`Server Pool Empty`)} `)
      await message.channel.sendSlash(botid, "serverevents payout", config.serverEventsDonate.mainUserId, itemsToPayout[0].quantity, itemsToPayout[0].item)
    }

    if (config.serverEventsDonate.enabled && message?.embeds[0]?.author?.name?.includes(`${client.user.username}'s inventory`)) {
      let inputString = message.embeds[0].description;
      const regex = /([a-zA-Z0-9 ☭']+)\*\* ─ ([0-9,]+)/gm;

      let i = 0;
      inputString.match(regex).forEach(async (item) => {
        const itemName = item.trim().split("** ─ ")[0];
        const itemQuantity = item.trim().split("** ─ ")[1]?.replaceAll(',', '');
        if (config.serverEventsDonate.blacklist.includes(itemName)) return i++;
        console.log(`${itemName}: ${itemQuantity}`)
        if (i > 7) await clickButton(message, message.components[1].components[2])
        allItemsInInventory.push({
          item: itemName,
          quantity: itemQuantity
        });
      });


      if (allItemsInInventory.length <= 0) {
        if (!isOneAccPayingOut && config.serverEventsDonate.payout && client.token.includes(config.serverEventsDonate.tokenWhichWillPayout)) {
          message.channel.sendSlash(botid, "serverevents pool")
          isOneAccPayingOut = true;
        } else if (i > 7) return clickButton(message, message.components[1].components[2])
        return console.log(`@${chalk.magentaBright(client.user.username)}: ${chalk.cyan(`Donated all items`)}`)
      }

      await message.channel.sendSlash(botid, "serverevents donate", allItemsInInventory[0].quantity, allItemsInInventory[0].item)
    }
    // =================== Serverevents donate End ===================

    // =================== Autoadventure Start ===================

    if (message?.embeds[0]?.author?.name?.includes("Choose an Adventure")) {
      const PlatformMenu = message.components[0].components[0];

      await wait(randomInt(config.cooldowns.buttonClickDelay.minDelay, config.cooldowns.buttonClickDelay.maxDelay * 2));
      // const Platforms = PlatformMenu.options.map((opt) => opt.value);
      // console.log(Platforms)
      await message.selectMenu(PlatformMenu, [config.adventure]);

      if (message.components[1].components[0].disabled) {
        isPlayingAdventure = false;
        if (!message.embeds[0]?.description?.match(/<t:\d+:t>/)[0]) return (isPlayingAdventure = false);
        const epochTimestamp = Number(message.embeds[0]?.description?.match(/<t:\d+:t>/)[0]?.replace("<t:", "")?.replace(":t>", ""));
        const remainingTime = epochTimestamp * 1000 - Date.now();
        console.log('@' + client.user.username + ": Adventure is on cooldown for " + remainingTime / 1000 + " seconds");
        isPlayingAdventure = false;
        return setTimeout(() => {
          queueCommands.push({
            command: "adventure"
          });
          isPlayingAdventure = true;
        }, remainingTime + randomInt(8000, 15000));
      }

      await clickButton(message, message.components[1].components[0]).then(() => {
        isPlayingAdventure = true;
        setTimeout(async () => {
          isPlayingAdventure = false;
        }, 300000)
      });
    }

    autoAdventure(message);
    // =================== Autoadventure End ===================

    // =================== AutoBuy Start ===================

    if (message?.flags?.has("EPHEMERAL") && message?.embeds[0]?.description?.includes("You don't have a ") && config.autoBuy) {
      let missingItems = ["Hunting Rifle", "Fishing Pole", "Shovel"];

      missingItems.forEach(async (item) => {
        if (message?.embeds[0]?.description?.includes(item.toLocaleLowerCase())) {
          buyFromShop(45000, item);
        }
      })

    } else if (message?.embeds[0]?.title?.includes("Missing Items") && config.autoBuy) {
      ["Mouse", "Keyboard"].forEach(async (item) => {
        if (message?.embeds[0]?.description?.includes(item)) buyFromShop(100000, item);
      })
    };

    // =================== AutoBuy End ===================

    // =================== Balance Updater Start ===================
    if (message?.embeds[0]?.title?.includes(`${client.user.username}'s Balance`)) {
      let fields = message?.embeds[0]?.fields;
      wallet = Number(fields.filter(n => n.name === 'Pocket')[0].value.slice(2).replaceAll(',', ''));
      bank = Number(fields.filter(n => n.name === 'Bank')[0].value.slice(2).replaceAll(',', ''));
      invNet = Number(fields.filter(n => n.name === 'Inventory Net')[0].value.slice(2).replaceAll(',', ''));
      market = Number(fields.filter(n => n.name === 'Market Net')[0].value.slice(2).replaceAll(',', ''));
      totalNet = Number(fields.filter(n => n.name === 'Total Net')[0].value.slice(2).replaceAll(',', ''));

      if (config.serverEventsDonate.enabled && wallet > 0) await message.channel.sendSlash(botid, "serverevents donate", wallet.toString());

      db.set(client.user.id + ".wallet", wallet);
      db.set(client.user.id + ".bank", bank);
      db.set(client.user.id + ".invNet", invNet);
      db.set(client.user.id + ".market", market);
      db.set(client.user.id + ".totalNet", totalNet);

      if (config.devMode) console.log(`@${chalk.magentaBright(client.user.username)}: ${chalk.blue(`Wallet: ${wallet}`)}, ${chalk.blue(`Bank: ${bank}`)}, ${chalk.blue(`Inventory Net: ${invNet}`)}, ${chalk.blue(`Market Net: ${market}`)}, ${chalk.blue(`Total Net: ${totalNet}`)} `);
    }

    // =================== Balance Updater End ===================

    // =================== Crime Command Start ===================

    if (message?.embeds[0]?.description?.includes("What crime do you want to commit?")) {
      if (config.crimeLocations?.length == 0) {
        await clickRandomButton(message, 0);
        isBotFree = true;
      } else {
        const components = message.components[0]?.components;
        if (!components?.length) return;
        config.crimeLocations = config.crimeLocations?.map((location) => location.toLowerCase());

        let buttonToClick = undefined;
        for (let a = 0; a < 3; a++) {
          let btn = components[a];
          if (config.crimeLocations?.includes(btn?.label.toLowerCase())) {
            buttonToClick = btn;
            break;
          }
        }

        if (buttonToClick == undefined) {
          await clickRandomButton(message, 0);
          isBotFree = true;
        } else {
          await clickButton(message, buttonToClick);
          isBotFree = true;
        }
      }
    }

    // =================== Crime Command End ===================

    // =================== Search Command Start ===================

    if (
      message?.embeds[0]?.description?.includes("Where do you want to search?")
    ) {
      if (config.searchLocations.length == 0) {
        await clickRandomButton(message, 0);
        isBotFree = true;
      } else {
        const components = message.components[0]?.components;
        if (!components?.length) return;
        config.searchLocations = config.searchLocations.map((location) => location.toLowerCase());

        let buttonToClick = undefined;
        for (let a = 0; a < 3; a++) {
          let btn = components[a];
          if (config.searchLocations?.includes(btn?.label.toLowerCase())) {
            buttonToClick = btn;
            break;
          }
        }

        if (buttonToClick == undefined) {
          await clickRandomButton(message, 0);
          isBotFree = true;
        } else {
          await clickButton(message, buttonToClick);
          isBotFree = true;
        }
      }
    }

    // =================== Search Command End ===================

    // =================== Highlow Command Start ===================

    if (message?.embeds[0]?.description?.includes(`I just chose a secret number between 1 and 100.`)) {
      let numberChosen = parseInt(message.embeds[0].description.split(" **")[1].replace("**?", "").trim());

      const components = message.components[0]?.components;
      if (!components?.length || components[numberChosen > 50 ? 0 : 2].disabled) return;
      let btn = components[numberChosen > 50 ? 0 : 2];
      await clickButton(message, btn);
      isBotFree = true;
    }

    // =================== Highlow Command End ===================

    // =================== Trivia Command Start ===================

    if (message.embeds[0]?.description?.includes(" seconds to answer*")) {
      let question = message.embeds[0].description.replace(/\*/g, "").split("\n")[0].split('"')[0];

      let answer = await findAnswer(question);
      if (answer) {
        if (Math.random() < config.triviaOdds) {
          let flag = false;
          const components = message.components[0]?.components;
          let btn;
          if (components?.length == NaN) return;
          for (let i = 0; i < components.length; i++) {
            if (components[i].label.includes(answer)) {
              btn = components[i];
              flag = true;
              await wait(randomInt(config.cooldowns.triviaCooldown.minDelay, config.cooldowns.triviaCooldown.maxDelay));
              await clickButton(message, btn);
              isBotFree = true;
            }
          }
          if (!flag || answer === undefined) {
            await wait(randomInt(config.cooldowns.triviaCooldown.minDelay, config.cooldowns.triviaCooldown.maxDelay));

            await clickRandomButton(message, 0);
            isBotFree = true;
          }
        } else {
          await wait(randomInt(config.cooldowns.triviaCooldown.minDelay, config.cooldowns.triviaCooldown.maxDelay));

          await clickRandomButton(message, 0);
          isBotFree = true;
        }
      } else {
        await wait(randomInt(config.cooldowns.triviaCooldown.minDelay, config.cooldowns.triviaCooldown.maxDelay));

        await clickRandomButton(message, 0);
        isBotFree = true;
      }
    }

    // =================== Trivia Command End ===================

    // =================== Minigame Start ===================

    playMinigames(message);

    // =================== Minigame End ===================

    // =================== PostMeme Command Start ===================

    if (message.embeds[0]?.description?.includes("Pick a meme type and a platform to post a meme on!")) {
      const PlatformMenu = message.components[0].components[0];
      const MemeTypeMenu = message.components[1].components[0];
      const Platforms = PlatformMenu.options.map((opt) => opt.value);
      const MemeTypes = MemeTypeMenu.options.map((opt) => opt.value);

      const MemeType = MemeTypes[Math.floor(Math.random() * MemeTypes.length)];
      const Platform = config.postMemesPlatforms.length > 0 ? config.postMemesPlatforms[Math.floor(Math.random() * config.postMemesPlatforms.length)] : Platforms[Math.floor(Math.random() * Platforms.length)];
      await wait(randomInt(config.cooldowns.buttonClickDelay.minDelay, config.cooldowns.buttonClickDelay.maxDelay * 2));
      await message?.selectMenu(PlatformMenu, [Platform]);

      await wait(randomInt(config.cooldowns.buttonClickDelay.minDelay, config.cooldowns.buttonClickDelay.maxDelay * 2));
      await message?.selectMenu(MemeTypeMenu, [MemeType]);

      await wait(randomInt(config.cooldowns.buttonClickDelay.minDelay, config.cooldowns.buttonClickDelay.maxDelay * 2));

      await clickButton(message, message.components[2]?.components[0]);
      isBotFree = true;
    }

    // =================== PostMeme Command End ===================

    // =================== Work Command Start ===================

    if (message.embeds[0]?.description?.includes(`You don't currently have a job to work at.`)) {
        queueCommands.push({
            command: "work apply",
            args: [(!config.jobToApply || config.jobToApply === '') ? 'House Wife' : config.jobToApply]
        });
    }

    if (message.embeds[0]?.title?.includes('Available Jobs')) clickButton(message.components[0]?.components[0])

    if (message.embeds[0]?.title?.includes('Congratulations, you are now working as a')) {
        queueCommands.push({
            command: "work shift"
        });
    }
 
    // =================== Work Command End ===================

    // =================== Pet Command Start ===================

    if (config.pets.autoPet) {
      if (message.embeds[0]?.description?.includes('You don\'t own any pets')) {
        queueCommands.push({
          command: 'pets buy'
        })
      }

      if (message.embeds[0]?.description?.includes('Dank Memer\'s Pet Store')) {
        let petToBuy = config.pets.preferredPet;                
        let petMenu = message.components[0].components[0];
        await message.selectMenu(petMenu, [petToBuy]);
      }
    }

    if (message.embeds[0]?.description?.includes('You successfully bought a')) {
      queueCommands.push({
        command: 'pets care'
      })
    }

    if (message.interaction?.type === 'APPLICATION_COMMAND' && message.interaction?.commandName === 'pets care') {
      await autoPets(message);
    };

    // =================== Pet Command End ===================
  });

  client.login(token).catch((err) => {
    if (err.toString().includes("TOKEN_INVALID")) {
      console.log(`${chalk.redBright("ERROR:")} ${chalk.blueBright("The token you provided is invalid")} - ${chalk.blue(token)}`);
    }
  });

  async function playMinigames(message) {
    let description = message?.embeds[0]?.description?.replace(/<a?(:[^:]*:)\d+>/g, "$1");
    let positions = description?.split("\n").slice(1).map((e) => e.split(":").filter((e) => e !== ""));

    if (description?.includes("Dodge the Fireball!")) {
      let fireballPostion = positions[1].length - 1;
      let safePostion = ["Left", "Middle", "Right"].filter((e, idx) => idx !== fireballPostion);

      let buttons = message.components[0]?.components;
      let btn = buttons.filter((e) => safePostion.includes(e.label))[randomInt(0, 1)];

      message.clickButton(btn);
    } else if (description?.includes("Catch the fish!")) {
      let fishPosition = positions[0].length - 1;
      let btn = message.components[0]?.components[fishPosition];
      await message.clickButton(btn);
      isBotFree = true;
    } else if (description?.includes("Dunk the ball!")) {
      let ballPostion = positions[0].length - 1;
      let btn = message.components[0]?.components[ballPostion];
      await message.clickButton(btn);
      isBotFree = true;
    } else if (description?.includes("Hit the ball!")) {
      let goalkeeperPostion = positions[1].length - 1;
      let safePostion = ["Left", "Middle", "Right"].filter((e, idx) => idx !== goalkeeperPostion);
      let buttons = message.components[0]?.components;
      let btn = buttons.filter((e) => safePostion.includes(e.label))[randomInt(0, 1)];
      await message.clickButton(btn);
      isBotFree = true;
    } else if (description?.includes('Look at the emoji closely!')) {
      emoji = description.split('\n')[1].trim();
      isBotFree = false;
    } else if (description?.includes('What was the emoji?')) {
      let found = message.components[0]?.components?.filter(a => a.emoji.name === emoji.replaceAll(':', ''))[0];
      if (!found) found = message.components[1]?.components?.filter(a => a.emoji.name === emoji.replaceAll(':', ''))[0];
      await clickButton(message, found);
      emoji = '';
      isBotFree = true;
    } else if (description?.includes('Look at each color next to the words closely!')) {
      emoji = description;
      isBotFree = false;
    } else if (description?.includes('Remember words order!')) {
      emoji = description;
      isBotFree = false;
    } else if (description?.includes('What color was next to the word')) {
      let line = emoji.split('\n')
        .filter(a => a.toLowerCase().includes(description?.split('What color was next to the word ')[1].slice(0, -1)));
      let color = line[0].trim().split(':')[1];
      await clickButton(message, message.components[0]?.components.filter(a => a.label.toLowerCase() === color.toLowerCase())[0]);
      emoji = '';
      isBotFree = true;
    } else if (description?.includes('Click the buttons in correct order!')) {
      if (isHandling) return;
      isHandling = true;
      for (let i = 1; i < 6; i++) {
        try {
          let toclick = emoji.replaceAll('`', '').split('\n')[i].trim();
          await clickButton(message, message.components[0]?.components?.filter(a => a.label === toclick)[0]);
          await wait(randomInt(config.cooldowns.buttonClickDelay.minDelay, config.cooldowns.buttonClickDelay.maxDelay * 2));
        } catch(err) {
          console.log(err);
          isBotFree = true;
          emoji = '';
        }
      };
      emoji = '';
      isBotFree = true;
      isHandling = false;
    }
  }

  async function autoPets(message) {
    if (message.embeds[0]?.description?.includes('You can\'t interact with your pet right now.')) {
      console.log(`@${client.user.username}: pet burnt out`)
      setTimeout(() => {
        queueCommands.push({
          command: 'pets care'
        })
      }, randomInt(30 * 60 * 1000, 30 * 2 * 60 * 1000))
      return;
    };

    let fields = message.embeds[0]?.fields;

    let petHunger = Number(fields.filter(a => a.name === 'Hunger')[0].value.match(/\(([^)]+)\)/)[1].slice(0, -1));
    let petCleanliness = Number(fields.filter(a => a.name === 'Hygiene')[0].value.match(/\(([^)]+)\)/)[1].slice(0, -1));
    let petFun = Number(fields.filter(a => a.name === 'Fun')[0].value.match(/\(([^)]+)\)/)[1].slice(0, -1));

    if (petHunger < 70) clickButton(message, message.components[0].components[0])
    else if (petCleanliness < 70) clickButton(message, message.components[0].components[1])
    else if (petFun < 70) clickButton(message, message.components[0].components[2])
    else {
      await clickButton(message, message.components[1].components[1])
      await clickButton(message, message.components[1].components[2])
    };

    console.log(`Hunger: ${petHunger}, Hygeine: ${petCleanliness}, Fun: ${petFun}`);
  }

  async function autoAdventure(newMessage) {
    if (!newMessage?.interaction.commandName.includes("adventure")) return;
    if (!newMessage.interaction) return;
    if (!newMessage.components[0]) return;
    if (newMessage?.embeds[0]?.title?.includes(client.user.username + ", choose items you want to take with you")) return;
    if (newMessage?.embeds[0]?.author?.name?.includes("Adventure Summary")) {
      isPlayingAdventure = false;

      let btn = newMessage.components[0].components[0];
      let btnLabel = btn.label;
      let time = btnLabel.match(/in \d+ minutes/)[0]?.replace("in ", "")?.replace(" minutes", "");

      console.log(`@${client.user.username}: Finished playing adventure. Next adventure in ${time} minutes`);

      setTimeout(() => {
        queueCommands.push({
          command: "adventure"
        });
      }, randomInt(Number(time) * 60 * 1000, Number(time) * 1.1 * 60 * 1000));
    }

    if (newMessage?.components[0]?.components[1]?.disabled) return clickButton(newMessage, newMessage.components[1].components[1]);
    if (!newMessage?.components[1]?.components[1]) return clickButton(newMessage, newMessage.components[0].components[1]);

    const database = require(`./adventures/${config.adventure}.json`).database;

    const answer = database.find((e) => e.name.includes(newMessage?.embeds[0]?.description?.split("<")[0]?.split("\n")[0]?.trim()))?.click;
    let found = false;
    if (answer) {
      for (let i = 0; i < newMessage.components.length; i++) {
        for (let j = 0; j < newMessage.components[i].components.length; j++) {
          if (newMessage?.components[i]?.components[j]?.label?.toLowerCase()?.includes(answer.toLowerCase())) {
            found = true;
            await clickButton(newMessage, newMessage.components[i].components[j]);
            await wait(200)
            if (!newMessage.components[i].components[j].disabled) await clickButton(newMessage, newMessage.components[i].components[j]);
            await clickButton(newMessage, newMessage.components[1].components[1])
            await wait(250)
            if (!newMessage.components[1].components[1].disabled) await clickButton(newMessage, newMessage.components[1].components[1])
          }
        }
      }

      if (!found) {
        await clickButton(newMessage, newMessage.components[0].components[randomInt(0, newMessage.components[0].components.length - 1)]).then(() => {
          setTimeout(async () => {
            isPlayingAdventure = false;
          }, 300000)
        });
      }
    } else {
      if (newMessage?.embeds[0]?.description?.includes("Catch one of em!")) {
        await clickButton(newMessage, newMessage.components[0].components[2]);
        await wait(randomInt(config.cooldowns.buttonClickDelay.minDelay, config.cooldowns.buttonClickDelay.maxDelay));
        await clickButton(newMessage, newMessage.components[1].components[1]);
        return;
      }

      await clickButton(newMessage, newMessage.components[0].components[randomInt(0, newMessage.components[0].components.length - 1)]);
    }
  }

  async function buyFromShop(cost, item, quantity = "1") {
    if (wallet < cost && bank < cost && !(wallet + bank >= cost)) {
      if (config.devMode) console.log(`@${chalk.magentaBright(client.user.username)}: ${chalk.blue(`Not enough money to buy ${item}`)}`);
      return;
    }

    if (wallet < cost && bank >= cost) {
      if (config.devMode) console.log(`@${chalk.magentaBright(client.user.username)}: ${chalk.blue(`Withdrawing money to buy ${item}`)}`);
      queueCommands.push({
        command: "withdraw",
        args: [`${cost}`],
      });
      bank -= cost;
    }
    if (bank + wallet >= cost && wallet < cost && bank < cost) {
      if (config.devMode) console.log(`@${chalk.magentaBright(client.user.username)}: ${chalk.blue(`Withdrawing money to buy ${item}`)}`);
      queueCommands.push({
        command: "withdraw",
        args: ["max"]
      });
      bank -= cost;
    }

    queueCommands.push({
      command: "shop buy",
      args: [item, quantity]
    });

    wallet -= cost;
    if (config.devMode) console.log(`@${chalk.magentaBright(client.user.username)}: ${chalk.yellowBright(`Bought ${item}`)}`);
  }

  async function randomCommand(onGoingCommands, channel, client, queueCommands) {
    const commands = config.commands;
    const randomCommand = commands[Math.floor(Math.random() * commands.length)];
    if (botNotFreeCount > 5) {
      botNotFreeCount = 0;
      isBotFree = true;
    }
    if (!isBotFree) return botNotFreeCount++;
    let command = randomCommand.command;
    if (isDeadMeme && command == "postmemes") return;
    if (onGoingCommands.includes(command)) return;
    if (queueCommands.length > 0) {
      if (queueCommands[0]?.command) {
        if (queueCommands.length <= 0) return queueCommands.shift();
        else {
          return channel.sendSlash(botid, queueCommands[0].command, queueCommands[0].args ? queueCommands[0].args : []).then(() => {
            queueCommands.shift();

            console.log(`
              @${chalk.magentaBright(client.user.username)}: ${chalk.blue(
                "Sent queued command"
              )} - ${chalk.green(queueCommands[0].command)} `
            );
          }).catch((err) => {
            queueCommands.shift();
          });
        }
      } else {
        return queueCommands.shift();
      }
    }

    if (isPlayingAdventure) return;
    if (randomInt(1, 75) == 4) {
      queueCommands.push({
        command: "balance",
      });
      if (config.devMode) console.log(`@${chalk.magentaBright(client.user.username)}: ${chalk.blue("Queued balance command")} `);
    } else {
      if (randomInt(1, 75) == 4 && config.autoDeposit) {
        queueCommands.push({
          command: "deposit",
          args: ["max"],
        });
        if (config.devMode) console.log(`@${chalk.magentaBright(client.user.username)}: ${chalk.yellowBright("Deposited all the coins in the bank")} `);
      }
    }
    if (command === "search" || command === "crime" || command === "highlow" || command === "trivia" || command === "postmemes" || command === "stream") isBotFree = false;

    await channel.sendSlash(botid, command);
    if (config.devMode) console.log(`@${chalk.magentaBright(client.user.username)}: ${chalk.blue(command)}`);
    onGoingCommands.push(command);

    setTimeout(() => {
      removeAllInstances(onGoingCommands, command);
    }, randomInt(randomCommand.cooldown * 0.9, randomCommand.cooldown * 1.1));
  }

  function removeAllInstances(arr, item) {
    for (let i = arr.length; i--;) {
      if (arr[i] === item) arr.splice(i, 1);
    }
  }

  async function main(onGoingCommands, channel, client, queueCommands, isOnBreak) {
    let commandCooldown = randomInt(config.cooldowns.commandInterval.minDelay, config.cooldowns.commandInterval.maxDelay);
    let shortBreakCooldown = randomInt(config.cooldowns.shortBreak.minDelay, config.cooldowns.shortBreak.maxDelay);

    let longBreakCooldown = randomInt(config.cooldowns.longBreak.minDelay, config.cooldowns.longBreak.maxDelay);
    if (isOnBreak) return;
    let actualDelay;
    randomCommand(onGoingCommands, channel, client, queueCommands);

    if (Math.random() < config.cooldowns.shortBreak.frequency) {
      actualDelay = shortBreakCooldown;
      isOnBreak = true;
      console.log(`@${chalk.magentaBright(client.user.username)}: ${chalk.gray("Short break for")} ${chalk.yellowBright((shortBreakCooldown / 1000).toFixed(1))} seconds`);
    } else if (Math.random() < config.cooldowns.longBreak.frequency) {
      actualDelay = longBreakCooldown;
      isOnBreak = true;
      console.log(`@${chalk.magentaBright(client.user.username)}: ${chalk.gray("Long break for")} ${chalk.yellowBright((longBreakCooldown / 1000).toFixed(1))} seconds`);
    } else {
      isOnBreak = false;
      actualDelay = commandCooldown;
    }

    setTimeout(() => {
      isOnBreak = false;
      main(onGoingCommands, channel, client, queueCommands, isOnBreak);
    }, actualDelay);
  }
}

async function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function clickRandomButton(message, rows) {
  const components = message.components[randomInt(0, rows)]?.components;
  if (!components?.length) return;
  let btn = components[Math.floor(Math.random() * components?.length)];
  return message.clickButton(btn)
}

async function clickButton(message, btn) {
  setTimeout(async () => {
    await message.clickButton(btn?.customId);
  }, randomInt(config.cooldowns.buttonClickDelay.minDelay, config.cooldowns.buttonClickDelay.maxDelay));
}

async function findAnswer(question) {
  const trivia = require('./trivia.json');
  for (let i = 0; i < trivia.database.length; i++) {
    if (trivia.database[i].question.includes(question)) return trivia.database[i].correct_answer;
  }
}

function formatConsoleDate(date) {
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  return chalk.cyanBright('[' + ((hour < 10) ? '0' + hour : hour) + ':' + ((minutes < 10) ? '0' + minutes : minutes) + ':' + ((seconds < 10) ? '0' + seconds : seconds) + '] - ')
}

if (!config.devMode) {
  let log = console.log;
  let error = console.error;

  console.log = function () {
    let first_parameter = arguments[0];
    let other_parameters = Array.prototype.slice.call(arguments, 1);

    const msg = stripAnsi([...arguments].join(' '));

    if (config?.webhookLogging && config?.webhook) {
      try {
        webhook.send(new MessageBuilder().setDescription(msg).setColor(`#2e3236`))
      } catch (err) {
        console.log(err)
      }
    }

    logs.push(`<p>${msg}</p>`);
    log.apply(console, [formatConsoleDate(new Date()) + first_parameter].concat(other_parameters));
  };



  console.error = function () {
    let first_parameter = arguments[0];
    let other_parameters = Array.prototype.slice.call(arguments, 1);

    const msg = stripAnsi([...arguments].join(' '));

    logs.push(`<p style="color:red;">${msg}</p>`);
    error.apply(console, [formatConsoleDate(new Date()) + first_parameter].concat(other_parameters));
  };
};
