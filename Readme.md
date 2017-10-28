# mattermost-spy-bot

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




## Usage
1. Mention the mattermost server host(MATTERMOST_HOST) and port(MATTERMOST_PORT) in the environment file
2. Create a mattermost user for spy-bot and add that account credentials(SPY_ID, SPY_PASSWORD) in the environment file
3. Create a mattermost channel to be used for spy and add that channel-id(SPY_CHANNEL_ID) in the environment file. Spy-bot will post its response in this channel.
4. Mention the polling interval time(POLL_INTERVAL_SECS). If it is not set, default polling interval is 1 minute. This indicates the frequency to check the user status.
5. Install npm dependencies: **npm install**
6. Start the app: **npm start**

