var bitcore = require("bitcore-lib");

var privateKeys = [];
var publicKeys = [];

for (var i = 0; i < 3; i++) {
  privateKeys[i] = new bitcore.PrivateKey;
  publicKeys[i] = bitcore.PublicKey(privateKeys[i]);
  console.log("Private " + i + ": " + privateKeys[i].toWIF());
  console.log("Public " + i + ": " + publicKeys[i]);
}

var address = new bitcore.Address(publicKeys, 2, bitcore.Networks.testnet);

console.log(address);
