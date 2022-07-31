const bs58 = require("bs58")
const { derivePath, getPublicKey } = require('ed25519-hd-key')
import {PublicKey, Keypair, Transaction, SystemProgram} from "@solana/web3.js";
const BigNumber = require("bignumber.js");


export function createSolAddress(seedHex:string, addressIndex:string) {
    const { key } = derivePath("m/44'/501'/1'/" +  addressIndex + "", seedHex);
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


export async function signSolTransaction(params) {
    const { amount, to, nonce, decimal, privateKey } = params;
    const fromAccount = Keypair.fromSecretKey(new Uint8Array(Buffer.from(privateKey, "hex")), {skipValidation: true});
    const calcAmount = new BigNumber(amount).times(new BigNumber(10).pow(decimal)).toString();
    if (calcAmount.indexOf(".") !== -1) throw new Error("decimal 无效");
    let tx = new Transaction();
    tx.recentBlockhash = nonce;
    tx.add(
        SystemProgram.transfer({
            fromPubkey: fromAccount.publicKey,
            toPubkey: new PublicKey(to),
            lamports: calcAmount,
        })
    );
    tx.sign(fromAccount);
    return tx.serialize().toString("base64");
}