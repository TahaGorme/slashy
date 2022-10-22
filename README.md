# Slashy

Slashy is a Dank Memer (Selfbot) Farm with slash commands support and random delays and breaks to avoid any suspicion.

This is completely undetectable and can be used 24/7 on VPS or Replit or any host of your choice



# Features

* Free
* Supports slash commands and buttons
* Completely Undetected (Anti Ban)
* Can be used 24/7 without getting banned
* Automatic sleeps and breaks. The selfbot will automatically take random breaks to avoid any suspicion. 
* Random delays between commands. The selfbot will run commands at random intervals.
* Random commands every time. The selfbot will use a random command from the list provided in the config.json
* Less Ram Usage
* Auto sell
* Auto deposit all the money in bank
* Solve all the trivia. If the bot does not know the answer of a trivia (less chances) the bot will click a random button
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

```javascript
node .
```

## Config

```json
{
  "token": "token", // your account's token
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
  "autoSell":true //enable if you want to sell sellable items automatically
}

```



I know the code is not clean. Please bear with it

## Discord Server
https://discord.gg/HGfFFUQ7F7

## Contributing
Pull requests are welcomed. For major changes, please open an issue first to discuss what you would like to change.


## License
[MIT](https://choosealicense.com/licenses/mit/)
