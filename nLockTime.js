var bitcore = require("bitcore-lib");

var privateKeyWIF = 'cQN511BWtc2dSUMWySmZpr6ShY1un4WK42JegGwkSFX5a8n9GWr3';

var privateKey = bitcore.PrivateKey.fromWIF(privateKeyWIF);

var sourceAddress = privateKey.toAddress(bitcore.Networks.testnet);

console.log(sourceAddress)

var targetAddress = "2NCv16HwcaTy2NV3XRSSfUEqmubhYesZfPm";

var Insight = require("bitcore-explorers").Insight;
var insight = new Insight("testnet");

insight.getUnspentUtxos(sourceAddress, function(error, utxos) {
  if (error) {
    console.log(error)
  } else {
    var tx = bitcore.Transaction();
    tx.from(utxos);
    tx.to(targetAddress, 78792);
    tx.change(sourceAddress);
//    tx.lockUntilDate(new Date(2016, 04, 02));
    tx.lockUntilBlockHeight(1114400);
    tx.sign(privateKey);
    tx.serialize();

    insight.broadcast(tx, function(error, transactionId) {
      if (error) {
        console.log(error)
      } else {
        console.log(transactionId);
      }
    });
  }
});
