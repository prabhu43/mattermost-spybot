# mattermost-spy-bot

SpyBot notifies you when a specific user comes online after you have told the bot to spy on the user

### Set environment variables
1. Create .env file using the template of file 'sample-env'
2. Fill all the environment variables mentioned in the file

### Create Outgoing Webhook

##### Create an outgoing webhook and configure as follows:

Content Type: application/json

Channel: Channel to be used for spy. Mention the id of this channel in environment file

Trigger Words (One Per Line): #spy

Trigger When: First word matches a trigger word exactly

Callback URLs (One Per Line): <spy-bot url>/spies


### Create Incoming Webhook

##### Create an incoming webhook and configure as follows:

Channel: Channel to be used for spy. Same as the one used while creating outgoing webhook

Add the incoming webhook id in environment file(WEBHOOK_ID). SpyBot will use this incoming webhook to notify the user once the person comes online


## Usage
1. Mention the mattermost server host(MATTERMOST_HOST) and port(MATTERMOST_PORT) in the environment file
2. Create a mattermost user for spy-bot and add that account credentials(SPY_ID, SPY_PASSWORD) in the environment file
3. Create a mattermost channel to be used for spy and add that channel-id(SPY_CHANNEL_ID) in the environment file. Spy-bot will post its response in this channel.
4. Create 1 outgoing and 1 incoming webhook as mentioned above. And assign incoming webhook id to WEBHOOK_ID env variable
5. Mention the polling interval time(POLL_INTERVAL_SECS). If it is not set, default polling interval is 1 minute. This indicates the frequency to check the user status.
6. Install npm dependencies: **npm install**
7. Start the app: **npm start**
7. To spy on your team mate: Type "#spy @\<name>" or "#spy \<name>" in the spy channel

