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
[Fork this](https://replit.com/@TahaGorme/Slashy?v=1)

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
	"isBatchTokenFile": false,
	"tokens": [
		{
			"token": "token1",
			"channelId": "696969"
		},
		{
			"token": "token2",
			"channelId": "696969"
		}
	],
       "commands": [
		"beg",
		"postmemes",
		"highlow",
		"fish",
		"hunt",
		"dig",
		"trivia",
		"search",
		"crime",
		"stream",
		"scratch"
	],	
   "autoScratch": {
		"scratchAmount": "1500"
	},                                                            
	  "Blacklistitems": ["Trivia Trophy", "Life Saver", "Apple", "Lucky Horseshoe"],
		"searchLocations":[
		"dog",
		"air"              ],

	"webhook": "webhook",
	"autoDeposit": true,
	"autoSell": false,
	"autoGift": false,
	"autoBuy":true,
	"autoUse":[
		"Apple",
		"Lucky Horseshoe"
	],
	"useDarkendTrivia":false,
	"dontLogUselessThings": false,
	
	"mainAccount": "main_token",
	"mainId": {
		"channel": "696969",
		"itemToUse": ["Adventure Voucher"],
		"adventureVoucherPrefer": "Space"
	},
	"transferOnlyMode": false,
	"serverEventsDonateMode": false,
	"serverEventsDonatePayout":true,

	"autoBuyItems": [
		"Life Saver",
		"Lucky Horseshoe"
	],

	"cooldowns": {
		"market": {
			"minDelay": 3000,
			"maxDelay": 6000
		},
		"buttonClick": {
			"minDelay": 600,
			"maxDelay": 850
		},
		"trivia": {
			"minDelay": 600,
			"maxDelay": 1000
		},
		"commandInterval": {
			"minDelay": 2400,
			"maxDelay": 2800
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
		"serverEvents": {
			"minDelay": 3000,
			"maxDelay": 5000
		}
	}
}
,



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
