#WTF Is This?
I recently read a fun little article by [Hunter Scott](http://www.hscott.net/twitter-contest-winning-as-a-service/) about winning contests on Twitter.

Being a fan of Node, I decided to throw together a little app to do the same thing.

It could be smarter. It could be smoother. But it works.

It will connect to Twitter's streaming API and enter into contests by retweeting/following other Twitter users.

Who knows, maybe you'll win something cool?

#Installation
Run `npm install` to install the required modules.

Rename `configs/twitter_credentials.js.sample` to `configs/twitter_credentials.js` and add your Twitter app settings to the file.

#Usage

Run `node app.js --percent 10`

`--percent` (or `-p`) is a setting that allows you to randomly enter X% of contests.

Since Twitter has API limits, this helps keep you from hitting them too quickly.

#Modifying Keywords
By default the script tracks the following phrases.

`rt to win`
`retweet to win`
`share to win`
`rt win`
`retweet win`

If you'd like to change the phrases it tracks in the stream, you can modify `configs/keywords.js`.

It's a simple array of strings that gets joined for Twitter's purposes.

For more information on the types of phrases you can track, [see this page](https://dev.twitter.com/streaming/overview/request-parameters#track).

#Improvements

* Track which tweets have already been retweeted
* Smarter base tweet finding (There are cases where twitter doesn't specify if something is a retweet/reply/etc and you won't be retweeting the original tweet)
* Allow for multiple accounts to be running at the same time
* Implement OAuth to allow for easy multiple accounts
