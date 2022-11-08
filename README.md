# Slashy

Slashy is a Dank Memer (Selfbot) Farm with slash commands support and random delays and breaks to avoid any suspicion.

This is completely undetectable and can be used 24/7 on VPS or Replit or any host of your choice



# Features

* Free
* Supports slash commands and buttons
* Multiple Tokens / Account Support
* Completely Undetected (Anti Ban)
* Invisible (this will not make your account look 24/7 online. this will set it's status to invisible)
* Can be used 24/7 without getting banned
* Automatic sleeps and breaks. The selfbot will automatically take random breaks to avoid any suspicion. 
* Website which shows money in your account
* ![image](https://user-images.githubusercontent.com/63650975/197828172-f868c128-a034-4344-9ec4-bc54225bdbd8.png)
* Solve Captchas
* Item transfer from alts to main
* Auto Alerts reader
* Editable cooldowns
* Item Blacklist for auto transfer
* Random delays between commands. The selfbot will run commands at random intervals.
* Random commands every time. The selfbot will use a random command from the list provided in the config.json
* Less Ram Usage
* Auto sell
* Auto deposit all the money in bank
* Solve all the trivia. If the bot does not know the answer of a trivia (less chances) the bot will click a random button
* 
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
* Logs things in webhooks




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
## Config

```json
{
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
    "crime" //recommended to remove the crime command to prevent death
  ],
  "channel_id": "channel id", //channel where you want the bot to play dank memer
  "webhook": "webhook url", //webhook to log certain things
  "autoDeposit": true, // enable if you want to auto deposit money in your bank
  "autoSell":true, //enable if you want to sell sellable items automatically,
    "autoGift": false, //enable if you want auto items transfer from alts to main
      "mainAccount": "your main account token",
       
    "transferOnlyMode": false, //ONLY ENABLE IF YOU WANT TO TRANSFER ITEMS ONLY AND NOT GRIND
      "serverEventsDonateMode":false, // ENABLE THIS IF YOU OWN A SERVER WITH 200+ MEMBERS AND YOU WANNA TRANSFER ITEMS FROM YOUR ALTS TO MAIN

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



## Discord Server
https://discord.gg/HGfFFUQ7F7

## Contributing
Pull requests are welcomed. For major changes, please open an issue first to discuss what you would like to change.


## License
[MIT](https://choosealicense.com/licenses/mit/)
