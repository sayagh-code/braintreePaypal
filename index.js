const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors")
const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: 'v9r2dmrt68yt3drz',
    publicKey: 'rj4tffw3pvg8hdr4',
    privateKey: '3479feb55f0e719311e81a3a4b1c1fd6'
});

app.use(cors());
var jsonParser = bodyParser.json()
app.use(bodyParser.urlencoded({
  extended:true
}));

//  Braintree Paypal Payment
app.get("/brainTreeClientToken", (req, res) => {
  gateway.clientToken.generate({}).then((response) => {
    console.log('Token', response);
    res.send(response);
  });
});

app.post("/checkoutWithPayment", jsonParser, (req, res) => {
    console.log(req.body)
    const nonceFromTheClient = req.body.nonceFromTheClient;
    const payment = req.body.paymentAmount;
    gateway.transaction.sale({
      amount: payment,
      paymentMethodNonce: nonceFromTheClient,
      options: {
        submitForSettlement: true
      }
    }).then((result) => {
        console.log(result);
        res.send(result);    
     });
  });
  app.listen(route, () => {
      console.log("Server Started at", process.env.PORT || 3000);
  });