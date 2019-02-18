@echo off

call npm install
SETLOCAL
SET PATH=node_modules\.bin;node_modules\hubot\node_modules\.bin;%PATH%

REM Remove interactivity of these two lines for deployment
SET /P BOT_NAME=Bot Name:
SET /P HUBOT_SLACK_TOKEN=Slack Bot Token:

node_modules\.bin\hubot.cmd --name "%BOT_NAME%" %* 
