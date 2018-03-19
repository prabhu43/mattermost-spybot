# mattermost-spy-bot
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fprabhu43%2Fmattermost-spybot.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fprabhu43%2Fmattermost-spybot?ref=badge_shield)


SpyBot notifies you when a specific user comes online after you have told the bot to spy on the user

### Set environment variables
1. Create .env file using the template of file 'sample-env'
2. Fill all the environment variables mentioned in the file

### Create Slash Command

##### Create a slash command and configure as follows:

Command Trigger Word: spy

Request URL: <spy-bot url>/spies

Request Method: POST

Response User: spt-bot (change as you wish)

Fill other details as you prefer!

### Create incoming webhook using dedicated mattermost account for spy-bot

##### Create an incoming webhook and configure as follows:

Channel: any channel

Add the incoming webhook id in environment file(WEBHOOK_ID). SpyBot will use this incoming webhook to notify the user once the person comes online


## Usage
1. Mention the mattermost server host(MATTERMOST_HOST) and port(MATTERMOST_PORT) in the environment file
2. Create a mattermost user for spy-bot and add that account credentials(SPY_ID, SPY_PASSWORD) in the environment file
3. Create 1 slash command and 1 incoming webhook as mentioned above. And assign incoming webhook id to WEBHOOK_ID env variable
4. Mention the polling interval time(POLL_INTERVAL_SECS). If it is not set, default polling interval is 1 minute. This indicates the frequency to check the user status.
5. Install npm dependencies: **npm install**
6. Start the app: **npm start**
7. To spy on your team mate: Type "/spy @\<name>" or "/spy \<name>" in the any channel. Once the victim comes online, Spybot will post the response in the direct channel to you  



## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fprabhu43%2Fmattermost-spybot.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fprabhu43%2Fmattermost-spybot?ref=badge_large)