##Usage

1. Mention the mattermost server host(MATTERMOST_HOST) and port(MATTERMOST_PORT) in the environment file
2. Create a mattermost user for spy-bot and add that account credentials(SPY_ID, SPY_PASSWORD) in the environment file
3. Create a mattermost channel to be used for spy and add that channel-id(SPY_CHANNEL_ID) in the environment file. Spy-bot will post its response in this channel.
4. Mention the polling interval time(POLL_INTERVAL_SECS). If it is not set, default polling interval is 1 minute. This indicates the frequency to check the user status.

### Set environment variables
1. Create .env file using the template of file 'sample-env'
2. Fill all the environment variables mentioned in the file

### Start spybot:

Using npm: npm start

<!-- ### Using Docker:  -->

<!-- docker build -t prabhu43/mattermost-spybot . -->
<!-- docker run -p 8080:8080 -d prabhu43/spybot -->

