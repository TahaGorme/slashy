// Version 2.0.9
const version = "2.0.9";




const chalk = require("chalk");
console.log(chalk.red(`Welcome to Slashy!`))
console.log(chalk.yellowBright(`Don't know how to set up? Check our Github: \nhttps://github.com/tahagorme/slashy`))
console.log(chalk.cyanBright(`If you encounter any issues, join our Discord: \nhttps://discord.gg/ejEkDvZCzu`))
console.log(chalk.redBright(`Your version is: ${version}`))
var webhook;

const moleman_loc = [
  "<a:MoleMan:1022972147175526441><:emptyspace:827651824739156030><:emptyspace:827651824739156030>",
  "<:emptyspace:827651824739156030><a:MoleMan:1022972147175526441><:emptyspace:827651824739156030>",
  "<:emptyspace:827651824739156030><:emptyspace:827651824739156030><a:MoleMan:1022972147175526441>"
]

const worms_loc = [
  "<:emptyspace:827651824739156030><:Worm:864261394920898600><:Worm:864261394920898600>",
  "<:Worm:864261394920898600><:emptyspace:827651824739156030><:Worm:864261394920898600>",
  "<:Worm:864261394920898600><:Worm:864261394920898600><:emptyspace:827651824739156030>"
]
var isOneAccPayingOut = false;

const config = process.env.config
  ? JSON.parse(process.env.config)
  : require("./config.json");

const { Webhook, MessageBuilder } = require("discord-webhook-node");
if (config.webhookLogging && config.webhook) {
  webhook = new Webhook(config.webhook);
}

process.on("unhandledRejection", (error) => {
  if (
    error
      .toString()
      .includes("Cannot read properties of undefined (reading 'type')")
  )
    return;
  if (error.toString().includes("INTERACTION_TIMEOUT")) return;
  if (error.toString().includes("BUTTON_NOT_FOUND")) return;
  if (error.toString().includes("Invalid Form Body")) return;
  if (
    error
      .toString()
      .includes("COMPONENT_VALIDATION_FAILED: Component validation failed")
  )
    return;
  if (error.toString().includes("Cannot send messages to this user"))
    return console.error(
      chalk.red(
        "Make sure all of the users are in a server where Dank Memer is in"
      )
    );
  console.log(chalk.gray("—————————————————————————————————"));
  console.log(
    chalk.white("["),
    chalk.red.bold("Anti-Crash"),
    chalk.white("]"),
    chalk.gray(" : "),
    chalk.white.bold("Unhandled Rejection/Catch")
  );
  console.log(chalk.gray("—————————————————————————————————"));

  console.error("unhandledRejection", error);
});
var itemsToPayout = [];

process.on("uncaughtException", (error) => {
  console.log(chalk.gray("—————————————————————————————————"));
  console.log(
    chalk.white("["),
    chalk.red.bold("Anti-Crash"),
    chalk.white("]"),
    chalk.gray(" : "),
    chalk.white.bold("Uncaught Exception/Catch")
  );
  console.log(chalk.gray("—————————————————————————————————"));

  console.error("uncaughtException", error);
});

process.on("multipleResolves", (type, promise, reason) => {
  console.log(chalk.gray("—————————————————————————————————"));
  console.log(
    chalk.white("["),
    chalk.red.bold("Anti-Crash"),
    chalk.white("]"),
    chalk.gray(" : "),
    chalk.white.bold("Multiple Resolves")
  );
  console.log(chalk.gray("—————————————————————————————————"));
  console.log(type, promise, reason);
});





const fs = require("fs-extra");

const SimplDB = require("simpl.db");
const stripAnsi = require("strip-ansi");

const db = new SimplDB();

//the above is how my database looks like. print the wallet balance of all users using fs
const data = fs.readFileSync("database.json", "utf-8");
if (data) {
  const database = JSON.parse(data);
  for (const [key, value] of Object.entries(database)) {
    if (db.has(key + ".wallet"))
      db.delete(key + ".wallet");
    if (db.has(key + ".bank"))
      db.delete(key + ".bank");
    if (db.has(key + ".invNet"))
      db.delete(key + ".invNet");
    if (db.has(key + ".market"))
      db.delete(key + ".market");
    if (db.has(key + ".totalNet"))
      db.delete(key + ".totalNet");
  }
}
const axios = require("axios");


axios
  .get("https://raw.githubusercontent.com/TahaGorme/slashy/main/index.js")
  .then(function (response) {
    var d = response.data;
    let v = d.match(/Version ([0-9]*\.?)+/)[0]?.replace("Version ", "");
    if (v) {
      console.log(chalk.bold("Version " + version));
      if (v !== version) {
        console.log(
          chalk.bold.bgRed(
            "There is a new version available: " +
            v +
            "           \nPlease update. " +
            chalk.underline(
              "https://github.com/TahaGorme/slashy"
            )
          )
        );
      }
    }
  })
  .catch(function (error) {
    console.log(error);
  });

var logs = [];

const express = require("express");
const app = express();
// parse application/json
app.use(express.json());
const port = 7600;
var websitePass = process.env.password || config.password;
const statusMonitor = require('express-status-monitor')();
app.use(statusMonitor);
app.get('/status', statusMonitor.pageRoute)

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/website/index.html");
});
app.get("/balance", (req, res) => {
  res.sendFile(__dirname + "/website/bal.html");
});

// app.get("/api/update", (req, res) => {
//   const password = req.headers.password;
//   if (!password) return;
//   if (password !== websitePass) return res.send("Invalid Password");

//   console.log(req.headers)
//   res.send("Hello")

//   // config.someKey = 'new value';
//   // fs.writeFileSync('config.json', JSON.stringify(config), 'utf8', (err) => {
//   //   if (err) throw err;
//   //   console.log('The config.json file has been updated!');
//   // });

//   // // Write the updated JSON data back to the file
//   // fs.writeFile('config.json', JSON.stringify(updatedConfig), 'utf8', (err) => {
//   //   if (err) throw err;
//   //   console.log('The config.json file has been updated!');
//   // });
// });
app.get("/api/console", (req, res) => {
  const password = req.headers.password;
  if (!password) return;
  if (password !== websitePass) return res.send("Invalid Password");
  //return array as a text
  // res.send(logs.join("\n"));

  const html = logs.map(msg => {
    return msg;
  }).join('\n');

  res.send(html);
  // res.send(logs);
});


// app.post("/api/saveThings", (req, res) => {
//   const password = req.headers.password;
//   if (!password) return;
//   if (password !== websitePass) return res.send("Invalid Password");

//   var body = req.body.toString;
//   console.log(body)

// });

app.post("/api/saveThings", (req, res) => {
  const password = req.headers.password;
  if (!password) return;
  if (password !== websitePass) return res.send("Invalid Password");
  var b = req.body;

  // {"playInDms":true,"autoAdventure":true,"autoApple":true,"autoHorseShoe":true,"devMode":true,"autoDeposit":true,"autoBuy":true,"commands":[{"command":"beg","cooldown":45000},{"command":"fish","cooldown":35000},{"command":"hunt","cooldown":35000},{"command":"search","cooldown":25000},{"command":"dig","cooldown":35000},{"command":"crime","cooldown":45000},{"command":"highlow","cooldown":25000},{"command":"trivia","cooldown":45000},{"command":"postmemes","cooldown":25000}],"cooldowns":{"buttonClickDelay":{"minDelay":350,"maxDelay":400},"triviaCooldown":{"minDelay":350,"maxDelay":400},"shortBreak":{"minDelay":350,"maxDelay":400,"frequency":0.005},"longBreak":{"minDelay":350,"maxDelay":400,"frequency":0.005},"commandInterval":{"minDelay":350,"maxDelay":400}}}

  config.playInDms = b.playInDms;
  config.autoAdventure = b.autoAdventure;
  config.autoApple = b.autoApple;
  config.autoHorseShoe = b.autoHorseShoe;
  config.devMode = b.devMode;
  config.autoDeposit = b.autoDeposit;
  config.autoBuy = b.autoBuy;
  config.commands = b.commands;
  config.cooldowns = b.cooldowns;



  // config.someKey = 'new value';
  fs.writeFileSync('config.json', JSON.stringify(config, null, "\t"), 'utf8', (err) => {
    if (err) throw err;
    console.log('The config.json file has been updated!');
  });


  res.send("Config Updated")
});
app.get("/api/database", (req, res) => {

  const password = req.headers.password;
  if (!password) return;
  if (password !== websitePass) return res.send("Invalid Password");

  const data = db.toJSON();
  // console.log(JSON.stringify(data))
  res.json(data);
});
app.get("/api/config", (req, res) => {

  const password = req.headers.password;
  if (!password) return;
  if (password !== websitePass) return res.send("Invalid Password");

  res.send(config);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const { Client } = require("discord.js-selfbot-v13");
const tokens = process.env.tokens
  ? process.env.tokens.split("\n")
  : fs.readFileSync("tokens.txt", "utf-8").split("\n");
const botid = "270904126974590976";
var i = 0;

if (config.serverEventsDonate.payoutOnlyMode && config.serverEventsDonate.tokenWhichWillPayout && config.serverEventsDonate.enabled) {
  const client1 = new Client({
    checkUpdate: false
  });

  client1.on('ready', async () => {
    console.log(`${client1.user.username} is ready!`);

    const channel = await client1.channels.fetch(config.serverEventsDonate.payoutChannelID);
    if (!channel) return console.log("Invalid Channel ID for Serverevents donate - Please check config.json");
    // channel.send("Hello")
    channel.sendSlash(botid, "serverevents pool")
  })


  client1.on("messageCreate", async (message) => {


    if (message?.interaction?.commandName?.includes("serverevents payout") && message?.embeds[0]?.title?.includes("Pending Confirmation")) {
      if (!message.components[0].components[1]) return;
      await clickButton(message, message.components[0].components[1]);

      itemsToPayout.shift();
      await wait(randomInt(1500, 2000))

      if (itemsToPayout.length <= 0) {
        return message.channel.sendSlash(botid, "serverevents pool")
      }
      await message.channel.sendSlash(botid, "serverevents payout", config.serverEventsDonate.mainUserId, itemsToPayout[0].quantity, itemsToPayout[0].item)


    }



    if (message?.embeds[0]?.title?.includes("Server Pool")) {
      if (!config.serverEventsDonate.payout) return;

      //       **Total Net:**
      // ⏣ 5,476,907,868

      // **Coins:**
      // ⏣ 0

      // **Items**:
      // ` 2,831 ` <:Skunk:861390875992522792> Skunk
      // ` 2,696 ` <:Bunny:860665246875254784> Rabbit
      // ` 2,067 ` <:GraveStone:1029829993301291059> Gravestone
      // ` 1,713 ` <:sand:830509316901175366> Box of Sand
      // ` 1,457 ` <:Garbage:935631382590394398> Garbage
      // ` 1,373 ` <:CommonFish:957698195000025158> Common Fish
      // `   905 ` <:BlueBits:975398146249207808> Blue Plastic Bits
      // `   872 ` <:phone:830509316632346625> Cell Phone
      // `   732 ` <:Ant:864220608865763378> Ant
      // `   720 ` <:Deer:981686994524569710> Deer
      // `   714 ` <:Duck:920400262911373383> Duck
      // `   674 ` <:shreddedcheese:830509316933943307> Shredded Cheese
      // `   593 ` <:banknote:830509316888985621> Bank Note
      // `   572 ` <a:SeaWeed:887000050201419787> Seaweed
      // `   563 ` <:RareFish:971151079096061962> Rare Fish
      // `   446 ` <:Apple:887000049266069575> Apple
      // `   430 ` <:PepeStatue:993285762697146449> Pepe Statue
      // `   416 ` <:ExoticFish:970794371869995058> Exotic Fish
      // `   406 ` <a:StickBug:864568819795755038> Stickbug
      // `   388 ` <:JellyFish:971160094349869126> Jelly Fish
      console.log(message.embeds[0].description)
      var coins = message.embeds[0].description
        .split("\n")[4]
        .split("⏣ ")[1]
        .replaceAll(',', '');
      console.log(coins)

      if (coins > 0) {
        if (config.serverEventsDonate.payout) {
          await message.channel.sendSlash(botid, "serverevents payout", config.serverEventsDonate.mainUserId, coins)
        }
      }
      // var regex = /` +([0-9,]+)/gm;
      //    msg.match(regex).forEach((item) => {

      //   var quantity = item.split("`")[1].trim().replaceAll(',', '');
      //   var name = item.trim().split("`")[2].trim();

      //   console.log(`${name}: ${quantity}`)
      //   allItemsInInventory.push({
      //     item: name,
      //     quantity: quantity
      //   });
      // });


      // message.embeds[0].description.split("\n")
      //print all lines
      message.embeds[0].description.split("\n").forEach((line) => {
        if (/` +([0-9,]+)/gm.test(line)) {
          var quantity = line.match(/` +([0-9,]+)/gm)[0]?.replace("`")?.trim()?.replaceAll(',', '')?.match(/\d+/)[0];
          var item = line.match(/> .*/gm)[0]?.replace("> ", "")?.trim();
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




      var name = message.embeds[0].description
        .split("\n")[7]
        .split("> ")[1];
      var quantity = message.embeds[0].description
        .split("\n")[7]
        .split("x`")[0]
        .split("`")[1];
      // console.log(name)
      // console.log(quantity)

      quantity = quantity?.replaceAll(',', '');

      // channel.sendSlash(botid, "serverevents payout", config.serverEventsDonate.mainUserId, quantity, name)

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
}
async function start(token, channelId) {

  // console.log(channelId)
  var onGoingCommands = [];
  var allItemsInInventory = [];
  var queueCommands = [];
  var isBotFree = true;
  var isOnBreak = false;
  var fishing = 0;
  var ammo = 0;
  var botNotFreeCount = 0;
  var isDeadMeme = false;
  var isPlayingAdventure = false;
  var wallet = 0;
  var bank = 0;
  var totalNet = 0;
  var market = 0;
  var invNet = 0;
  var horseShoes = 0;
  // randomCommand(onGoingCommands);
  const client = new Client({
    checkUpdate: false,
  });
  var channel;
  client.on("rateLimit", (rateLimitInfo) => {
    console.log(chalk.white.bold(client.user.tag + " - Rate Limited"));
    console.log(chalk.gray(rateLimitInfo));
  });
  client.on("ready", async () => {
    client.user.setStatus("invisible");

    console.log(
      `${chalk.green("Logged in as")} ${chalk.blue(client.user.tag)}`
    );

    const user = await client.users.fetch(botid);
    const createdDm = await user.createDM();

    if (config.playInDms) {
      channelId = createdDm.id;
    }

    channel = await client.channels.fetch(channelId);
    // channel.send("HELLO")


    //check if its been 15 hours
    // if (
    //   !db.get(client.user.id + ".daily") ||
    //   Date.now() - db.get(client.user.id + ".daily") > 15 * 60 * 60 * 1000
    // ) {
    //   await channel
    //     .sendSlash(botid, "daily")
    //     .then(() => {
    //       db.set(client.user.id + ".daily", Date.now());
    //       console.log(chalk.yellow(`${client.user.tag} claimed daily`));
    //     })
    //     .catch((e) => {
    //       return;
    //     });
    // }


    if (config.autoDaily) {
      const now = Date.now();
      const gmt0 = new Date(now).setUTCHours(0, 0, 0, 0);
      var remainingTime;
      if (now > gmt0) {
        const nextGmt0 = new Date(gmt0).setUTCDate(new Date(gmt0).getUTCDate() + 1);
        remainingTime = nextGmt0 - now;
      } else {
        remainingTime = gmt0 - now;
      }

      // console.log(`Time remaining until GMT 0:00: ${remainingTime} milliseconds`);

      if (!db.has(client.user.id + ".daily")) {
        await channel.sendSlash(botid, "daily")
        console.log(chalk.yellow(`${client.user.tag} claimed daily`));

        db.set(client.user.id + ".daily", Date.now());
      }


      if (db.get(client.user.id + ".daily") && Date.now() - db.get(client.user.id + ".daily") > remainingTime) {
        await channel
          .sendSlash(botid, "daily")
          .then(() => {
            db.set(client.user.id + ".daily", Date.now());
            console.log(chalk.yellow(`${client.user.tag} claimed daily`));

            setInterval(async () => {
              queueCommands.push({
                command: "daily"
              });
              db.set(client.user.id + ".daily", Date.now());
              console.log(chalk.yellow(`${client.user.tag} claimed daily`));
            }, remainingTime + randomInt(10000, 60000));
          })
          .catch((e) => {
            return console.log(e);
          });

      }
    }

    if (config.serverEventsDonate.enabled && config.playInDms) {
      return console.log(chalk.redBright("Server Events Donate is not supported in DMs. Please disable playInDms in config.json and add channel ids before the tokens in tokens.txt in the format <channelid> <token>"))
    }
    if (config.serverEventsDonate.enabled) {
      await channel.sendSlash(botid, "withdraw", "max")
    }
    await channel.sendSlash(botid, "balance").catch((e) => {
      return console.log(e);
    });

    db.set(client.user.id + ".username", client.user.tag);

    if (config.serverEventsDonate.enabled) {
      return channel.sendSlash(botid, "inventory")
    }



    if (
      !db.get(client.user.id + ".apple") ||
      Date.now() - db.get(client.user.id + ".apple") > 24 * 60 * 60 * 1000
    ) {
      if (config.autoApple) {
        setTimeout(async () => {
        await channel
          .sendSlash(botid, "use", "apple")
          .then(() => {
            setInterval(() => {
              queueCommands.push({
                command: "use",
                args: ["apple"]
              });
            }, 1000 * 60 * 60 * 24.01);
          })
          .catch((e) => {
            return console.error(e);
          });
    }, randomInt(5000, 150000))
      }
    }
      
    if (
      !db.get(client.user.id + ".horseshoe") ||
      Date.now() - db.get(client.user.id + ".horseshoe") > 0.25 * 60 * 60 * 1000
    ) {
      if (config.autoHorseShoe) {
        setTimeout(async () => {
        await channel
          .sendSlash(botid, "use", "lucky horseshoe")
          .then(() => {
            setInterval(() => {
              queueCommands.push({
                command: "use",
                args: ["lucky horseshoe"]
              });
            }, 1000 * 60 * 60 * 0.26);
          })
          .catch((e) => {
            return console.error(e);
          });
    }, randomInt(5000, 150000))
    }
    }
                   
      
    if (
      !db.get(client.user.id + ".ammo") ||
      Date.now() - db.get(client.user.id + ".ammo") > 1 * 60 * 60 * 1000
    ) {
      if (config.autoAmmo) {
        setTimeout(async () => {
        await channel
          .sendSlash(botid, "use", "ammo")
          .then(() => {
            setInterval(() => {
              queueCommands.push({
                command: "use",
                args: ["ammo"]
              });
            }, 1000 * 60 * 60 * 1.01);
          })
          .catch((e) => {
            return console.error(e);
          });
    }, randomInt(5000, 150000))
    }
    }
      
    if (
      !db.get(client.user.id + ".bait") ||
      Date.now() - db.get(client.user.id + ".bait") > 1 * 60 * 60 * 1000
    ) {
      if (config.autoFishingBait) {
        setTimeout(async () => {
        await channel
          .sendSlash(botid, "use", "fishing bait")
          .then(() => {
            setInterval(() => {
              queueCommands.push({
                command: "use",
                args: ["fishing bait"]
              });
            }, 1000 * 60 * 60 * 1.01);
          })
          .catch((e) => {
            return console.error(e);
          });
    }, randomInt(5000, 150000))
    }
  }

    if (config.autoAdventure) {
      await channel.sendSlash(botid, "adventure").then(() => {
        isPlayingAdventure = true;
      });
    }

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

    // =================== Adventure Start ===================

    autoAdventure(newMessage);

    let isCaught = newMessage.embeds[0]?.description?.match(
      /(Dragon|Kraken|Legendary Fish), nice (shot|catch)!/
    ); //null or Array eg. ["Dragon, nice shot!","Dragon","shot"] => [whole match,group1,group2]
    if (isCaught) {
      let [_, item, action] = isCaught;
      console.log(chalk.magentaBright(`${client.user.tag} caught ${item}`));
    }

    if (
      newMessage?.embeds[0]?.title?.includes(
        client.user.username + ", choose items you want to take with you"
      )
    ) {
      // console.log(newMessage.components[2].components[0]);
      if (newMessage.components[2].components[0].disabled)
        return (isPlayingAdventure = false);
      await clickButton(newMessage, newMessage.components[2].components[0]);
      setTimeout(async () => {
        isPlayingAdventure = false;
      }, 300000)
    }

    playMinigames(newMessage);



    if (config.serverEventsDonate.enabled && newMessage?.embeds[0]?.author?.name?.includes(`${client.user.username}'s inventory`)) {

      // console.log(message.embeds[0].description)

      //       **<:AdventureTicket:934112100970807336> Adventure Ticket** ─ 1
      // Tool

      // **<:Apple:887000049266069575> Apple** ─ 446
      // Power-up

      // **<a:BluesPlane:931691006754189342> Blue's Plane** ─ 1
      // Collectable

      // **<a:DankBoxClosed:861390901049425950> Dank Box** ─ 1
      // Loot Box

      // **<:MedFishingPole:868519722780598323> Fishing Pole** ─ 1
      // Tool

      // **<:LowRifle:868286178070261760> Hunting Rifle** ─ 377
      // Tool

      // **<a:LegendaryFish:971430841211322408> Legendary Fish** ─ 7
      // Sellable

      // **<:LuckyHorseshoe:986396363707281468> Lucky Horseshoe** ─ 336
      // Power-up
      var inputString = newMessage.embeds[0].description;

      const regex = /([a-zA-Z0-9 ☭']+)\*\* ─ ([0-9,]+)/gm;

      let match;
      const items = {};

      // console.log(inputString.split("\n"))
      let i = 0;
      inputString.match(regex).forEach(async(item) => {
        const itemName = item.trim().split("** ─ ")[0];
        const itemQuantity = item.trim().split("** ─ ")[1]?.replaceAll(',', '');
        if (config.serverEventsDonate.blacklist.includes(itemName)) return i++;
        console.log(`${itemName}: ${itemQuantity}`)
        if (i > 7) {
          await clickButton(newMessage, newMessage.components[1].components[2])
        }
        allItemsInInventory.push({
          item: itemName,
          quantity: itemQuantity
        });
        });


      if (allItemsInInventory.length <= 0) {
        // config.serverEventsDonate.enabled = false;
        if (!isOneAccPayingOut && config.serverEventsDonate.payout && client.token.includes(config.serverEventsDonate.tokenWhichWillPayout)) {
          newMessage.channel.sendSlash(botid, "serverevents pool")
          isOneAccPayingOut = true;
        } else if (i > 7) {          
          return clickButton(newMessage, newMessage.components[1].components[2])
        } return console.log(`${chalk.magentaBright(client.user.tag)}: ${chalk.cyan(`Donated all items`)}`)

        // return start(token, channelId)
      }
      await newMessage.channel.sendSlash(botid, "serverevents donate", allItemsInInventory[0].quantity, allItemsInInventory[0].item)


      // allItemsInInventory.forEach(async (item) => {
      //   await channel.sendSlash(botid, "serverevents donate", item.quantity, item.item)

      // });


    }


  });

  client.on("messageCreate", async (message) => {
    if (message.author.id != botid) return;

    if (
      message?.flags?.has("EPHEMERAL") &&
      message?.embeds[0]?.description?.includes(
        "You have an ongoing command running."
      )
    ) {
      isBotFree = false;
    }

    // =================== Captcha Start ===================

    if (
      message.embeds[0]?.title?.toLowerCase().includes("captcha") &&
      message.embeds[0].description?.toLowerCase().includes("matching image") &&
      message?.content?.includes(client.user.id)
    ) {
      console.log(chalk.red("Captcha!"));

      var captcha = message.embeds[0].image.url;
      const components = message.components[0]?.components;
      for (var a = 0; a <= 3; a++) {
        var buttomEmoji = components[a].emoji.id;

        if (captcha.includes(buttomEmoji)) {
          clickButton(message, components[a]);
          console.log(chalk.green(`${client.user.tag} solved the captcha!`));
          break;
        }
      }
    }


    if (
      message?.embeds[0]?.title?.toLowerCase()?.includes("captcha") &&
      message?.embeds[0]?.description?.toLowerCase()?.includes("pepe")
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

      for (var i = 0; i <= 2; i++) {
        const components = message.components[i]?.components;
        for (var a = 0; a <= 2; a++) {
          var buttomEmoji = components[a].emoji.id;
          if (pepe.includes(buttomEmoji)) {
            let btn = components[a];
            setTimeout(async () => {
              clickButton(message, btn);
            }, randomInt(config.cooldowns.buttonClickDelay.minDelay, config.cooldowns.buttonClickDelay.maxDelay));
          }
        }
      }

      const button = message.components[3].components[0];
      if (!button) return;
      //  if (button.disabled) return;
      await wait(800)
      await message.clickButton(button)
      await wait(500)
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
      
     if (message?.embeds[0]?.title?.includes("Item Expiration") && config.autoApple && message?.embeds[0]?.description?.includes("Lucky Horseshoe")) {
      queueCommands.push({
        command: "use",
        args: ["lucky horseshoe"]
      });
    }
      
     if (message?.embeds[0]?.title?.includes("Item Expiration") && config.autoApple && message?.embeds[0]?.description?.includes("Fishing Bait")) {
      queueCommands.push({
        command: "use",
        args: ["fishing bait"]
      });   
     }
      
    if (message?.embeds[0]?.title?.includes("Item Expiration") && config.autoApple && message?.embeds[0]?.description?.includes("Ammo")) {
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



    // =================== minigame Start ===================

    if (message.channel.id === channelId) {
      if (message?.embeds[0]?.description?.includes("F")) {
        const btn = message.components[0]?.components[0];

        if (btn?.label === "F") {
          await clickButton(message, btn);
        } else if (
          message.embeds[0]?.description?.includes(
            "Attack the boss by clicking"
          )
        ) {
          let interval = setInterval(async () => {
            if (btn.disabled) return interval.clearInterval();
            await clickButton(message, btn);
          }, randomInt(config.cooldowns.buttonClickDelay.minDelay, config.cooldowns.buttonClickDelay.maxDelay));
        }
      }
    }

    // =================== minigame End ===================

    if (message?.interaction?.user !== client?.user) return;

    // =================== Auto Apple Start ===================
    if (
      message?.embeds[0]?.description?.includes(
        "You've eaten an apple! If you die within the next 24 hours, you won't lose any items. You will, however, still lose coins."
      )
    ) {
      db.set(client.user.id + ".apple", Date.now());
      console.log(chalk.yellow(`${client.user.tag} ate apple`));
    }
      
       if (
      message?.embeds[0]?.description?.includes(
        "Lucky Horseshoe, giving you slightly better luck in a few commands"
      )
    ) {
      db.set(client.user.id + ".horseshoe", Date.now());
      console.log(chalk.yellow(`${client.user.tag} used horseshoe`));
       }
      
       if (
      message?.embeds[0]?.description?.includes(
        "You load ammo into your hunting rifle. For the next 60 minutes, you cannot hunt and run into nothing."
      )
    ) {
      db.set(client.user.id + ".ammo", Date.now());
      console.log(chalk.yellow(`${client.user.tag} used ammo`));
       }
      
       if (
      message?.embeds[0]?.description?.includes(
        "You put bait on your fishing pole. For the next hour, you cannot fish and run into nothing"
      )
    ) {
      db.set(client.user.id + ".bait", Date.now());
      console.log(chalk.yellow(`${client.user.tag} used bait`));
       }
          // =================== Stream Start ===================
    if (
      message?.embeds[0]?.author?.name.includes(" Stream Manager")
    ) {
      try {
        if (message?.embeds[0]?.fields[1]?.name !== "Live Since") {
          const components = message.components[0]?.components;

          if (
            components[0]?.type !== "SELECT_MENU" &&
            components[0]?.label.includes("Go Live")
          ) {
            // console.log("CLICKING BUTTON")
            await message.clickButton(components[0].customId);

            setTimeout(
              async () => {
                if (
                  message.components[0].components[0]?.type ==
                  "SELECT_MENU"
                ) {
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
                  const Game =
                    Games[
                    Math.floor(Math.random() * Games.length)
                    ];
                  const GamesMenu = message.components[0].components[0]
                  await message.selectMenu(GamesMenu, [Game]);
                } else {
                  return;
                }

                setTimeout(
                  async () => {
                    const components2 = message.components[1]?.components;
                    await message.clickButton(components2[0].customId)
                  },
                  config.cooldowns.buttonClickDelay.minDelay,
                  config.cooldowns.buttonClickDelay.maxDelay
                );

                setTimeout(
                  async () => {
                    const check = randomInt(0, 6);

                    if (check == 0 || check == 1) {
                      await message.clickButton(message?.components[0]?.components[0]);
                      isBotFree = true;
                    } else if (
                      check == 2 ||
                      check == 3 ||
                      check == 4 ||
                      check == 5
                    ) {
                      await message.clickButton(message.components[0]?.components[1]);
                      isBotFree = true;

                    } else if (check == 6) {
                      await message.clickButton(message.components[0]?.components[2]);
                      isBotFree = true;

                    }
                  },
                  config.cooldowns.buttonClickDelay.minDelay,
                  config.cooldowns.buttonClickDelay.maxDelay
                );
              },
              config.cooldowns.buttonClickDelay.minDelay,
              config.cooldowns.buttonClickDelay.maxDelay
            );
          }
        } else if (message.embeds[0].fields[1].name == "Live Since") {
          const check = randomInt(0, 6);

          if (check == 0 || check == 1) {
            await message.clickButton(
              message.components[0]?.components[0]
            );
            isBotFree = true;

          } else if (
            check == 2 ||
            check == 3 ||
            check == 4 ||
            check == 5
          ) {
            await message.clickButton(
              message.components[0]?.components[1]
            );
            isBotFree = true;

          } else if (check == 6) {
            await message.clickButton(
              message.components[0]?.components[2]
            );
            isBotFree = true;

          }
        }
      } catch (err) {
        console.error(err)
      }
    };

    if (
      message.embeds[0]?.title?.includes("Fishing Bait") &&
      message?.embeds[0]?.description?.includes("own") &&
      config.autoFishingBait
    ) {
      const total_own = message?.embeds[0]?.description
        ?.replace(",", "")
        .match(/own \*\*(\d+)/)[1];
      if (!total_own) return;
      fishingBait = Number(total_own);
      if (Number(total_own) > 0) {
        // console.log(
        //   chalk.yellow(`${client.user.tag} has ${Number(total_own)} horseshoe`)
        // );
        fishingBait--;
        queueCommands.push({
          command: "use",
          args: ["Fishing Bait"]
        });

      }
    }

    // =================== Update Balance Start ===================


    if (
      message?.embeds[0]?.fields[1]?.name?.includes("Current Wallet Balance")
    ) {
      wallet = Number(
        message?.embeds[0]?.fields[1].value
          ?.replace("⏣ ", "")
          ?.replace(/,/g, "")
      );
      bank = Number(
        message?.embeds[0]?.fields[2].value
          ?.replace("⏣ ", "")
          ?.replace(/,/g, "")
      );

      console.log(
        `${chalk.magentaBright(client.user.tag)}: ${chalk.cyan(
          `Wallet: ${wallet}`
        )}, ${chalk.cyan(`Bank: ${bank}`)}`
      );
    }

    // =================== Update Balance End ===================

    // =================== AutoHorseshoe Start ===================

  /*  if (
      message.embeds[0]?.title?.includes("Lucky Horseshoe") &&
      message?.embeds[0]?.description?.includes("own") &&
      config.autoHorseShoe
    ) {
      const total_own = message?.embeds[0]?.description
        ?.replace(",", "")
        .match(/own \*\*(\d+)/)[1];
      if (!total_own) return;
      horseShoes = Number(total_own);
      if (Number(total_own) > 0) {
        // console.log(
        //   chalk.yellow(`${client.user.tag} has ${Number(total_own)} horseshoe`)
        // );
        horseShoes--;
        queueCommands.push({
          command: "use",
          args: ["Lucky Horseshoe"]
        });

      }
    }

    // =================== AutoHorseshoe End ===================

    if (
      message.embeds[0]?.title?.includes("Ammo") &&
      message?.embeds[0]?.description?.includes("own") &&
      config.autoAmmo
    ) {
      const total_own = message?.embeds[0]?.description
        ?.replace(",", "")
        .match(/own \*\*(\d+)/)[1];
      if (!total_own) return;
      ammo = Number(total_own);
      if (Number(total_own) > 0) {
        // console.log(
        //   chalk.yellow(`${client.user.tag} has ${Number(total_own)} horseshoe`)
        // );
        ammo--;
        queueCommands.push({
          command: "use",
          args: ["Ammo"]
        });
          
      }
    }
 */

    // =================== Serverevents donate Start ===================




    if (message?.interaction?.commandName?.includes("serverevents donate") && message?.embeds[0]?.title?.includes("Pending Confirmation")) {
      if (!message.components[0].components[1]) return;
      await clickButton(message, message.components[0].components[1]);
      allItemsInInventory.shift();
      await wait(randomInt(1500, 2000))
      if (allItemsInInventory.length <= 0) {
        return message.channel.sendSlash(botid, "inventory")
      }
      await message.channel.sendSlash(botid, "serverevents donate", allItemsInInventory[0].quantity, allItemsInInventory[0].item)

    }


    if (message?.embeds[0]?.title?.includes("Server Pool")) {
      if (!config.serverEventsDonate.payout) return;

      //       **Total Net:**
      // ⏣ 5,476,907,868

      // **Coins:**
      // ⏣ 0

      // **Items**:
      // ` 2,831 ` <:Skunk:861390875992522792> Skunk
      // ` 2,696 ` <:Bunny:860665246875254784> Rabbit
      // ` 2,067 ` <:GraveStone:1029829993301291059> Gravestone
      // ` 1,713 ` <:sand:830509316901175366> Box of Sand
      // ` 1,457 ` <:Garbage:935631382590394398> Garbage
      // ` 1,373 ` <:CommonFish:957698195000025158> Common Fish
      // `   905 ` <:BlueBits:975398146249207808> Blue Plastic Bits
      // `   872 ` <:phone:830509316632346625> Cell Phone
      // `   732 ` <:Ant:864220608865763378> Ant
      // `   720 ` <:Deer:981686994524569710> Deer
      // `   714 ` <:Duck:920400262911373383> Duck
      // `   674 ` <:shreddedcheese:830509316933943307> Shredded Cheese
      // `   593 ` <:banknote:830509316888985621> Bank Note
      // `   572 ` <a:SeaWeed:887000050201419787> Seaweed
      // `   563 ` <:RareFish:971151079096061962> Rare Fish
      // `   446 ` <:Apple:887000049266069575> Apple
      // `   430 ` <:PepeStatue:993285762697146449> Pepe Statue
      // `   416 ` <:ExoticFish:970794371869995058> Exotic Fish
      // `   406 ` <a:StickBug:864568819795755038> Stickbug
      // `   388 ` <:JellyFish:971160094349869126> Jelly Fish
      console.log(message.embeds[0].description)
      var coins = message.embeds[0].description
        .split("\n")[4]
        .split("⏣ ")[1]
        .replaceAll(',', '');
      console.log(coins)

      if (coins > 0) {
        if (config.serverEventsDonate.payout) {
          await message.channel.sendSlash(botid, "serverevents payout", config.serverEventsDonate.mainUserId, coins)
        }
      }
      // var regex = /` +([0-9,]+)/gm;
      //    msg.match(regex).forEach((item) => {

      //   var quantity = item.split("`")[1].trim().replaceAll(',', '');
      //   var name = item.trim().split("`")[2].trim();

      //   console.log(`${name}: ${quantity}`)
      //   allItemsInInventory.push({
      //     item: name,
      //     quantity: quantity
      //   });
      // });


      // message.embeds[0].description.split("\n")
      //print all lines
      message.embeds[0].description.split("\n").forEach((line) => {
        if (/` +([0-9,]+)/gm.test(line)) {
          var quantity = line.match(/` +([0-9,]+)/gm)[0]?.replace("`")?.trim()?.replaceAll(',', '')?.match(/\d+/)[0];
          var item = line.match(/> .*/gm)[0]?.replace("> ", "")?.trim();
          if (!quantity || !item) return;
          console.log(`${item}: ${quantity}`)
          itemsToPayout.push({
            item: item,
            quantity: quantity
          });
        }
      });
      if (itemsToPayout.length <= 0) return console.log(`${chalk.magentaBright(client.user.tag)}: ${chalk.cyan(`Server Pool Empty`)} `)

      await message.channel.sendSlash(botid, "serverevents payout", config.serverEventsDonate.mainUserId, itemsToPayout[0].quantity, itemsToPayout[0].item)




      var name = message.embeds[0].description
        .split("\n")[7]
        .split("> ")[1];
      var quantity = message.embeds[0].description
        .split("\n")[7]
        .split("x`")[0]
        .split("`")[1];
      // console.log(name)
      // console.log(quantity)

      quantity = quantity?.replaceAll(',', '');

      // channel.sendSlash(botid, "serverevents payout", config.serverEventsDonate.mainUserId, quantity, name)

    }






    if (config.serverEventsDonate.enabled && message?.embeds[0]?.author?.name?.includes(`${client.user.username}'s inventory`)) {

      // console.log(message.embeds[0].description)

      //       **<:AdventureTicket:934112100970807336> Adventure Ticket** ─ 1
      // Tool

      // **<:Apple:887000049266069575> Apple** ─ 446
      // Power-up

      // **<a:BluesPlane:931691006754189342> Blue's Plane** ─ 1
      // Collectable

      // **<a:DankBoxClosed:861390901049425950> Dank Box** ─ 1
      // Loot Box

      // **<:MedFishingPole:868519722780598323> Fishing Pole** ─ 1
      // Tool

      // **<:LowRifle:868286178070261760> Hunting Rifle** ─ 377
      // Tool

      // **<a:LegendaryFish:971430841211322408> Legendary Fish** ─ 7
      // Sellable

      // **<:LuckyHorseshoe:986396363707281468> Lucky Horseshoe** ─ 336
      // Power-up
      var inputString = message.embeds[0].description;

      const regex = /([a-zA-Z0-9 ☭']+)\*\* ─ ([0-9,]+)/gm;

      let match;
      const items = {};

      // console.log(inputString.split("\n"))
      let i = 0;
      inputString.match(regex).forEach(async(item) => {
        const itemName = item.trim().split("** ─ ")[0];
        const itemQuantity = item.trim().split("** ─ ")[1]?.replaceAll(',', '');
        if (config.serverEventsDonate.blacklist.includes(itemName)) return i++;
        console.log(`${itemName}: ${itemQuantity}`)
        if (i > 7) {
          await clickButton(message, message.components[1].components[2])
        }
        allItemsInInventory.push({
          item: itemName,
          quantity: itemQuantity
        });
        });


      if (allItemsInInventory.length <= 0) {
        // config.serverEventsDonate.enabled = false;
        if (!isOneAccPayingOut && config.serverEventsDonate.payout && client.token.includes(config.serverEventsDonate.tokenWhichWillPayout)) {
          message.channel.sendSlash(botid, "serverevents pool")
          isOneAccPayingOut = true;
        } else if (i > 7) {          
          return clickButton(message, message.components[1].components[2])
        } return console.log(`${chalk.magentaBright(client.user.tag)}: ${chalk.cyan(`Donated all items`)}`)

        // return start(token, channelId)
      }
      await message.channel.sendSlash(botid, "serverevents donate", allItemsInInventory[0].quantity, allItemsInInventory[0].item)


      // allItemsInInventory.forEach(async (item) => {
      //   await channel.sendSlash(botid, "serverevents donate", item.quantity, item.item)

      // });


    }
    // =================== Serverevents donate End ===================



    // =================== Autoadventure Start ===================

    if (message?.embeds[0]?.author?.name?.includes("Choose an Adventure")) {
      // console.log(message.embeds[0].description)
      const PlatformMenu = message.components[0].components[0];
      const Platforms = PlatformMenu.options.map((opt) => opt.value);
      //             'space',
      //   'west',
      //   'halloween',
      //   'holiday',
      //   'museum',
      //   'brazil',
      //   'vacation'

      await wait(
        randomInt(
          config.cooldowns.buttonClickDelay.minDelay,
          config.cooldowns.buttonClickDelay.maxDelay * 2
        )
      );
      // await message?.selectMenu(PlatformMenu.customId, [Platform]);

      await message.selectMenu(PlatformMenu, ["west"]);

      if (message.components[1].components[0].disabled) {
        isPlayingAdventure = false;
        if (!message.embeds[0]?.description?.match(/<t:\d+:t>/)[0])
          return (isPlayingAdventure = false);
        const epochTimestamp = Number(
          message.embeds[0]?.description
            ?.match(/<t:\d+:t>/)[0]
            ?.replace("<t:", "")
            ?.replace(":t>", "")
        );
        const remainingTime = epochTimestamp * 1000 - Date.now();
        console.log(client.user.tag + ": Adventure is on cooldown for " + remainingTime / 1000 + " seconds");
        isPlayingAdventure = false;
        return setTimeout(() => {
          queueCommands.push({ command: "adventure" });
          isPlayingAdventure = true;
        }, remainingTime + randomInt(8000, 15000));

        // console.log();
      }
      // await wait(randomInt(config.cooldowns.buttonClickDelay.minDelay, config.cooldowns.buttonClickDelay.maxDelay))
      // console.log(message.components[1].components[0])

      await clickButton(message, message.components[1].components[0]).then(
        () => {
          isPlayingAdventure = true;
          setTimeout(async () => {
            isPlayingAdventure = false;
          }, 300000)

        }
      );
      // isBotFree = true;
    }

    if (
      message?.flags?.has("EPHEMERAL") &&
      message?.embeds[0]?.title?.includes("You're currently banned!")
    ) {
      console.log(chalk.redBright(`${client.user.tag} is banned!`));

      fs.writeFileSync("tokens.txt", fs.readFileSync("tokens.txt", 'utf8').replace(new RegExp(client.token + "\n", 'g'), ''));
      console.log(`String "${client.token}" removed from ${"tokens.txt"}`);

      return;
    }

    autoAdventure(message);
    // =================== AutoBuy Start ===================

    if (message?.flags?.has("EPHEMERAL") && message?.embeds[0]?.description?.includes("You don't have a ") && config.autoBuy) {
      // list of items that might be missing
      var missingItems = ["Hunting Rifle", "Fishing Pole", "Shovel"];

      // checking if the missing items are in the embed description
      missingItems.forEach(async (item) => {

        if (message?.embeds[0]?.description?.includes(item.toLocaleLowerCase())) {
          buyFromShop(35000, item);
        }
      })

    } else if (message?.embeds[0]?.title?.includes("Missing Items") && config.autoBuy)
      var streamingItems = ["Mouse", "Keyboard"];

    streamingItems?.forEach(async (item) => {

      if (message?.embeds[0]?.description?.includes(item)) {
        buyFromShop(100000, item);
      }
    })

    // =================== AutoBuy End ===================

    // =================== Balance Updater Start ===================
    if (
      message?.embeds[0]?.title?.includes(`${client.user.username}'s Balance`)
    ) {
      // console.log(message?.embeds[0]?.description)
      wallet = Number(
        message?.embeds[0]?.description
          ?.split("\n")[0]
          ?.replace("**Wallet:** ⏣ ", "")
          ?.replace(/,/g, "")
      );
      bank = Number(
        message?.embeds[0]?.description
          ?.split("\n")[1]
          ?.replace("**Bank:** ⏣ ", "")
          ?.replace(/,/g, "")
          .split(" / ")[0]
      );
      invNet = Number(
        message?.embeds[0]?.description
          ?.split("\n")[3]
          ?.replace("**Inventory Net:** ⏣ ", "")
          ?.replace(/,/g, "")
      );
      market = Number(
        message?.embeds[0]?.description
          ?.split("\n")[4]
          ?.replace("**Market Net:** ⏣ ", "")
          ?.replace(/,/g, "")
      );
      totalNet = Number(
        message?.embeds[0]?.description
          ?.split("\n")[6]
          ?.replace("**Total Net:** ⏣ ", "")
          ?.replace(/,/g, "")
      );


      if (config.serverEventsDonate.enabled && wallet > 0) {
        await message.channel.sendSlash(botid, "serverevents donate", wallet.toString());
      }


      db.set(client.user.id + ".wallet", wallet);
      db.set(client.user.id + ".bank", bank);
      db.set(client.user.id + ".invNet", invNet);
      db.set(client.user.id + ".market", market);
      db.set(client.user.id + ".totalNet", totalNet);

      if (config.devMode)
        console.log(
          `${chalk.magentaBright(client.user.tag)}: ${chalk.blue(
            `Wallet: ${wallet}`
          )}, ${chalk.blue(`Bank: ${bank}`)}, ${chalk.blue(
            `Inventory Net: ${invNet}`
          )}, ${chalk.blue(`Market Net: ${market}`)}, ${chalk.blue(
            `Total Net: ${totalNet}`
          )} `
        );
    }

    // =================== Balance Updater End ===================


    // =================== Crime Command Start ===================

    if (
      message?.embeds[0]?.description?.includes(
        "What crime do you want to commit?"
      )
    ) {
      await clickRandomButton(message, 0);
      isBotFree = true;
    }

    // =================== Crime Command End ===================

    // =================== Search Command Start ===================

    if (
      message?.embeds[0]?.description?.includes("Where do you want to search?")
    ) {
      //checking if searchLocations in the config is empty
      if (config.searchLocations.length == 0) {
        await clickRandomButton(message, 0);
        isBotFree = true;
      } else {
        //if not empty, then click the buttons that are mentioned in the config

        //getting the buttons
        const components = message.components[0]?.components;
        //checking if the buttons exist
        if (!components?.length) return;
        //converting the searchLocations to lowercase
        config.searchLocations = config.searchLocations.map((location) =>
          location.toLowerCase()
        );

        //looping through the buttons
        var buttonToClick = undefined;
        for (var a = 0; a < 3; a++) {
          let btn = components[a];
          //checking if the button label is in the searchLocations array
          if (config.searchLocations?.includes(btn?.label.toLowerCase())) {
            buttonToClick = btn;
            break;
          }
        }

        //if the buttonToClick is undefined, then click a random button
        if (buttonToClick == undefined) {
          await clickRandomButton(message, 0);
          isBotFree = true;
        } else {
          //if the buttonToClick is defined, then click that button
          await clickButton(message, buttonToClick);
          isBotFree = true;
        }
      }
    }

    // =================== Search Command End ===================

    // =================== Highlow Command Start ===================

    if (
      message?.embeds[0]?.description?.includes(
        `I just chose a secret number between 1 and 100.`
      )
    ) {
      //getting the number chosen by the bot
      var numberChosen = parseInt(
        message.embeds[0].description.split(" **")[1].replace("**?", "").trim()
      );

      // numberChosen > 50 ? 0 : 2
      const components = message.components[0]?.components;
      if (!components?.length || components[numberChosen > 50 ? 0 : 2].disabled)
        return;
      let btn = components[numberChosen > 50 ? 0 : 2];
      await clickButton(message, btn);
      isBotFree = true;
    }

    // =================== Highlow Command End ===================

    // =================== Trivia Command Start ===================

    if (message.embeds[0]?.description?.includes(" seconds to answer*")) {
      var question = message.embeds[0].description
        .replace(/\*/g, "")
        .split("\n")[0]
        .split('"')[0];

      let answer = await findAnswer(question);
      if (answer) {
        if (Math.random() < config.triviaOdds) {
          var flag = false;
          const components = message.components[0]?.components;
          let btn;
          if (components?.length == NaN) return;
          //looping through the buttons
          for (var i = 0; i < components.length; i++) {
            if (components[i].label.includes(answer)) {
              //correct answer found
              btn = components[i];
              flag = true;
              await wait(
                randomInt(
                  config.cooldowns.triviaCooldown.minDelay,
                  config.cooldowns.triviaCooldown.maxDelay
                )
              );
              await clickButton(message, btn);
              isBotFree = true;
            }
          }
          if (!flag || answer === undefined) {
            await wait(
              randomInt(
                config.cooldowns.triviaCooldown.minDelay,
                config.cooldowns.triviaCooldown.maxDelay
              )
            );

            await clickRandomButton(message, 0);
            isBotFree = true;
          }
        } else {
          //select random button
          await wait(
            randomInt(
              config.cooldowns.triviaCooldown.minDelay,
              config.cooldowns.triviaCooldown.maxDelay
            )
          );

          await clickRandomButton(message, 0);
          isBotFree = true;
        }
      } else {
        //select random button
        await wait(
          randomInt(
            config.cooldowns.triviaCooldown.minDelay,
            config.cooldowns.triviaCooldown.maxDelay
          )
        );

        await clickRandomButton(message, 0);
        isBotFree = true;
      }
    }

    // =================== Trivia Command End ===================

    // =================== Minigame Start ===================

    playMinigames(message);

    // =================== Minigame End ===================

    // =================== PostMeme Command Start ===================

    if (
      message.embeds[0]?.description?.includes(
        "Pick a meme type and a platform to post a meme on!"
      )
    ) {
      const PlatformMenu = message.components[0].components[0];
      const MemeTypeMenu = message.components[1].components[0];


      // options
      const Platforms = PlatformMenu.options.map((opt) => opt.value);
      const MemeTypes = MemeTypeMenu.options.map((opt) => opt.value);

      // selected option
      // const Platform = Platforms[Math.floor(Math.random() * Platforms.length)];
      const MemeType = MemeTypes[Math.floor(Math.random() * MemeTypes.length)];
      //get random platform from config array
      const Platform = config.postMemesPlatforms.length > 0 ?
        config.postMemesPlatforms[
        Math.floor(Math.random() * config.postMemesPlatforms.length)
        ] : Platforms[Math.floor(Math.random() * Platforms.length)];
      await wait(
        randomInt(
          config.cooldowns.buttonClickDelay.minDelay,
          config.cooldowns.buttonClickDelay.maxDelay * 2
        )
      );
      await message?.selectMenu(PlatformMenu, [Platform]);

      await wait(
        randomInt(
          config.cooldowns.buttonClickDelay.minDelay,
          config.cooldowns.buttonClickDelay.maxDelay * 2
        )
      );
      await message?.selectMenu(MemeTypeMenu, [MemeType]);

      await wait(
        randomInt(
          config.cooldowns.buttonClickDelay.minDelay,
          config.cooldowns.buttonClickDelay.maxDelay * 2
        )
      );

      await clickButton(message, message.components[2]?.components[0]);
      isBotFree = true;
    }

    // =================== PostMeme Command End ===================
  });

  client.login(token).catch((err) => {
    if (err.toString().includes("TOKEN_INVALID")) {
      console.log(
        `${chalk.redBright("ERROR:")} ${chalk.blueBright(
          "The token you provided is invalid"
        )} - ${chalk.blue(token)}`
      );
    }
  });

  async function playMinigames(message) {
    let description = message?.embeds[0]?.description?.replace(
      /<a?(:[^:]*:)\d+>/g,
      "$1"
    ); // format emoji <:id:severId> to :id:
    let positions = description
      ?.split("\n")
      .slice(1) //remove first line
      .map((e) => e.split(":").filter((e) => e !== "")); // split by : and remove blank string

    // INFO: Dodge the Fireball!
    if (description?.includes("Dodge the Fireball!")) {
      let fireballPostion = positions[1].length - 1; // 1 is fireball line and length-1 will be postion where fireball is
      let safePostion = ["Left", "Middle", "Right"].filter(
        (e, idx) => idx !== fireballPostion
      );

      let buttons = message.components[0]?.components;
      let btn = buttons.filter((e) => safePostion.includes(e.label))[
        randomInt(0, 1)
      ]; // filter and remove unsafe position button and select random from 0 or 1 (total 3 button 1 is unsafe other is safe so)

      message.clickButton(btn);
    } else if (description?.includes("Catch the fish!")) {
      let fishPosition = positions[0].length - 1; // here 0 because 2nd line was fish not a dragon like has in dodge fireball
      let btn = message.components[0]?.components[fishPosition];
      message.clickButton(btn);
    } else if (description?.includes("Dunk the ball!")) {
      let ballPostion = positions[0].length - 1; // 1 is fireball line and length-1 will be postion where 
      let btn = message.components[0]?.components[ballPostion];

      message.clickButton(btn)
    } else if (description?.includes("Hit the ball!")) {
      let goalkeeperPostion = positions[1].length - 1; // 1 is ball line and length-1 will be postion where fireball is
      let safePostion = ["Left", "Middle", "Right"].filter(
        (e, idx) => idx !== goalkeeperPostion
      );

      let buttons = message.components[0]?.components;
      let btn = buttons.filter((e) => safePostion.includes(e.label))[
        randomInt(0, 1)
      ]; // filter and remove unsafe position button and select random from 0 or 1 (total 3 button 1 is unsafe other is safe so)
      message.clickButton(btn);
    }

  }
  async function autoAdventure(newMessage) {
    if (!newMessage?.interaction.commandName.includes("adventure")) return;
    if (!newMessage.interaction) return;
    if (!newMessage.components[0]) return;
    if (
      newMessage?.embeds[0]?.title?.includes(
        client.user.username + ", choose items you want to take with you"
      )
    )
      return;
    if (newMessage?.embeds[0]?.author?.name?.includes("Adventure Summary")) {
      isPlayingAdventure = false;

      //get button
      let btn = newMessage.components[0].components[0];
      //get button label
      let btnLabel = btn.label;
      var time = btnLabel
        .match(/in \d+ minutes/)[0]
        ?.replace("in ", "")
        ?.replace(" minutes", "");

      console.log(`${client.user.tag}: Finished playing adventure. Next adventure in ${time} minutes`);

      setTimeout(() => {
        queueCommands.push({ command: "adventure" });
        // isPlayingAdventure = true;
      }, randomInt(Number(time) * 60 * 1000, Number(time) * 1.1 * 60 * 1000));
      // return (isPlayingAdventure = false);
    }

    // if (newMessage.components[0].components[1].emoji === "1067941108568567818") {
    //     return clickButton(newMessage, newMessage.components[0].components[1]);
    // }

    if (newMessage?.components[0]?.components[1]?.disabled) {
      return clickButton(newMessage, newMessage.components[1].components[1]);
    }

    if (!newMessage?.components[1]?.components[1])
      return clickButton(newMessage, newMessage.components[0].components[1]);

    //search answer from a json file
    //{
    // "database": [
    //     {
    //         "name": "A lady next to a broken down wagon is yelling for help.",
    //         "click": "Help Her"
    //     },
    //     {
    //         "name": "You entered the saloon to rest from the journey. What do you want to do?",
    //         "click": "Play the piano"
    //     }
    // ]
    // }

    //code
    const database = require("./safeadventurewest.json").database;

    // console.log(
    //   newMessage?.embeds[0]?.description?.split("<")[0]?.split("\n")[0]?.trim()
    // );

    const answer = database.find((e) =>
      e.name.includes(
        newMessage?.embeds[0]?.description
          ?.split("<")[0]
          ?.split("\n")[0]
          ?.trim()
      )
    )?.click;
    var found = false;
    if (answer) {
      for (let i = 0; i < newMessage.components.length; i++) {
        for (let j = 0; j < newMessage.components[i].components.length; j++) {
          if (
            newMessage?.components[i]?.components[j]?.label
              ?.toLowerCase()
              ?.includes(answer.toLowerCase())
          ) {
            found = true;
            await clickButton(
              newMessage,
              newMessage.components[i].components[j]
            );
            await wait(200)
            if (!newMessage.components[i].components[j].disabled) {
              await clickButton(
                newMessage,
                newMessage.components[i].components[j]
              );
            }
            // console.log(
            //   "clicked " +
            //   newMessage.components[i].components[j].label +
            //   " button"
            // );
            // await wait(randomInt(config.cooldowns.buttonClickDelay.minDelay, config.cooldowns.buttonClickDelay.maxDelay))
            await clickButton(              newMessage,
              newMessage.components[1].components[1]
)
            await wait(250)
            if(!newMessage.components[1].components[1].disabled)
            {await clickButton(
              newMessage,
              newMessage.components[1].components[1]
            )}
          }
        }
      }

      if (!found) {
        await clickButton(
          newMessage,
          newMessage.components[0].components[
          randomInt(0, newMessage.components[0].components.length - 1)
          ]
        ).then(() => {
          // console.log("clicked random button");
          setTimeout(async () => {
            isPlayingAdventure = false;
          }, 300000)
        });
      }
    } else {
      if (newMessage?.embeds[0]?.description?.includes("Catch one of em!")) {
        await clickButton(newMessage, newMessage.components[0].components[2]);
        await wait(
          randomInt(
            config.cooldowns.buttonClickDelay.minDelay,
            config.cooldowns.buttonClickDelay.maxDelay
          )
        );
        await clickButton(newMessage, newMessage.components[1].components[1]);
        return;
      }

      //click random button
      await clickButton(
        newMessage,
        newMessage.components[0].components[
        randomInt(0, newMessage.components[0].components.length - 1)
        ]
      );
      // console.log("clicked random button");
      // await clickButton(newMessage, newMessage.components[1].components[1]);
      // console.log("clicked continue button")
    }

    //loop for each question in database and check if the question is in embed description
    // for (let i = 0; i < database.length; i++) {

    //     if (database[i].name.includes(newMessage?.embeds[0]?.description?.split("<")[0])) {
    //         console.log(database[i].click)
    //         // await clickButton(newMessage, newMessage.components[0].components[2]);
    //         // await clickButton(newMessage, newMessage.components[1].components[1]);
    //     }
    // }

    // if (answer) {
    //     console.log(answer)
    //     // await clickButton(newMessage, newMessage.components[0].components[2]);
    //     // await clickButton(newMessage, newMessage.components[1].components[1]);

    // } else {
    //     // await clickButton(newMessage, newMessage.components[0].components[randomInt(newMessage.components[0].components.length - 1)]);
    //     // await clickButton(newMessage, newMessage.components[1].components[1]);
    // }

    // console.log(newMessage?.interaction)
  }
  async function buyFromShop(cost, item, quantity = "1") {
    // checking if the user does not have enough money to buy the item
    if (wallet < cost && bank < cost && !(wallet + bank >= cost)) {
      if (config.devMode)
        console.log(
          `${chalk.magentaBright(client.user.tag)}: ${chalk.blue(
            `Not enough money to buy ${item}`
          )}`
        );
      return;
    }

    //checking if the user has enough money in the bank to buy the item
    if (wallet < cost && bank >= cost) {
      if (config.devMode)
        console.log(
          `${chalk.magentaBright(client.user.tag)}: ${chalk.blue(
            `Withdrawing money to buy ${item}`
          )}`
        );
      queueCommands.push({
        command: "withdraw",
        args: [`${cost}`],
      });
      // subtracting the money from the bank
      bank -= cost;
    }
    //checking if the user has enough money combined in the bank and wallet to buy the item
    if (bank + wallet >= cost && wallet < cost && bank < cost) {
      if (config.devMode)
        console.log(
          `${chalk.magentaBright(client.user.tag)}: ${chalk.blue(
            `Withdrawing money to buy ${item}`
          )}`
        );
      queueCommands.push({
        command: "withdraw",
        args: ["max"]
      });
      // subtracting the money from the bank
      bank -= cost;
    }

    queueCommands.push({
      command: "shop buy",
      args: [item, quantity]
    });

    // subtracting the money from the wallet since it has been used to buy the item
    wallet -= cost;
    if (config.devMode)
      console.log(
        `${chalk.magentaBright(client.user.tag)}: ${chalk.yellowBright(
          `Bought ${item}`
        )}`
      );
  }
  async function randomCommand(
    onGoingCommands,
    channel,
    client,
    queueCommands
  ) {
    const commands = config.commands;
    const randomCommand = commands[Math.floor(Math.random() * commands.length)];
    // console.log("Alive 1")
    if (botNotFreeCount > 5) {
      botNotFreeCount = 0;
      isBotFree = true;
    }
    if (!isBotFree) {
      botNotFreeCount++;
      // if (config.devMode) console.log(`${chalk.magentaBright(client.user.tag)}: ${chalk.blue("Bot not free")}`)
      return;
    }
    // console.log("Alive 2")
    let command = randomCommand.command;
    if (isDeadMeme && command == "postmemes") return;
    // console.log("Alive 3")
    if (onGoingCommands.includes(command)) return;
    // console.log("Alive 4")
    //autobalance

    if (queueCommands.length > 0) {
      // if (queueCommands[0].command === undefined || !queueCommands[0].command) {
      //   queueCommands.shift();
      // } else {
      // console.log(queueCommands[0].command)
      if (queueCommands[0]?.command) {
        if (queueCommands.length <= 0) { return queueCommands.shift(); }
        else {
          return channel
            .sendSlash(botid, queueCommands[0].command, queueCommands[0].args ? queueCommands[0].args : [])
            .then(() => {
              queueCommands.shift();

              console.log(
                `${chalk.magentaBright(client.user.tag)}: ${chalk.blue(
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
      // }
    }
    // console.log("AAAAAAAAAAA")
    if (isPlayingAdventure) return;
    // console.log("Alive 5")
    if (randomInt(1, 75) == 4) {
      queueCommands.push({
        command: "balance",
      });
      if (config.devMode)
        console.log(
          `${chalk.magentaBright(client.user.tag)}: ${chalk.blue(
            "Queued balance command"
          )} `
        );
    } else {
      if (randomInt(1, 75) == 4 && config.autoDeposit) {
        queueCommands.push({
          command: "deposit",
          args: ["max"],
        });
        if (config.devMode)
          console.log(
            `${chalk.magentaBright(client.user.tag)}: ${chalk.yellowBright(
              "Deposited all the coins in the bank"
            )} `
          );
      }
    }
    if (
      command === "search" ||
      command === "crime" ||
      command === "highlow" ||
      command === "trivia" ||
      command === "postmemes" ||
      command === "stream"
    ) {
      isBotFree = false;
    }


    await channel.sendSlash(botid, command);
    if (config.devMode)
      console.log(
        `${chalk.magentaBright(client.user.tag)}: ${chalk.blue(command)}`
      );
    onGoingCommands.push(command);

    setTimeout(() => {
      removeAllInstances(onGoingCommands, command);
    }, randomInt(randomCommand.cooldown * 0.9, randomCommand.cooldown * 1.1));
  }
  function removeAllInstances(arr, item) {
    for (var i = arr.length; i--;) {
      if (arr[i] === item) arr.splice(i, 1);
    }
  }
  async function main(
    onGoingCommands,
    channel,
    client,
    queueCommands,
    isOnBreak
  ) {
    var commandCooldown = randomInt(
      config.cooldowns.commandInterval.minDelay,
      config.cooldowns.commandInterval.maxDelay
    );
    var shortBreakCooldown = randomInt(
      config.cooldowns.shortBreak.minDelay,
      config.cooldowns.shortBreak.maxDelay
    );

    var longBreakCooldown = randomInt(
      config.cooldowns.longBreak.minDelay,
      config.cooldowns.longBreak.maxDelay
    );
    if (isOnBreak) return;
    var actualDelay;
    randomCommand(onGoingCommands, channel, client, queueCommands);

    if (Math.random() < config.cooldowns.shortBreak.frequency) {
      actualDelay = shortBreakCooldown;
      isOnBreak = true;
      console.log(
        `${chalk.magentaBright(client.user.tag)}: ${chalk.gray(
          "Short break for"
        )} ${chalk.yellowBright(
          (shortBreakCooldown / 1000).toFixed(1)
        )} seconds`
      );
    } else if (Math.random() < config.cooldowns.longBreak.frequency) {
      actualDelay = longBreakCooldown;
      isOnBreak = true;
      console.log(
        `${chalk.magentaBright(client.user.tag)}: ${chalk.gray(
          "Long break for"
        )} ${chalk.yellowBright((longBreakCooldown / 1000).toFixed(1))} seconds`
      );
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
  // let interval = setInterval(
  //     async () => {
  //         try {
  //             await message.clickButton(btn.customId);
  //             clearInterval(interval);
  //             return true;
  //         } catch (err) { }
  //     },
  //     config.cooldowns.buttonClickDelay.minDelay,
  //     config.cooldowns.buttonClickDelay.maxDelay
  // );
}

async function findAnswer(question) {
  const file = "./trivia.json";
  const trivia = await fs.readJson(file);
  // looping over the database
  for (let i = 0; i < trivia.database.length; i++) {
    // checking if the question includes the question
    if (trivia.database[i].question.includes(question)) {
      // returning the correct answer
      return trivia.database[i].correct_answer;
    }
  }
}


var log = console.log;

console.log = function () {
  var first_parameter = arguments[0];
  var other_parameters = Array.prototype.slice.call(arguments, 1);

  function formatConsoleDate(date) {
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var milliseconds = date.getMilliseconds();
    return chalk.cyanBright('[' +
      ((hour < 10) ? '0' + hour : hour) +
      ':' +
      ((minutes < 10) ? '0' + minutes : minutes) +
      ':' +
      ((seconds < 10) ? '0' + seconds : seconds) +
      '] - ')
  }
  const msg = stripAnsi([...arguments].join(' ')); // Strip ANSI color codes

  logs.push(`<p>${msg}</p>`);
  if (config?.webhookLogging && config?.webhook) {
    try {
      webhook.send(
        new MessageBuilder()
          .setDescription(msg)
          .setColor(`#2e3236`)
      )
    } catch (err) {
      console.log(err)
    }
  }
  log.apply(console, [formatConsoleDate(new Date()) + first_parameter].concat(other_parameters));
  //push to logs

  // console.log(msg)

};


var error = console.error;

console.error = function () {
  var first_parameter = arguments[0];
  var other_parameters = Array.prototype.slice.call(arguments, 1);

  function formatConsoleDate(date) {
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var milliseconds = date.getMilliseconds();
    return chalk.redBright('[' +
      ((hour < 10) ? '0' + hour : hour) +
      ':' +
      ((minutes < 10) ? '0' + minutes : minutes) +
      ':' +
      ((seconds < 10) ? '0' + seconds : seconds) +
      '] - ')
  }
  const msg = stripAnsi([...arguments].join(' ')); // Strip ANSI color codes
  logs.push(`<p style="color:red;">${msg}</p>`);

  error.apply(console, [formatConsoleDate(new Date()) + first_parameter].concat(other_parameters));
  //push to logs

  // console.log(msg)

};

function getColor(str) {
  const regex = /\u001b\[(\d+)m(.*)\u001b\[0m/g; // Regex to match ANSI color codes
  const matches = regex.exec(str);
  return matches ? parseInt(matches[1]) : null;
}
