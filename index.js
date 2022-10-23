process.on('unhandledRejection', (reason, p) => {
    console.log(' [Anti Crash] >>  Unhandled Rejeciton/Catch');
    console.log(reason, p)
})

process.on('uncaughtException', (e, o) => {
    console.log(' [Anti Crash] >>  Uncaught Exception/Catch');
    console.log(e, o)
})

process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.log(' [AntiCrash] >>  Uncaught Exception/Catch (MONITOR)');
    console.log(err, origin);
});

process.on('multipleResolves', (type, promise, reason) => {
    console.log(' [AntiCrash] >>  Multiple Resolves');
    console.log(type, promise, reason);
});
var channel;
// Version 1.0
const { Webhook } = require('discord-webhook-node');

const { Client, Discord } = require('discord.js-selfbot-v13');

const chalk = require('chalk');
const config = require('./config.json');
const figlet = require('figlet');
const client = new Client({ checkUpdate: false, readyStatus: false });
const botid = "270904126974590976";
var commandsUsed = [];
var ongoingCommand = false;
const hook = new Webhook(config.webhook);

const fs = require('fs-extra')
async function findAnswer(question) {
    const trivia = await fs.readJson('./trivia.json')
    for (let i = 0; i < trivia.database.length; i++) {
        if (trivia.database[i].question.includes(question)) {
            return trivia.database[i].correct_answer;
        }
    }
}

client.on('ready', async () => {
    client.user.setStatus('invisible');

    console.log(
        chalk.yellow(
            figlet.textSync('Slashy', { horizontalLayout: 'full' })
        )
    );
    console.log(chalk.green(`Logged in as ${chalk.cyanBright(client.user.tag)}`));


    channel = client.channels.cache.get(config.channel_id);
    if (!channel) return;
    console.log("Playing Dank Memer in " + channel.name)
    hook.send("Started. Playing Dank Memer in <#" + channel.id + ">");

    main(channel)

})

client.on('messageCreate', async (message) => {
    if (!channel) return;
    if (message.author.id === botid) {

        if (!message.embeds[0].description) return;
        if (commandsUsed.includes('search') && message.embeds[0].description.includes("Where do you want to search?")) {
            clickRandomButton(message, 0)
        }
        if (commandsUsed.includes('crime') && message.embeds[0].description.includes("What crime do you want to commit?")) {
            clickRandomButton(message, 0)
        }
        if (commandsUsed.includes('postmemes') && message.embeds[0].description.includes("Pick a meme to post to the internet")) {
            clickRandomButton(message, 0)
        }


        if (commandsUsed.includes('trivia') && message.embeds[0].description.includes(" seconds to answer*")) {
            var time = message.embeds[0].description
            var question = message.embeds[0].description.replace(/\*/g, '').split("\n")[0].split('"')[0];

            let answer = await findAnswer(question);

            selectTriviaAnswers(message, answer)

        }
        if (commandsUsed.includes('highlow') && message.embeds[0].description.includes("I just chose a secret number between 1 and 100.")) {

            var a = message.embeds[0].description.replace("I just chose a secret number between 1 and 100.", "");
            var b = a.replace("Is the secret number *higher* or *lower* than **", "");
            var c = parseInt(b.replace("**?", "").trim())

            if (c > 50) {
                highLowRandom(message, 0)

            }
            if (c <= 50) {
                highLowRandom(message, 2)

            }

        }

    }

});

client.login(config.token);

async function main(channel) {
    var a = randomInteger(1000, 5000);
    var b = randomInteger(30 * 1000, 90 * 1000);

    var c = randomInteger(10 * 1000 * 60, 80 * 60 * 1000);

    randomCommand(channel)

    if (config.autoDeposit && randomInteger(0, 100) === 2) {
        await channel.sendSlash(botid, "deposit", "max")
        console.log(chalk.yellow("Deposited all coins in the bank."))
    }



    if (config.autoSell && randomInteger(0, 100) === 3) {
        await channel.sendSlash(botid, "sell all")
        console.log(chalk.yellow("Sold all sellable items."))
    }


    if (randomInteger(0, 250) == 50) {
        console.log("\x1b[34m", "Taking a break for " + b / 1000 + " seconds.")
              hook.send("Taking a break for " + b / 1000  + " seconds.")

        setTimeout(async function () {
            main(channel)
        }, b);
    } else if (randomInteger(0, 1200) == 400) {
        console.log("\x1b[35m", "Sleeping for " + c / 1000 / 60 + " minutes.")
        hook.send("Sleeping for " + c / 1000 / 60 + " minutes.")

        setTimeout(async function () {
            main(channel)
        }, c);
    } else {
        setTimeout(async function () {
            main(channel)
        }, a);
    }
}
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

async function randomCommand(channel) {
    let command = config.commands[random(0, config.commands.length - 1)];
    if (commandsUsed.includes(command)) return;
    console.log("\x1b[0m", "Using command " + command)
    commandsUsed.push(command)


    ongoingCommand = true;

    if (command === "beg") {
        await channel.sendSlash(botid, "beg")

        handleCommand(command, "beg", 51000, 55000)

    } else if (command === "fish") {
        await channel.sendSlash(botid, "fish")

        handleCommand(command, "fish", 46000, 50000)

    } else if (command === "hunt") {
        await channel.sendSlash(botid, "hunt")

        handleCommand(command, "hunt", 46000, 50000)

    } else if (command === "dig") {
        await channel.sendSlash(botid, "dig")

        handleCommand(command, "dig", 46000, 50000)

    } else if (command === "search") {
        await channel.sendSlash(botid, "search")

        handleCommand(command, "search", 36000, 42000)

    } else if (command === "crime") {
        await channel.sendSlash(botid, "crime")

        handleCommand(command, "crime", 49000, 55000)

    } else if (command === "postmemes") {
        await channel.sendSlash(botid, "postmemes")

        handleCommand(command, "postmemes", 53000, 64000)

    } else if (command === "highlow") {
        await channel.sendSlash(botid, "highlow")

        handleCommand(command, "highlow", 53000, 64000)

    } else if (command === "trivia") {
        await channel.sendSlash(botid, "trivia")

        handleCommand(command, "trivia", 6500, 10000)

    }
}
function removeAllInstances(arr, item) {
    for (var i = arr.length; i--;) {
        if (arr[i] === item) arr.splice(i, 1);
    }
}

async function handleCommand(command, com, delaymin, delaymax) {
    if (command === com) {
        ongoingCommand = false;

        setTimeout(() => {
            removeAllInstances(commandsUsed, com);
        }
            , delaymin)

    }
}

async function clickRandomButton(message, rows) {
    setTimeout(async () => {

        const components = message.components[randomInteger(0, rows)]?.components;
        const len = components?.length;
        let customId;
        if (len == NaN) return;
        customId = components[Math.floor(Math.random() * len)].customId;
        return await message.clickButton(customId);

    }, randomInteger(500, 1500))
}



async function highLowRandom(message, number) {
    setTimeout(async () => {

        const components = message.components[0]?.components;
        const len = components?.length;
        let customId;
        if (len == NaN) return;
        customId = components[number].customId;
        return await message.clickButton(customId);

    }, randomInteger(500, 1500))
}


async function selectTriviaAnswers(message, ans) {
    setTimeout(async () => {
        var flag = false;

        const components = message.components[0]?.components;
        const len = components?.length;
        let customId;
        if (len == NaN) return;

        for (var i = 0; i < components.length; i++) {
            if (components[i].label.includes(ans)) {
                customId = components[i].customId;
                flag = true;
                return await message.clickButton(customId);
            }
        }
        if (!flag || ans === undefined) {
            customId = components[randomInteger(0, 3)].customId;
            return await message.clickButton(customId);

        }

    }, randomInteger(500, 5500))
}
function randomInteger(min, max) {
    if (min == max) {
        return min;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
