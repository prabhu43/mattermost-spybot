# mattermost-spy-bot

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

### Create Incoming Webhook

##### Create an incoming webhook and configure as follows:

Channel: Channel to be used by spy-bot to notify when user comes online.

Add the incoming webhook id in environment file(WEBHOOK_ID). SpyBot will use this incoming webhook to notify the user once the person comes online


## Usage
1. Mention the mattermost server host(MATTERMOST_HOST) and port(MATTERMOST_PORT) in the environment file
2. Create a mattermost user for spy-bot and add that account credentials(SPY_ID, SPY_PASSWORD) in the environment file
3. Create a mattermost channel to be used for spy and add that channel-id(SPY_CHANNEL_ID) in the environment file. Spy-bot will post its response in this channel.
4. Create 1 slash command and 1 incoming webhook as mentioned above. And assign incoming webhook id to WEBHOOK_ID env variable
5. Mention the polling interval time(POLL_INTERVAL_SECS). If it is not set, default polling interval is 1 minute. This indicates the frequency to check the user status.
6. Install npm dependencies: **npm install**
7. Start the app: **npm start**
7. To spy on your team mate: Type "/spy @\<name>" or "/spy \<name>" in the spy channel

