const bs58 = require("bs58")
const { derivePath, getPublicKey } = require('ed25519-hd-key')


export function createAddress(seedHex) {
    const { key } = derivePath("m/44'/501'/1'/0'", seedHex);
    const publicKey = getPublicKey(new Uint8Array(key), false).toString("hex")
    const buffer = Buffer.from(getPublicKey(new Uint8Array(key), false).toString("hex"), "hex");
    const address = bs58.encode(buffer)
    const hdWallet = {
        "privateKey": key.toString("hex") + publicKey,
        "publicKey": publicKey,
        "address": address,
    }
    return JSON.stringify(hdWallet)
}


export function sign() {

}