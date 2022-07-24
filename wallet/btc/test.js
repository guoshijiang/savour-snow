const bip39 = require("bip39");
const ecc = require("tiny-secp256k1");
const {BIP32Factory} = require("bip32");
const bip32 = BIP32Factory(ecc);
const bitcoin = require("bitcoinjs-lib");
(async function () {
    const mnemonic = "chief unit purity initial lock stamp buzz nerve wisdom flush venture fun";
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const root = bip32.fromSeed(seed);
    const path = "m/44'/1'/0'/0/0";
    const child = root.derivePath(path);
    console.log(child.privateKey);
    console.log(child.publicKey);
    const { address } = bitcoin.payments.p2pkh({
        pubkey: child.publicKey,
        network: bitcoin.networks.testnet,
    });
    console.log(address);
})();


// (async function () {
//     const wallet = new ethers.Wallet(Buffer.from("9615abb43a2995bb9716c65e3386681981e71cd19b8e73ebe82779b633e16e5b", "hex"));

//     const a = await wallet.signTransaction({});

//     console.log(a);

//     console.log(wallet.checkTransaction({}));
 
// })();
 