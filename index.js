var bitcore = require("bitcore-lib");

var privateKeyWIF = 'cQN511BWtc2dSUMWySmZpr6ShY1un4WK42JegGwkSFX5a8n9GWr3';

var privateKey = bitcore.PrivateKey.fromWIF(privateKeyWIF);

var sourceAddress = privateKey.toAddress();

console.log("Source address: " + sourceAddress);

var targetAddress = (new bitcore.PrivateKey).toAddress();

console.log("Target address: " + targetAddress);

var Insight = require("bitcore-explorers").Insight;
var insight = new Insight("testnet");

insight.getUnspentUtxos(sourceAddress, function(error, utxos) {
  if (error) {
    console.log(error);
  } else {
    console.log(utxos);

    var tx = new bitcore.Transaction();

    tx.from(utxos);
    tx.to(targetAddress, 10000);
    tx.change(sourceAddress);
    tx.sign(privateKey);

    tx.serialize();

    insight.broadcast(tx, function(error, transactionId) {
      if (error) {
        console.loge(error);
      } else {
        console.log(transactionId);
      }
    });
  }
});
