const RippleAPI = require('ripple-lib').RippleAPI;

const api = new RippleAPI({
  server: 'wss://s1.ripple.com' // Public rippled server hosted by Ripple, Inc.
});
api.on('error', (errorCode, errorMessage) => {
  console.log(errorCode + ': ' + errorMessage);
});
api.on('connected', () => {
  console.log('connected');
});
api.on('disconnected', (code) => {
    // code - [close code](https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent) sent by the server
    // will be 1000 if this was normal closure
    console.log('disconnected, code:', code);
  });

api.connect().then(() => {
  // 'transaction' can be replaced with the relevant `type` from the table above
  api.connection.on('validationReceived', (event) => {
      // Do something useful with `event`
      console.log(JSON.stringify(event, null, 2))
  })

  api.request('subscribe', {
      streams: [ "validations" ]
  }).then(response => {
      console.log('Successfully subscribed')
  }).catch(error => {
      // Handle `error`
  })
})
