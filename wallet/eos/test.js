// const ethers = require("ethers");
const bip39 = require('bip39');
const ecc = require("tiny-secp256k1");
const { BIP32Factory } = require("bip32");
const bip32 = BIP32Factory(ecc);
const eccEos = require("eosjs-ecc");
(async function () {
    const mnemonic = "chief unit purity initial lock stamp buzz nerve wisdom flush venture fun";
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const node = bip32.fromSeed(seed);
    const child = node.derivePath(`m/44'/194'/0'/0/0`);
    const privateKey = child.privateKey.toString('hex');
    const publickKey = child.publicKey.toString('hex');
    // const address = tronWeb.address.fromPrivateKey(privateKey);
    console.log(privateKey);
    console.log(publickKey);
    console.log('私钥：', eccEos.PrivateKey.fromHex(privateKey).toString());
    console.log('公钥：', eccEos.PublicKey.fromHex(publickKey).toString());
    return JSON.stringify({
        privateKey: eccEos.PrivateKey.fromHex(privateKey).toString(),
        publickKey: eccEos.PublicKey.fromHex(publickKey).toString()
    });
})();


(async function () {

})();
