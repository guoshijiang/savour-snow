// const ethers = require("ethers");
const bip39 = require('bip39');
const ecc = require("tiny-secp256k1");
const { BIP32Factory } = require("bip32");
const bip32 = BIP32Factory(ecc);
const TronWeb = require("tronweb");
const CryptoUtils = require("@tronscan/client/src/utils/crypto");
const TransactionUtils = require("@tronscan/client/src/utils/transactionBuilder");
// (async function () {
//     const mnemonic = "chief unit purity initial lock stamp buzz nerve wisdom flush venture fun";
//     const seed = bip39.mnemonicToSeedSync(mnemonic);
//     const node = bip32.fromSeed(seed);
//     const child = node.derivePath(`m/44'/195'/0'/0/0`);
//     const privateKey = child.privateKey.toString('hex');
//     const publickKey = child.publicKey.toString('hex');
//     const address = tronWeb.address.fromPrivateKey(privateKey);
//     return JSON.stringify({
//         privateKey,
//         publickKey,
//         address
//     });
// })();


(async function () {
    const privateKey = "3cf45e70d5916df849d8dc7a4a627917b709aaddde379816b7cc23cba60e9eaf";
    const token = "TRX";
    const fromAddress = CryptoUtils.pkToAddress(privateKey);
    const toAddress = "TVHHhQaWVhjk11SVK4jrRRnzpcSWXkpbhZ";
    const amount = 3;
    let transaction = TransactionUtils.buildTransferTransaction(token, fromAddress, toAddress, amount);
    let signedTransaction = CryptoUtils.signTransaction(privateKey, transaction);
    console.log(signedTransaction);
})();
