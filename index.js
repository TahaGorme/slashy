var version = "1.9.5";
// Version 1.9.5


const axios = require("axios");
const cors = require("cors");
const path = require("path");
const fs = require("fs-extra");

const SimplDB = require('simpl.db');
const db = new SimplDB();
const Users = db.createCollection('users');
const collection = Users.getAll()


const chalk = require("chalk");
const config = process.env.JSON
  ? JSON.parse(process.env.JSON)
  : require("./config.json");
Blacklist = config.Blacklistitems

const { Webhook, MessageBuilder } = require("discord-webhook-node");

const hook = new Webhook(config.webhook);

axios
  .get("https://raw.githubusercontent.com/TahaGorme/slashy/main/index.js")
  .then(function(response) {
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

        hook.send(
          new MessageBuilder()
            .setTitle("New Version")
            .setURL("https://github.com/TahaGorme/Slashy")
            .setDescription(
              "Current version:** " +
              version +
              "**\nNew version: **" +
              v +
              "**\nPlease update: " +
              "https://github.com/TahaGorme/slashy"
            )
            .setColor("#E74C3C")
        );
      }
    }
  })
  .catch(function(error) {
    console.log(error);
  });

process.on("unhandledRejection", (reason, p) => {
  const ignoreErrors = [
    "MESSAGE_ID_NOT_FOUND",
    "INTERACTION_TIMEOUT",
    "BUTTON_NOT_FOUND",
  ];
  if (ignoreErrors.includes(reason.code || reason.message)) return;
  console.log(" [Anti Crash] >>  Unhandled Rejection/Catch");
  console.log(reason, p);
  if (reason?.code?.includes('TOKEN_INVALID')) {
    accounts = +accounts - 1
  }
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
const figlet = require("figlet");

const botid = "270904126974590976";
var bank = 0;
var purse = 0;
var net = 0;
var accounts = 0;

// const config = require("./config.json");

// INFO: Load batch token file if enabled
if (config.isBatchTokenFile) {
  let data = process.env.TOKENS;
  if (!data) data = fs.readFileSync("./batch_token.cfg", "utf-8");
  config.tokens = data.split("\n").reduce((previousTokens, line) => {
    let [channelId, token] = line.replace("\r", "").split(" ");
    return [...previousTokens, { channelId, token }];
  }, []);
}

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
  res.json(collection
  );
});

app.listen(7500);
console.log(
  chalk.bold.red(
    "Server started on " + chalk.underline("http://localhost:7500")
  )
);

const { Client } = require("discord.js-selfbot-v13");
const { randomInt } = require("crypto");

const client1 = new Client({ checkUpdate: false, readyStatus: false });

client1.on("ready", async () => {
  console.log(
    chalk.bold.magenta(`Logged in to Main Account as ${client1.user.tag}!`)
  );
  client1.user.setStatus("invisible");

  hook.send(
    new MessageBuilder()
      .setTitle("Started Slashy")
      .setURL("https://github.com/TahaGorme/Slashy")
      .setDescription(
        "Started grinding on " + config.tokens.length + " accounts."
      )
      .setColor("#2e3236")
    //.setTimestamp()
  );
  const channel1 = await client1.channels.cache.get(config.mainInfo.channel);

  // INFO: Item Use
  config.mainInfo.itemToUse.forEach((item) => {
    setInterval(async () => {
      await channel1.sendSlash(botid, "use", item);
    }, randomInteger(1000000, 1500000));
  });


  // autoBuyLife(channel1);
});

// INFO: register main account events
client1.on("messageCreate", async (message) => {
  const channel1 = client1.channels.cache.get(config.mainInfo.channel);
  // INFO: when we send "/market post" and receive responsed
  if (
    config.autoGift &&
    message.embeds[0]?.description?.includes("Posted an offer to sell") &&
    config.tokens.find((e) => e.channelId == message.channel.id)
  ) {
    handleMarketPost(message.channel.id, message);
  }
  // INFO: Pending Confirmation
  if (message.embeds[0]?.title?.includes("Pending Confirmation") && message.interaction?.user == client1.user) {
    highLowRandom(message, 1);
    if (config.transfer.transferOnlyMode && !config.transfer.serverEventsDonateMode) {
      setTimeout(async function() {
        inv(botid, channel1);
	      
      }, randomInteger(
        config.cooldowns.transfer.minDelay,
        config.cooldowns.transfer.maxDelay
      ));
    }
  }

  // INFO: Play Minigame
    if (
      message.embeds[0]?.title?.includes("Server Pool") &&
      config.transfer.serverEventsDonatePayout
    ) {
      setTimeout(async () => {
        if (!message.embeds[0].description.includes("> ")) {
          isServerPoolEmpty = true;
          inv(botid, channel1);
          return;
        }
        var name = message.embeds[0].description
          .split("\n")[7]
          .split("> ")[1];
        var quantity = message.embeds[0].description
          .split("\n")[7]
          .split("x`")[0]
          .split("`")[1];
        console.log(name + ": " + quantity);
        if (!name) return;
        if (!quantity) return;
        isServerPoolEmpty = false;

        await channel1.sendSlash(
          botid,
          "serverevents payout",
          config.transfer.payoutId,
          quantity,
          name
        );
	await wait(randomInteger(1000, 3000));
	await channel1.sendSlash(botid, "serverevents pool")
      }, randomInteger(config.cooldowns.serverEvents.minDelay, config.cooldowns.serverEvents.maxDelay));
    }
  
  // INFO: Register captcha
  handleCaptcha(message);

  // INFO: Use Item : Adventure Voucher
  if (config.mainInfo.itemToUse == "Adventure Voucher") {
    useAdventureVoucher(channel1, message);
  }
	
  if (config.transfer.serverEventsDonatePayout) {
    channel1.sendSlash(botid, "serverevents pool")
  }
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
  var acc_bal = 0;
  var acc_bank = 0;
  var acc_net = 0;
  var donateOnce = true;
  accounts = +accounts + 1
  var isBotFree = true;
  var ongoingCmd = false;
  const client = new Client({ checkUpdate: false, readyStatus: false });
  var commandsUsed = [];
  var ongoingCommand = false;
  var isOnBreak = false;
  async function findAnswer(question) {
    const file = config.useDarkendTrivia
      ? "./darkend-trivia.json"
      : "./trivia.json";
    const trivia = await fs.readJson(file);
    if (config.useDarkendTrivia) {
      return trivia[question];
    } else {
      for (let i = 0; i < trivia.database.length; i++) {
        if (trivia.database[i].question.includes(question)) {
          return trivia.database[i].correct_answer;
        }
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
    if (config.transfer.serverEventsDonateMode && config.transfer.serverEventsDonateMoney) {
      await channel.sendSlash(botid, "withdraw", "max");
    }
    await channel.sendSlash(botid, "balance");


    // console.log(chalk.magenta("Playing Dank Memer in " + channel.name));
    // !config["dontLogUselessThings"] &&
    // hook.send("Started. Playing Dank Memer in <#" + channel.id + ">");
    if (config.transfer.transferOnlyMode || config.transfer.serverEventsDonateMode) {
      console.log(
        chalk.red(
          "Transfer Only Mode or Server Events Donate is enabled."
        )
      );
      inv(botid, channel);
      await channel.sendSlash(botid, "serverevents pool");
      return;
    }
    setTimeout(async () => {
      if (config.autoBuyItems.includes("Life Saver")) await channel.sendSlash(botid, "item", "Life Saver");
    }, randomInteger(1000, 3000));

    main(channel);
    config.autoUse.forEach((item) => {
      setTimeout(async () => {
        await channel.sendSlash(botid, "use", item);
      }, randomInteger(12000, 16000));
    });
  });

  client.on("messageUpdate", async (oldMessage, newMessage) => {
    if (newMessage.interaction?.user !== client.user) return;
    if (
      newMessage.author?.id !== botid ||
      newMessage.channel.id != channelId
    )
      return;

    playMiniGames(newMessage, true);
    playFGame(newMessage, channelId);
    // INFO: Caught :
    let isCaught = newMessage.embeds[0]?.description?.match(
      /(Dragon|Kraken|Legendary Fish), nice (shot|catch)!/
    ); //null or Array eg. ["Dragon, nice shot!","Dragon","shot"] => [whole match,group1,group2]
    if (isCaught) {
      let [_, item, action] = isCaught; //yeah dragon, fish and kraken are item in dank memer
      // action : shot or catch

      hook.send(
        new MessageBuilder()
          .setTitle("Minigame Boss: " + item)
          .setURL(newMessage.url)
          .setDescription(
            client.user.username +
            " just caught a **" +
            item +
            "**!"
          )
          .setColor("#2e3236")
          .setTimestamp()
      );
    }
    // INFO: confirm donate
    if (
      newMessage.embeds[0]?.title?.includes("Action Confirmed") &&
      newMessage.embeds[0].description?.includes(
        "Are you sure you want to donate your items?"
      ) && newMessage.interaction?.user == client.user
    ) {
      setTimeout(async () => {
        if (isInventoryEmpty) {
          if (isServerPoolEmpty) return;
          if (config.transfer.serverEventsDonatePayout)
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

  client.on("messageCreate", async (message) => {





    if (!message?.embeds[0]?.description?.includes("986396363707281468") && config.autoBuyItems.includes("Lucky Horseshoe") && randomInteger(1, 5) == 2) {


      if (message?.embeds[0]?.description?.includes("You cast out your line and brought back") || message?.embeds[0]?.description?.includes("You went hunting and brought back") || message?.embeds[0]?.description?.includes("You dig in the dirt and brought")) {

        if (acc_bal >= 75000) {
          await channel.sendSlash(botid, "shop buy", "Lucky Horseshoe");
          !config["dontLogUselessThings"] && hook.send(
            new MessageBuilder()
              .setTitle("Bought a Lucky Horseshoe")
              .setURL(message.url)
              .setDescription(
                client.user.username +
                ": Succesfully bought a Lucky Horseshoe! "

              )
              .setColor("#2e3236")
          );

        }
        else if (acc_bank >= 75000 && acc_bal < 75000) {
          await channel.sendSlash(botid, "withdraw", "75000");
          setTimeout(async () => {
            await channel.sendSlash(botid, "shop buy", "Lucky Horseshoe");
            !config["dontLogUselessThings"] && hook.send(
              new MessageBuilder()
                .setTitle("Bought a Lucky Horseshoe")
                .setURL(message.url)
                .setDescription(
                  client.user.username +
                  ": Succesfully bought a Lucky Horseshoe! "

                )
                .setColor("#2e3236")
            );





          }, randomInteger(2000, 2500));

        }

        setTimeout(async () => {
          await channel.sendSlash(botid, "use", "Lucky Horseshoe");
          !config["dontLogUselessThings"] && hook.send(
            new MessageBuilder()
              .setTitle("Used a Lucky Horseshoe")
              .setURL(message.url)
              .setDescription(
                client.user.username +
                ": Succesfully used a Lucky Horseshoe! "

              )
              .setColor("#2e3236")
          );

        }, randomInteger(6000, 8000));

      }

    }
    // You don't own a single Lucky Horseshoe, therefore cannot use it.


    if (!message?.guild && !isOnBreak && message?.author?.id == botid && config.autoUse.includes("Lucky Horseshoe") && message?.embeds[0]?.description?.includes("Lucky Horseshoe expired!")) {
      await channel.sendSlash(botid, "use", "Lucky Horseshoe");

      !config["dontLogUselessThings"] && hook.send(
        new MessageBuilder()
          .setTitle("Used Lucky Horseshoe")
          .setURL(message.url)
          .setDescription(
            client.user.username +
            ": Succesfully used a Lucky Horseshoe! "

          )
          .setColor("#2e3236")
      );
    }

    if (!message?.guild && !isOnBreak && message?.author?.id == botid && config.autoUse.includes("Apple") && message?.embeds[0]?.description?.includes("Apple expired!")) {
      await channel.sendSlash(botid, "use", "Apple");
      !config["dontLogUselessThings"] && hook.send(
        new MessageBuilder()
          .setTitle("Used Apple")
          .setURL(message.url)
          .setDescription(
            client.user.username +
            ": Succesfully used an Apple! "

          )
          .setColor("#2e3236")
      );
    }
    // Your lifesaver protected you!
    if (!message?.guild && message?.author?.id == botid && message?.embeds[0]?.title?.includes("Your lifesaver protected you") && config.autoBuyItems.includes("Life Saver")) {
      // await channel.sendSlash(botid, "use", "Apple");
      if (acc_bal >= 100000) {
        await channel.sendSlash(botid, "shop buy", "Life Saver");
        !config["dontLogUselessThings"] && hook.send(
          new MessageBuilder()
            .setTitle("Bought a Life Saver")
            .setURL(message.url)
            .setDescription(
              client.user.username +
              ": Succesfully bought a Life Saver! "

            )
            .setColor("#2e3236")
        );
      }
      else if (acc_bank >= 100000 && acc_bal < 100000) {
        await channel.sendSlash(botid, "withdraw", "100000");
        setTimeout(async () => {
          await channel.sendSlash(botid, "shop buy", "Life Saver");
          !config["dontLogUselessThings"] && hook.send(
            new MessageBuilder()
              .setTitle("Bought a Life Saver")
              .setURL(message.url)
              .setDescription(
                client.user.username +
                ": Succesfully bought a Life Saver! "

              )
              .setColor("#2e3236")
          );


        }, randomInteger(2000, 2500));

      }
    }

    if (message.interaction?.user == client.user && message?.embeds[0]?.description?.includes("You don't own a single Lucky Horseshoe, therefore cannot use it.") && config.autoBuyItems.includes("Lucky Horseshoe") && config.autoUse.includes("Lucky Horseshoe")) {

      if (acc_bal >= 75000) {
        await channel.sendSlash(botid, "shop buy", "Lucky Horseshoe");
        !config["dontLogUselessThings"] && hook.send(
          new MessageBuilder()
            .setTitle("Bought a Lucky Horseshoe")
            .setURL(message.url)
            .setDescription(
              client.user.username +
              ": Succesfully bought a Lucky Horseshoe! "

            )
            .setColor("#2e3236")
        );

      }
      else if (acc_bank >= 75000 && acc_bal < 75000) {
        await channel.sendSlash(botid, "withdraw", "75000");
        setTimeout(async () => {
          await channel.sendSlash(botid, "shop buy", "Lucky Horseshoe");
          !config["dontLogUselessThings"] && hook.send(
            new MessageBuilder()
              .setTitle("Bought a Lucky Horseshoe")
              .setURL(message.url)
              .setDescription(
                client.user.username +
                ": Succesfully bought a Lucky Horseshoe! "

              )
              .setColor("#2e3236")
          );





        }, randomInteger(2000, 2500));

      }
      setTimeout(async () => {
        await channel.sendSlash(botid, "use", "Lucky Horseshoe");
        !config["dontLogUselessThings"] && hook.send(
          new MessageBuilder()
            .setTitle("Used a Lucky Horseshoe")
            .setURL(message.url)
            .setDescription(
              client.user.username +
              ": Succesfully used a Lucky Horseshoe! "

            )
            .setColor("#2e3236")
        );

      }, randomInteger(5000, 8000));
    }


    // INFO: read alerts
    if (
      message.embeds[0]?.title?.includes("You have an unread alert!") &&
      message.content?.includes(client.user.id)
    ) {
      await channel.sendSlash(botid, "alert");
    }
    playFGame(message, channelId);

    // playFGame(message,channel.id);

    // INFO: when /serverevents payout used and "Only event managers can payout from the server's pool!" is displayed
    // TODO: move to dedicated function


    if (message.interaction?.user == client.user && message?.embeds[0]?.description?.includes("To start your streaming journey, you need following")) {
      // console.log(acc_bal)
      // console.log(acc_bank)
      if (Number(acc_bal) >= 200000) {
        await message.channel.sendSlash(botid, "shop buy", "Mouse", "1");
        setTimeout(async () => {
          await message.channel.sendSlash(botid, "shop buy", "Keyboard", "1");
        }, randomInteger(2000, 4000));

      } else if (Number(acc_bal) < 200000 && Number(acc_bank) >= 200000) {
        await message.channel.sendSlash(botid, "withdraw", "200k");
        setTimeout(async () => {
          await message.channel.sendSlash(botid, "shop buy", "Mouse", "1");
        }, randomInteger(2000, 4000));
        setTimeout(async () => {
          await message.channel.sendSlash(botid, "shop buy", "Keyboard", "1");
        }, randomInteger(2000, 4000));



      }
    }

    if (
      message.embeds[0]?.description?.includes("from the server's pool!")
    ) {
      if (isServerPoolEmpty) {
        inv(botid, channel);
      } else {
        setTimeout(async () => {
          // await message.channel.sendSlash(botid, "inventory")
          if (config.transfer.serverEventsDonatePayout)
            await channel.sendSlash(
              botid,
              "serverevents pool"
            );
        }, randomInteger(config.cooldowns.serverEvents.minDelay, config.cooldowns.serverEvents.maxDelay));
      }
    }

    if (
      message.interaction?.user !== client.user ||
      message.author.id !== botid ||
      !channel
    )
      return;

    // autoBuyItem(message, client, acc_bal, acc_bank);
    autoToolBuyer(message, client, acc_bal, acc_bank);
    autoBuyLife(message, client, acc_bal, acc_bank);
    // autoUseHorse(message, client);

    if (message.author.id !== botid || message.channel.id !== channel.id)
      return;
    // console.log(message.embeds[0])

    // // if (message.mentions.has(client.user.id)) {
    // if (message.embeds[0] && message.embeds[0].title && message.embeds[0].title.includes(client.user.username + "'s Meme Posting Session") && message.embeds[0].description) {
    //     //to be added later

    // }
    playMiniGames(message);
    playFGame(message, channel.id);


    if (message?.flags?.has("EPHEMERAL") && message?.embeds[0]?.description?.includes("You have an ongoing command running.")) {
      ongoingCmd = true;
      isBotFree = false;
      setTimeout(async () => {
        isBotFree = true;
        ongoingCmd = false;
      }, randomInteger(config.cooldowns.commandInterval.minDelay * 3.5, config.cooldowns.commandInterval.maxDelay * 5.5));
    }
    if (
      commandsUsed.includes("postmemes") &&
      message.embeds[0]?.description?.includes(
        "Pick a meme type and a platform to post a meme on!"
      )
    ) {
      postMeme(message);
    }

    // INFO: when inventory is empty
    // TODO: move to dedicated function
    if (
      message.embeds[0]?.description?.includes("Yikes, you have nothing") || message.embeds[0]?.description.length <= 75 && message.embeds[0]?.description.includes("Trivia Trophy") 
    ) {
      isInventoryEmpty = true;
      if (config.transfer.serverEventsDonateMode || config.transfer.serverEventsDonatePayout) {
        setTimeout(async () => {
          // await message.channel.sendSlash(botid, "inventory")
          if (!(isInventoryEmpty && isServerPoolEmpty)) {
            if (config.transfer.serverEventsDonatePayout)
              await message.channel.sendSlash(
                botid,
                "serverevents pool"
              );
          }
        }, randomInteger(config.cooldowns.serverEvents.minDelay, config.cooldowns.serverEvents.maxDelay));
      }

      if (config.transfer.serverEventsDonateMode || config.transfer.transferOnlyMode) {
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

    // INFO: when /serverevents pool and event items are shown
    // TODO: move to dedicated function
    // if (message.embeds[0] && message.embeds[0].description && message.embeds[0].description.includes("Successfully paid") && config.transfer.serverEventsDonateMode) {
    //     setTimeout(async () => {
    //         await message.channel.sendSlash(botid, "serverevents pool")
    //     }, randomInteger(config.cooldowns.serverEvents.minDelay, config.cooldowns.serverEvents.maxDelay));
    // }

    // if (message.embeds[0] && message.embeds[0].description && message.embeds[0].description.includes("Successfully donated!") && config.transfer.serverEventsDonateMode) {

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

    if (message.embeds[0]?.title === "Pending Confirmation" && message.interaction?.user == client.user) {
      highLowRandom(message, 1);

      // console.log(chalk.yellow("Sold all sellable items."))
    }

    // INFO: Register captcha
    handleCaptcha(message);

    // INFO: Return if config.transfer.transferOnlyMode is enabled
    if (config.transfer.transferOnlyMode) return;

    // INFO: When receive response of /balance command
    if (
      message.embeds[0]?.title?.includes(client.user.tag + "'s Balance")
    ) {
      purse = message.embeds[0].description
        .split("\n")[0]
        .replace("**Wallet**: ", "");
      acc_bal = Number(purse.replace("⏣ ", "").replace(/,/g, ''));
      bank = message.embeds[0].description
        .split("\n")[1]
        .replace("**Bank**: ", "");
      acc_bank = Number(bank.replace("⏣ ", "").replace(/,/g, '').replace(" ", "").split("/")[0]);
      net = message.embeds[0].description
        .split("\n")[6]
        .replace("**Total Net**: ", "");
      acc_net = Number(net.replace("⏣ ", "").replace(/,/g, ''));
      if (Users.entries < accounts) {
        Users.create({
          name: client.user.tag,
          wallet: acc_bal,
          bank: acc_bank,
          net: acc_net,
          wallet_unformatted: purse,
          bank_unformatted: bank,
          net_unformatted: net,
        });
      } else if (Users.entries >= accounts) {
        const user = Users.get(target => target.name === client.user.tag);
        user.name = client.user.tag
        user.wallet = acc_bal
        user.bank = acc_bank
        user.net = acc_net
        user.wallet_unformatted = purse
        user.bank_unformatted = bank
        user.net_unformatted = net
        user.save();
      }
      // console.log(JSON.stringify(Users.getAll()))
      app.get("/api_test", async (req, res) => {
        res.json(collection);
      });
      
      if (config.serverEventsDonateMode && config.serverEventsDonateMoney) {
        if (donateOnce) {
          await channel.sendSlash(botid, "serverevents donate", purse.replace("⏣ ", "").replace(/,/g, ''));
          if (!config.dontLogUselessThings) console.log(chalk.yellow(client.user.tag + ": Donated " + purse.replace("⏣ ", "").replace(/,/g, '') + " to server events pool."));
          donateOnce = false;

        }

      }
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

      if (answer) selectTriviaAnswers(message, answer);
      else {
        clickRandomButton(message, 0);
        !config["dontLogUselessThings"] &&
          console.log("Unknown trivia found");
      }
    }

    // INFO: Handle HighLow Command
    if (

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

    // INFO: Handle Stream Command

    if (
      commandsUsed.includes("stream") &&
      message.embeds[0]?.author?.name.includes(" Stream Manager")
    ) {
      try {
        if (message.embeds[0].fields[1].name !== "Live Since") {
          const components = message.components[0]?.components;

          if (
            components[0].type !== "SELECT_MENU" &&
            components[0].label.includes("Go Live")
          ) {
            // console.log("CLICKING BUTTON")
            await message.clickButton(components[0].customId);

            setTimeout(
              async () => {
                if (
                  message.components[0].components[0].type ==
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
                  const GamesMenu =
                    message.components[0].components[0]
                      .customId;
                  await message.selectMenu(GamesMenu, [Game]);
                } else {
                  return;
                }

                setTimeout(
                  async () => {
                    const components2 =
                      message.components[1]?.components;

                    setTimeout(
                      async () => {
                        if (components2[0]) {
                          await message.clickButton(
                            components2[0].customId
                          );
                        } else {
                          await message.clickButton(
                            components2[0].customId
                          );
                        }
                      },
                      1000,
                      1600
                    );
                  },
                  config.cooldowns.buttonClick.minDelay,
                  config.cooldowns.buttonClick.maxDelay
                );

                setTimeout(
                  async () => {
                    const check = randomInteger(0, 6);

                    if (check == 0 || check == 1) {
                      await message.clickButton(
                        message.components[0]?.components[0]
                          .customId
                      );
                    } else if (
                      check == 2 ||
                      check == 3 ||
                      check == 4 ||
                      check == 5
                    ) {
                      await message.clickButton(
                        message.components[0]?.components[1]
                          ?.customId
                      );
                    } else if (check == 6) {
                      await message.clickButton(
                        message.components[0]?.components[2]
                          .customId
                      );
                    }
                  },
                  config.cooldowns.buttonClick.minDelay,
                  config.cooldowns.buttonClick.maxDelay
                );
              },
              config.cooldowns.buttonClick.minDelay,
              config.cooldowns.buttonClick.maxDelay * 1.5
            );
          }
        } else if (message.embeds[0].fields[1].name == "Live Since") {
          const check = randomInteger(0, 6);

          if (check == 0 || check == 1) {
            await message.clickButton(
              message.components[0]?.components[0].customId
            );
          } else if (
            check == 2 ||
            check == 3 ||
            check == 4 ||
            check == 5
          ) {
            await message.clickButton(
              message.components[0]?.components[1].customId
            );
          } else if (check == 6) {
            await message.clickButton(
              message.components[0]?.components[2].customId
            );
          }
        }
      } catch (err) {
        console.error(err)
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

    randomCommand(client, channel, commandsUsed, true, ongoingCmd);

    // INFO: Deposit money
    if (config.autoDeposit && randomInteger(0, 100) === 2) {
      await channel.sendSlash(botid, "deposit", "max");
      !config["dontLogUselessThings"] &&
        console.log(chalk.yellow("Deposited all coins in the bank."));

      setTimeout(async () => {
        await channel.sendSlash(botid, "balance");
      }, randomInteger(3000, 7000));

    }

    // INFO: if autoGift is on send inventory command
    if (
      !config.transfer.transferOnlyMode &&
      config.autoGift &&
      token != config.mainAccount &&
      randomInteger(0, 90) === 7
    ) {
      await channel.sendSlash(botid, "inventory");
    }

    if (!config.transfer.transferOnlyMode && randomInteger(0, 30) === 3) {
      await channel.sendSlash(botid, "balance");
    }

    // setInterval(async () => {

    // if (
    // 	!config.transfer.transferOnlyMode &&
    // 	config.autoBuy &&
    // 	randomInteger(0, 300) === 3
    // ) {
    // 	Object.keys(config.autoBuyItems).forEach((item) => {
    // 		setTimeout(async () => {
    // 			// await channel.sendSlash(botid, "item", item);
    // 		}, randomInteger(7000, 12000));
    // 	});
    // }
    // if (!config.transfer.transferOnlyMode && randomInteger(0, 300) === 3) {
    // 			await channel.sendSlash(botid, "item", "Life Saver");
    // 		}
    // }, randomInteger(config.cooldowns.checkLifeSaver.minDelay, config.cooldowns.checkLifeSaver.maxDelay));

    // INFO: Sell All Items if autoSell is on
    if (
      config.autoSell &&
      token != config.mainAccount &&
      randomInteger(0, 4) === 100
    ) {
      await channel.sendSlash(botid, "sell all");
    }

    // INFO: Logic of taking break
    if (randomInteger(0, 320) == 50) {
      !config["dontLogUselessThings"] &&
        console.log(
          "\x1b[34m",
          "Taking a break for " + b / 1000 + " seconds."
        );
      !config["dontLogUselessThings"] &&
        hook.send(
          new MessageBuilder()
            .setTitle("Taking a break for " + b / 1000 + " seconds.")
            .setColor('#9bdef6')
        )
      isOnBreak = true;
      setTimeout(async function() {
        isOnBreak = false;
        setTimeout(async () => {
          if (config.autoBuyItems.includes("Life Saver")) await channel.sendSlash(botid, "item", "Life Saver");
        }, randomInteger(1000, 3000));

        main(channel);
        config.autoUse.forEach((item) => {
          setTimeout(async () => {
            await channel.sendSlash(botid, "use", item);
          }, randomInteger(12000, 16000));
        });
      }, b);
    } else if (randomInteger(0, 1700) == 400) {
      !config["dontLogUselessThings"] &&
        console.log(
          "\x1b[35m",
          "Sleeping for " + c / 1000 / 60 + " minutes."
        );
      !config["dontLogUselessThings"] &&
        hook.send(
          new MessageBuilder()
            .setTitle("Sleeping for " + c / 1000 / 60 + " minutes.")
            .setColor('#9bdef6')
        )
      isOnBreak = true;
      setTimeout(async function() {
        isOnBreak = false;
        setTimeout(async () => {
          if (config.autoBuyItems.includes("Life Saver")) await channel.sendSlash(botid, "item", "Life Saver");
        }, randomInteger(1000, 3000));

        main(channel);
        config.autoUse.forEach((item) => {
          setTimeout(async () => {
            await channel.sendSlash(botid, "use", item);
          }, randomInteger(12000, 16000));
        });
      }, c);
    } else {
      setTimeout(async function() {


        main(channel);
      }, a);
    }
  }
}

//-------------------------- Utils functions --------------------------\\
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function randomCommand(client, channel, commandsUsed, isBotFree, ongoingCmd) {
  if (config.transfer.transferOnlyMode) return;
  if (!ongoingCmd) {


    // console.log("TESTING")
    let command = config.commands[random(0, config.commands.length - 1)];
    if (commandsUsed.includes(command)) return;

    ongoingCommand = true;
      await channel.sendSlash(botid, command);
      !config["dontLogUselessThings"] &&
        console.log("\x1b[0m", client.user.tag + " - Using command " + command);
      commandsUsed.push(command);
      handleCommand(commandsUsed, command, 53000);


    if (command === "postmemes" || command === "highlow" || command === "trivia" || command === "search" || command === "crime" || command === "stream") {
      isBotFree = false;
    }
    // isBotFree = false;

  }

}
function removeAllInstances(arr, item) {
  for (var i = arr.length; i--;) {
    if (arr[i] === item) arr.splice(i, 1);
  }
}

async function handleCommand(commandsUsed, command, delay) {
  ongoingCommand = false;
  setTimeout(() => {
    removeAllInstances(commandsUsed, command);
  }, delay);
}

async function handleSearch(message) {
  const components = message.components[0]?.components;
  const len = components?.length;
  if (!len) return;
  for (var a = 0; a < 3; a++) {
    let btn = components[a];

    if (config.searchLocations?.includes(btn?.label.toLowerCase())) {
      clickButton(message, btn);
    } else {
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

async function autoToolBuyer(message, client, acc_bal, acc_bank) {
  if (config.autoBuy) {
    if (message.flags.has("EPHEMERAL") && message.embeds[0].description) {
      if (message.embeds[0].description?.includes("You don't have a ")) {
        const item = ["Fishing Pole", "Hunting Rifle", "Shovel"].find(
          (e) =>
            message.embeds[0]?.description?.includes(
              `don't have a ${e.toLowerCase()}`
            )
        );

        if (!item) {
          return;
        }
        if (acc_bal <= 25000 && acc_bank >= 25000) {
          await message.channel.sendSlash(botid, "withdraw", "25000");
          setTimeout(async () => {
            await message.channel.sendSlash(botid, "shop buy", item, "1");

          }
            , randomInteger(3000, 5000));
        } else {
          await message.channel.sendSlash(botid, "shop buy", item, "1");

        }



				/*!*/ config["dontLogUselessThings"] &&
          hook.send(
            new MessageBuilder()
              .setTitle("Bought Tool: " + item)
              .setURL(message.url)
              .setDescription(
                client.user.username +
                ": Succesfully bought a new " +
                item.toLowerCase()
              )
              .setColor("#2e3236")
          );
      }
    }
  }
}

async function autoBuyLife(message, client, acc_bal, acc_bank) {
  if (
    !message.embeds[0]?.title?.includes("Life Saver") ||
    !message?.embeds[0]?.description?.includes("own") ||
    !config.autoBuyItems.includes("Life Saver")
  )
    return;
  const total_own = message?.description?.replace(",", "").match(/own \*\*(\d+)/)[1];
  if (!total_own) return;
  if (Number(total_own) > 0) {
  } else {
    if (acc_bal <= 100000 && acc_bank >= 100000) {
      await message.channel.sendSlash(botid, "withdraw", "100000");
      setTimeout(async () => {
        await message.channel.sendSlash(botid, "shop buy", "Life Saver", "1");
        hook.send(
          new MessageBuilder()
            .setTitle("Bought Life Saver")
            .setURL(message.url)
            .setDescription(
              client.user.username +
              ": Succesfully bought a Life Saver "

            )
            .setColor("#2e3236")
        );
      }
        , randomInteger(3000, 5000));
    } else {
      await message.channel.sendSlash(botid, "shop buy", "Life Saver", "1");
      hook.send(
        new MessageBuilder()
          .setTitle("Bought Life Saver")
          .setURL(message.url)
          .setDescription(
            client.user.username +
            ": Succesfully bought a Life Saver "

          )
          .setColor("#2e3236")
      );

    }
  }


}
async function autoUseHorse(message, client) {
  if (message.interaction?.user !== client.user) return;
  let description = message.embeds[0]?.description;
  if (message?.embeds[0]?.description?.includes("You can't use this item, you've already used it and it's active right now!")) {
    setTimeout(async () => {
      // await message.channel.sendSlash(botid, "use", "Lucky Horseshoe");
    }, randomInteger(300000, 400000));
  } else {
    if (
      !message.embeds[0]?.title?.includes("Lucky Horseshoe") ||
      !description?.includes("own") ||
      !config.autoUse.includes("Lucky Horseshoe")
    )
      return;
    const total_own = description.replace(",", "").match(/own \*\*(\d+)/)[1];
    if (!total_own) return;
    if (Number(total_own) > 0) {
      await message.channel.sendSlash(botid, "use", "Lucky Horseshoe");
      !config["dontLogUselessThings"] &&
        console.log(chalk.green("Succesfully used a Lucky Horseshoe"));
    }
    // setTimeout(async () => {
    // 	await message.channel.sendSlash(botid, "item", "Lucky Horseshoe");
    // }, randomInteger(300000, 400000));
  }

}

async function autoBuyItem(message, client, acc_bal, acc_bank) {
  // if command not send by user then return
  if (message.interaction?.user !== client.user) return;
  let description = message.embeds[0]?.description;
  var ab = false;
  for (var a = 0; a < config.autoBuyItems.length; a++) {
    if (config.autoBuyItems[a]) { ab = true; break; }
  }
  if (
    !ab ||
    !description?.includes("own")
  )
    return;
  const total_own = description.replace(",", "").match(/own \*\*(\d+)/)[1];
  if (!total_own) return;
  let item = Object.keys(config.autoBuyItems).find((item) =>
    message.embeds[0]?.title?.includes(item)
  );

  if (config.autoBuyItems[item]["50/50"] && randomInteger(0, 1) === 0) return;

  let to_buy = config.autoBuyItems[item]["minimum"] - Number(total_own);
  if (to_buy <= 0) return;
  let pricePerItem = config.autoBuyItems[item]["pricePerItem"];
  if (acc_bal <= (to_buy * pricePerItem) && acc_bank >= (to_buy * pricePerItem)) {
    await message.channel.sendSlash(
      botid,
      "withdraw",
      (to_buy * pricePerItem).toString()
    );
  }


  setTimeout(async () => {
    await message.channel.sendSlash(
      botid,
      "shop buy",
      item,
      to_buy.toString()
    );
  }, randomInteger(2000, 4000));
}

async function clickButton(message, btn, once = true) {
  if (once) {
    try {
      let r = await message.clickButton(btn.customId);
      // if(btn.type === 'BUTTON')
      // isBotFree = true;
      return r;
    } catch (err) {
      return false;
    }
  }
  // INFO: try until success
  let interval = setInterval(
    async () => {
      try {
        // if (btn.disabled) return clearInterval(interval);
        await message.clickButton(btn.customId);
        clearInterval(interval);
      } catch (err) { }
    },
    config.cooldowns.buttonClick.minDelay * 1.5,
    config.cooldowns.buttonClick.maxDelay * 1.2
  );
}
async function playBossGame(message) {
  const btn = message.components[0]?.components[0];
  let interval = setInterval(async () => {
    if (btn.disabled) return interval.clearInterval();
    clickButton(message, btn);
  }, randomInteger(config.cooldowns.buttonClick.minDelay, config.cooldowns.buttonClick.maxDelay));
}

async function playFGame(message, channel) {
  if (message.channel.id === channel) {
    if (message.embeds[0] && message.embeds[0].description?.includes("F")) {
      const btn = message.components[0]?.components[0];
      if (btn?.label === "F") {
        clickButton(message, btn);
      } else if (
        message.embeds[0]?.description?.includes(
          "Attack the boss by clicking"
        )
      ) {
        playBossGame(message);
      }
    }
  }
}

async function postMeme(message) {
  let PlatformMenu = message.components[0].components[0]
  const MemeTypeMenu = message.components[1].components[0]

  // options
  const Platforms = PlatformMenu.options.map((opt) => opt.label);
  const MemeTypes = MemeTypeMenu.options.map((opt) => opt.label);

  // selected option
  const Platform = Platforms[Math.floor(Math.random() * Platforms.length)]
  const MemeType = MemeTypes[Math.floor(Math.random() * MemeTypes.length)]
  console.log(Platform, MemeType)

  // default option
  const defaultOption = PlatformMenu.options.find(opt => opt.default === true);
  const defaultLabel = defaultOption ? defaultOption.label : '';
  console.log(defaultLabel)

  if (!defaultLabel) {
    setTimeout(
      async () => {
        await message.selectMenu(1, [Platform])
        await wait(randomInteger(config.cooldowns.buttonClick.minDelay,
          config.cooldowns.buttonClick.maxDelay))
        await message.selectMenu(MemeTypeMenu, [MemeType])

      },
      randomInteger(config.cooldowns.buttonClick.minDelay,
        config.cooldowns.buttonClick.maxDelay)
    )
  }

  setTimeout(
    async () => {
      const btn = message.components[2]?.components[0]

      await clickButton(message, btn, false)
    },
    randomInteger(config.cooldowns.buttonClick.minDelay * 1.2,
    config.cooldowns.buttonClick.maxDelay)
  )
}


  // console.log(btn.disabled)
  // INFO: try until success
  // setTimeout(
  //   async () => {

  // setTimeout(
  // 	async () => {
  // 		if (!btn.disabled) {
  // 			await clickButton(message, btn, false);
  // 		} else {
  // 			setTimeout(
  // 				async () => {
  // 					await clickButton(message, btn, false);
  // 				},
  // 				1000,
  // 				2000
  // 			);
  // 		}
  // 	},
  // 	2000,
  // 	3000
  // );

  // },
  //    1000,
  //    2000
  //  );

async function handleInventoryCommand(client, token, channel, message, gs = 0) {
  // console.log(message.embeds[0])
  setTimeout(async () => {
    var [name, quantity] = message.embeds[0]?.description?.split("\n")[gs]?.split("** ─ ");
    name = name?.split("> ")[1];
    isInventoryEmpty = name != undefined;
    // INFO: if config.transfer.serverEventsDonateMode enable
    if (config.transfer.serverEventsDonateMode) {
      if (!Blacklist.includes(name)) {
            console.log(chalk.blue(client.user.tag + " " + name + ": " + quantity));

        await message.channel.sendSlash(
          botid,
          "serverevents donate",
          quantity,
          name
        );
      } else {
        gs = gs + 3;
        handleInventoryCommand(client, token, channel, message, gs)

      }
    }
  }, randomInteger(300, 700));
}


async function handleMarketPost(channelId, message) {
  //             Posted an offer to sell **23x <:Alcohol:984501149501653082> Alcohol** on the market.\n' +
  // 'This offer is not publicly visible. Offer ID: `PVN3OP02`
  //get text after :
  var offerID = message.embeds[0].description
    ?.split("Offer ID: `")[1]
    ?.split("`")[0];
  if (!offerID) return;
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

    // playFGame(message);
  });

  // INFO: setTimeout for /market accept
  setTimeout(async function() {
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
  if (message.channel.id !== config.mainInfo.channel) return;

  // INFO: redeem voucher
  if (
    message.embeds[0]?.description?.includes(
      "Which adventure box would you like to redeem?"
    )
  ) {
    let row = config.mainInfo.adventureVoucherPrefer == "Space" ? 0 : 1;
    let box =
      (config.mainInfo.adventureVoucherPrefer == "Space"
        ? "Space"
        : "Out West") + " Adventure Box";
    setTimeout(async () => {
      clickButton(message, message.components[row].components[0]);

      // INFO: use Box
      setTimeout(async () => {
        channel.sendSlash(botid, "use", box);
      }, 100000);
    }, randomInteger(config.cooldowns.buttonClick.minDelay, config.cooldowns.buttonClick.maxDelay));
  }
}

async function playMiniGames(message, edited = false) {
  let description = message.embeds[0]?.description?.replace(
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
      randomInteger(0, 1)
    ]; // filter and remove unsafe position button and select random from 0 or 1 (total 3 button 1 is unsafe other is safe so)
    await clickButton(message, btn, true);
  } else if (description?.includes("Catch the fish!")) {
    let fishPosition = positions[0].length - 1; // here 0 because 2nd line was fish not a dragon like has in dodge fireball
    let btn = message.components[0]?.components[fishPosition];
    await clickButton(message, btn, true);
  }
}

var log = console.log;

console.log = function() {
  var first_parameter = arguments[0];
  var other_parameters = Array.prototype.slice.call(arguments, 1);

  function formatConsoleDate(date) {
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var milliseconds = date.getMilliseconds();

    return chalk.magenta('[' +
      ((hour < 10) ? '0' + hour : hour) +
      ':' +
      ((minutes < 10) ? '0' + minutes : minutes) +
      ':' +
      ((seconds < 10) ? '0' + seconds : seconds) +
      '] - ')
  }

  log.apply(console, [formatConsoleDate(new Date()) + first_parameter].concat(other_parameters));
};
