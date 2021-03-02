// Twilio Credentials
// To set up environmental variables, see http://twil.io/secure
const accountSid = 'AC06ae683a8a139539014f35b129f1c9dd'; 
const authToken = '1d28c1211eecfe4d26e8ae60448ac5d5';

// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    /*to: '+15558675310',
    from: '+15017122661',*/

   to: 'my personal phone number would be here'
    from: '+13072276199',
    body: 'Your reservation for [date] at [hour] was confirmed',
  })
  .then(message => console.log(message.sid));

