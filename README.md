<meta name="description" content="Slashy is a Dank Memer (Selfbot) Farm with slash commands support and random delays and breaks to avoid any suspicion. This is completely undetectable and can be used 24/7 on VPS or Replit or any host of your choice. It also offers other utility functions to automate features to make you rich in Dank memer. Apart from auto-grinding, the bot extends its features to easy customization with easy setup."/>

<meta name="keywords" content="Dank Memer, Dank Memer Bot, Dank Memer Commands, Dank Memer Premium, Dank Memer Discord Bot, Dank Memer Coins, Dank Memer Cheats, Dank Memer Memes, Dank Memer Heists, Dank Memer Robbing, Dank Memer Gambling, Dank Memer Stealing, Dank Memer Trading, Dank Memer Trivia, Dank Memer Item Shop, Dank Memer Sell, Dank Memer Buy, Dank Memer Jobs, Dank Memer Currency, Dank Memer Daily, Dank Memer Giveaways, Dank Memer Community, Dank Memer Server, Dank Memer Bots, Dank Memer Selfbot, Dank Memer Cheat, Dank Memer Hack, Dank Memer Money Method, Dank Memer Duping, Dank Memer Market, Dank Memer Reddit, Dank Memer Pro"/>

<meta name="author" content="TahaGorme & kyan0045"/>
<meta name="url" content="https://github.com/TahaGorme/Slashy" />
<meta name="og:title" content="Slashy; Dank Memer Selfbot"/>
<meta name="google-site-verification" content="premium best" />
<meta name="og:url" content="https://github.com/TahaGorme/Slashy" />
<meta name="og:image" content="https://media.discordapp.net/attachments/1031166956541333675/1057671549831880724/image.png" />
<meta name="og:description" content="Slashy is a Dank Memer (Selfbot) Farm with slash commands support and random delays and breaks to avoid any suspicion. This is completely undetectable and can be used 24/7 on VPS or Replit or any host of your choice."/>

<!-- Header Top img  -->
<img src="https://media.discordapp.net/attachments/1031166956541333675/1057671549831880724/image.png" lt="slashy logo" align="left" height="170"><h1>Slashy; Dank Memer Selfbot</h1>

Advanced and free Dank Memer selfbot</br>
[![Support Server](https://img.shields.io/badge/Support_Server-000?style=for-the-badge&logo=&color=informational)](https://discord.gg/vpHKcMZrrt)
![Version](https://img.shields.io/badge/Version-1.9.4-000?style=for-the-badge&logo=&color=informational)
[![Stargazers](https://img.shields.io/github/stars/TahaGorme/Slashy?style=for-the-badge&logo=&color=blue)](https://github.com/TahaGorme/Slashy/stargazers)
[![Forks](https://img.shields.io/github/forks/TahaGorme/Slashy?style=for-the-badge&logo=&color=blue)](https://github.com/TahaGorme/Slashy/network/members)
[![Issues](https://img.shields.io/github/issues/TahaGorme/Slashy?style=for-the-badge&logo=&color=informational)](https://github.com/TahaGorme/Slashy/issues)
[![Pull Requests](https://img.shields.io/github/issues-pr/TahaGorme/Slashy?style=for-the-badge&logo=&color=informational)](https://github.com/TahaGorme/Slashy/pulls)


# Slashy

Slashy is a Dank Memer (Selfbot) Farm with slash commands support and random delays and breaks to avoid any suspicion.

This is completely undetectable and can be used 24/7 on VPS or Replit or any host of your choice



# Features

* Free
* Supports slash commands and buttons
* Minigame Boss Support ( dragen, kraken, legendary fish)
* Multiple Tokens / Account Supported
* Load tokens from a file
* Completely Undetectable (Anti Ban)
* Invisible (Will set your status to offline to prevent appearing online 24/7.)
* Can be used 24/7 without getting banned
* Automatic sleeps and breaks. The selfbot will automatically take random breaks to avoid any suspicion. 
* Website which shows money in your account
* ![image](https://user-images.githubusercontent.com/63650975/197828172-f868c128-a034-4344-9ec4-bc54225bdbd8.png)
* Solves Captchas
* Item transfer from alts to main ( market method and serverevents pool method)
* Auto Alerts reader
* Customisable cooldowns
* Random delays between commands. The selfbot will run commands at random intervals.
* Random commands every time. The selfbot will use a random command from the list provided in the config.json
* Less Ram Usage
* Auto sell
* Auto Stream
* Custom search locations
* Auto buy tools when required
* Autouse apple and horseshoe
* Autobuy items
* Auto redeem adventure voucher
* Auto deposit all the money in bank
* Solve all the trivia. If the bot does not know the answer of a trivia (less chances) the bot will click a random button
* Logs things in webhooks
* Works with most of the commands
  * beg
  * postmemes
  * highlow
  * crime
  * search
  * fish
  * dig
  * hunt
  * trivia
  * stream

## Discord Server
https://discord.gg/HGfFFUQ7F7


## Installation

Download [nodejs](https://nodejs.org/)



```javascript
git clone https://github.com/TahaGorme/slashy.git
```

```javascript
cd slashy
```

```bash
npm i
```

- now make copy of [config.json.example](./config.json.example) & name it [config.json](./config.json) and enter your details there

```javascript
node .
```
### Replit Deploy
[Fork this](https://replit.com/@TahaGorme/slashy?v=1)

- For replit, create secret variable named "JSON" and put config.json data there

## Batch File Format
- File name is "batch_token.cfg"
```js
channelId1 token1 // space to separate them
channelId2 token2
```

- Set `isBatchTokenFile` to `true` in config file to enable batch file ( tokens:{} will be ignored )

- For **Replit**, create new secret name it "**TOKENS**" and write batch file content there
## Config
```json
{
	"isBatchTokenFile": false, // set true to load batch file
	"tokens": [
		{
			"token": "token1",
			"channelId": "69420"
		},
		{
			"token": "token2",
			"channelId": "696969"
		}
	], // tokens for the selfbot
	//commands which you want the bot to use (these are the only commands supported. you can remove commands which you dont want the bot to use.
	"commands": [
		"beg",
		"postmemes",
		"highlow",
		"fish",
		"hunt",
		"dig",
		"trivia",
		"search", //recommended to remove the search command to prevent death
		"crime", //recommended to remove the crime command to prevent death
		"stream"
		"scratch"  // recommended to remove it. it looses more money than the money it earns. 
	],
	"autoScratch": {
		"scratchAmount": "1500" // the money which you want to bet for the scratch command
	},
	  "Blacklistitems": ["Trivia Trophy", "Life Saver", "Apple", "Lucky Horseshoe"],

  	"searchLocations":[
		"dog",
		"air"
	],

	"channel_id": "channel id", //channel where you want the bot to play dank memer
	"webhook": "webhook url", //webhook to log certain things
	"autoDeposit": true,
	"autoSell": false,
	"autoGift": false,
	"autoBuy": true,
	"autoUse":[
		"Apple",
		"Lucky Horseshoe"
	],
	"useDarkendTrivia": true,
	"dontLogUselessThings": false, // Not log sleeping,taking break,using command & deposited and  Not send started playing in <#channel>,sleeping & taking break in webhook

	"mainAccount": "your main account token",
	"mainId": {
		"channel": "channel", // channel where you want main id to use commands
		"itemToUse": ["Adventure Voucher"], // (support adv. voucher currently ) list of items to use frequently (30second)
		"adventureVoucherPrefer": "Space" // "Space" means take space box or anything else means "Out West" box
	},
	
	"transferOnlyMode": false, //ONLY ENABLE IF YOU WANT TO TRANSFER ITEMS ONLY AND NOT GRIND
        "serverEventsDonateMode":false, // ENABLE THIS IF YOU OWN A SERVER WITH 200+ MEMBERS AND YOU WANNA TRANSFER ITEMS FROM YOUR ALTS TO MAIN
        "serverEventsDonateMoney":true, // ENABLE THIS IF YOU WANNA DONATE MONEY TOO
	"autoBuyItems": [
		"Life Saver",
		"Lucky Horseshoe"
	],

	"cooldowns": { // only edit cooldowns if you know what you are doing
		"market": {
			"minDelay": 3000,
			"maxDelay": 6000
		},
		"buttonClick": {
			"minDelay": 400,
			"maxDelay": 800
		},
		"trivia": {
			"minDelay": 500,
			"maxDelay": 1500
		},
		"commandInterval": {
			"minDelay": 1000,
			"maxDelay": 2000
		},
		"shortBreak": {
			"minDelay": 30000,
			"maxDelay": 90000
		},
		"longBreak": {
			"minDelay": 600000,
			"maxDelay": 4000000
		},
		"transfer": {
			"minDelay": 4000,
			"maxDelay": 8000
		},
      "serverEvents":{
			"minDelay": 3000,
			"maxDelay": 5000
		}
	}




}


```


# Configs

Some money making configs.

### Balance Increaser

This config will focus more on your balance. This will increase your balance and net worth. [RECOMMENDED]

```json
	"commands": [
		"beg",
		"postmemes",
		"highlow",
		"fish",
		"hunt",
		"dig",
		"trivia",
		"stream"
	],
	"autoBuyItems": [
		"Life Saver"
	],
```

### Net Worth Increaser 
This config will not care about your balance. this will make you die a lot of times but the loot which you will have in your inventory will be worth it. It uses horse shoe, apple and searches places worth loot in the search command


```json
"commands": [
		"beg",
		"postmemes",
		"highlow",
		"fish",
		"hunt",
		"dig",
		"trivia",
		"stream",
        "crime",
        "search"
	],
    "searchLocations":[
        "aeradella's home",
        "dog",
        "grass",
        "kitchen",
        "mailbox",
        "police officer",
        "shadow's realm",
        "soul's chamber",
        "tesla",
        "toxic waste plant",
        "lego bin" 
	],
	"autoBuyItems": [
		"Lucky Horseshoe"
	],
	"autoUse":[
		"Apple",
		"Lucky Horseshoe"
	],
```


## Contributing
Pull requests are welcomed. For major changes, please open an issue first to discuss what you would like to change.


## License
[MIT](https://choosealicense.com/licenses/mit/)
