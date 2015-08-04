function is_a_reply(tweet) {
  var fields = [
    'in_reply_to_status_id',
    'in_reply_to_user_id',
    'in_reply_to_screen_name'
  ];

  fields.forEach(function(field) {
    if (tweet[field] != null) {
      return true;
    }
  });

  return false;
}

function is_a_retweet(tweet) {
  if (tweet.text.substr(0,2) == 'RT') {
    return true;
  }

  if (tweet.quoted_status_id) {
    return true;
  }

  return false;
}

module.exports = {
  is_a_reply: is_a_reply,
  is_a_retweet: is_a_retweet
};
