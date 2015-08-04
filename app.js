var colors = require('colors'),
    twitter = require('twitter'),
    print = require('pretty-print'),
    tweet_helpers = require('./helpers/tweets'),
    keywords = require('./configs/keywords'),
    args = require('args');

var options = args.Options.parse([
  {
    name: 'percent',
    shortName: 'p',
    type: 'int',
    help: 'Percentage of tweets you want to retweet & follow. Lower number will keep your app from going over the API limits.'
  }
]);

var parsed_options = args.parser(process.argv).parse(options);

if (!parsed_options.percent) {
  console.log(options.getHelp());
  process.exit();
}

if (parsed_options.percent > 100) {
  parsed_options.percent = 100;
}

if (parsed_options.percent < 1) {
  parsed_options.percent = 1;
}

console.log('Processing %s% of tweets.'.yellow, parsed_options.percent);
console.log('Connecting to Twitter stream'.green);

var client = new twitter(require('./configs/twitter_credentials'));

client.stream('statuses/filter', {track: keywords}, function(stream) {

  console.log('Successfully connected'.green);

  stream.on('data', function(tweet) {
    if (tweet.retweeted_status) {
      tweet = tweet.retweeted_status;
    }

    if (!tweet_helpers.is_a_reply(tweet) && !tweet_helpers.is_a_retweet(tweet)) {

      var num = Math.floor(Math.random() * 100) + 1;

      if (num <= parsed_options.percent) {
        if (!tweet.user.following) {
          client.post('friendships/create', {user_id: tweet.user.id}, function(err, user, response) {
            if (err) {
              console.log(err);
            } else {
              console.log('Successfully followed %s'.green, tweet.user.screen_name);
            }
          });

          client.post('statuses/retweet/' + tweet.id_str, function(err) {
            if (err) {
              console.log(err);
            } else {
              console.log("Successfully retweeted a tweet".green);
              console.log(tweet.text.green);
            }
          })
        }
      } else {
        console.log('Skipping'.red);
      }

    }
  });

  stream.on('error', function(error) {
    console.log(error);
  })
})
