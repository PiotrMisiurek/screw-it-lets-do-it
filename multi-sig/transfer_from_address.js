var bitcore = require("bitcore-lib");

var privateKeys = [
  bitcore.PrivateKey.fromWIF("Kyu2q39avSmjuJbFp9mfh5mh8ZPYpyDxfZvRLSrcosdBiX6xWbG1"),
  bitcore.PrivateKey.fromWIF("KwJ5KYx4fDCNEHG4jmmoQUveGkSxEJ4CqeEpTTDNgP5hmQLt41Ex")
];

var publicKeys = [
  "02284cc8b2717d564d79cae638679ca1afd4a0f84fdc3ddb5fa1fe4698423d836b",
  "03a98271626ff1bdff6dd18393b565e8675124ab43eab24efb6af352a06b56f91a",
  "02d9e82923328f3dc434b8ff796c720321ce4e4874f248a2a8c38c1878717ca9f8"
];

var sourceAddress = "2NCv16HwcaTy2NV3XRSSfUEqmubhYesZfPm";

var targetAddress = (new bitcore.PrivateKey).toAddress(bitcore.Networks.testnet);

console.log("targetAddress: " + targetAddress);

var Insight = require("bitcore-explorers").Insight;
var insight = new Insight("testnet");

insight.getUnspentUtxos(sourceAddress, function(error, utxos){
  if (error) {
    console.log(error);
  } else {
    var tx = new bitcore.Transaction();
    tx.from(utxos, publicKeys, 2);
    tx.to(targetAddress, 48792);
    tx.change(sourceAddress);

    var firstSignatures = tx.getSignatures(privateKeys[0]);


    var tx = new bitcore.Transaction();
    tx.from(utxos, publicKeys, 2);
    tx.to(targetAddress, 48792);
    tx.change(sourceAddress);


    var secondSignatures = tx.getSignatures(privateKeys[1]);

    var tx = new bitcore.Transaction();
    tx.from(utxos, publicKeys, 2);
    tx.to(targetAddress, 48792);
    tx.change(sourceAddress);


    tx.applySignature(firstSignatures[0]);
    tx.applySignature(firstSignatures[1]);
    tx.applySignature(secondSignatures[0]);
    tx.applySignature(secondSignatures[1]);

    insight.broadcast(tx.serialize(), function(error, transactionId) {
      if (error) {
        console.log(error);
      } else {
        console.log(transactionId);
      }
    });


  }
});
