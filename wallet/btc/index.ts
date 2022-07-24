const ecc = require("tiny-secp256k1");
const { BIP32Factory } = require("bip32");
const bip32 = BIP32Factory(ecc);
const bitcoin = require("bitcoinjs-lib");
const bitcore = require("bitcore-lib");
// bitcoin.initEccLib(ecc); // NEED THIS FOR TAPROOT

export function createAddress(seedHex: string, network: string): string {
    const root = bip32.fromSeed(Buffer.from(seedHex, "hex"));
    const path = "m/44'/1'/0'/0/0";
    const child = root.derivePath(path);
    const { address } = bitcoin.payments.p2pkh({
        pubkey: child.publicKey,
        network: bitcoin.networks[network],
    });
    return JSON.stringify({
        privateKey: Buffer.from(child.privateKey).toString("hex"),
        publicKey: Buffer.from(child.publicKey).toString("hex"),
        address,
    })
}

/**
 * 暂不支持taproot签名
 * @param privateKey 
 * @param signObj 
 * @param network 
 * @returns 
 */
export function sign(privateKey: string, signObj: any, network: string): string {
    const net = bitcore.Networks[network];
    const inputs = signObj.inputs.map(input => {
        return {
            address: input.address,
            txId: input.txid,
            outputIndex: input.vout,
            script: new bitcore.Script.fromAddress(input.address).toHex(),
            satoshis: input.amount
        }
    });
    const outputs = signObj.outputs.map(output => {
        return {
            address: output.address,
            satoshis: output.amount
        };
    });
    const transaction = new bitcore.Transaction(net).from(inputs).to(outputs);
    transaction.version = 2;
    transaction.sign(privateKey);
    return transaction.toString();
}

