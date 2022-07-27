import { EOS_TRANS_ABI } from './transaction.abi';
import { EOS_TOKEN_ABI } from './eosio.token.abi';
const ecc = require("tiny-secp256k1");
const { BIP32Factory } = require("bip32");
const bip32 = BIP32Factory(ecc);
const eccEos = require("eosjs-ecc");
const crypto = require('crypto');
const { TextDecoder, TextEncoder } = require("text-encoding");
const { Serialize: {
    createInitialTypes,
    getTypesFromAbi,
    serializeActionData,
    getType,
    SerialBuffer,
    arrayToHex
}, JsSignatureProvider } = require("eosjs");

/**
 * Get address from seed
 * @param seedHex 
 * @returns 
 */
export function createAddress(seedHex: string): string {
    const node = bip32.fromSeed(Buffer.from(seedHex, "hex"));
    const child = node.derivePath(`m/44'/194'/0'/0/0`);
    const privateKey = child.privateKey.toString('hex');
    const publickKey = child.publicKey.toString('hex');
    return JSON.stringify({
        privateKey: eccEos.PrivateKey.fromHex(privateKey).toString(),
        publickKey: eccEos.PublicKey.fromHex(publickKey).toString()
    });
}

/**
 * Eos Sign
 * @param signObj 
 * @param privateKeyHex 
 * @returns 
 */
export async function sign(privateKeyHex: string, signObj: any,) {
    const TRANSFER_ACTION_ACOUNT = "eosio.token";
    const TRANSFER_ACTION_NAME = "transfer";
    const TRANSFER_ROLE = "acitve";
    const TRANSFER_UNIT = "eos";
    // private key hex to wif
    const wifKey = eccEos.PrivateKey.fromHex(
        privateKeyHex
    ).toWif();
    const pubKeys = [wifKey.toPublic().toString()];
    //序列化交易对象
    const serdata = {
        max_net_usage_words: 0,
        max_cpu_usage_ms: 0,
        delay_sec: 0,
        context_free_actions: [],
        actions: [
            {
                account: TRANSFER_ACTION_ACOUNT,
                name: TRANSFER_ACTION_NAME,
                authorization: [{ actor: signObj.from, permission: TRANSFER_ROLE }],
                data: dataToAbiBinargs({
                    from: signObj.from,
                    to: signObj.to,
                    quantity: `${signObj.quantity} ${TRANSFER_UNIT}`,
                    memo: signObj.memo
                }),
            },
        ],
        transaction_extensions: [],
        expiration: signObj.expiration,
        ref_block_num: signObj.block & 0xffff,
        ref_block_prefix: signObj.prefix,
    };
    let buffer = new SerialBuffer({
        textEncoder: TextEncoder,
        textDecoder: TextDecoder,
    });
    const transactionTypes = getTypesFromAbi(
        createInitialTypes(),
        EOS_TRANS_ABI
    );
    transactionTypes.get("transaction").serialize(buffer, serdata);
    // 构造签名
    const signatureProvider = new JsSignatureProvider([wifKey]);
    // 签名
    const signature = await signatureProvider.sign({
        chainId: signObj.chainId,
        requiredKeys: pubKeys,
        serializedTransaction: buffer.asUint8Array(),
    });
    // 序列化签名交易hash
    const txid = crypto.createHash("sha256").update(buffer.asUint8Array()).digest("hex");
    // 返回交易报文
    const rawTx = {
        signatures: signature,
        compression: 0,
        packed_context_free_data: "",
        packed_trx: arrayToHex(buffer.asUint8Array()),
        txid: txid
    };
    return JSON.stringify(rawTx);
}

/**
 * 对签名data进行abi编码
 * @param data 
 * @returns 
 */
function dataToAbiBinargs(data) {
    const eosioContract = getContract(EOS_TOKEN_ABI);
    return serializeActionData(eosioContract, "eosio.token", "transfer", data)
}
/**
 * 获取eos.token合约
 * @param abi 
 * @returns 
 */
function getContract(abi) {
    const types = getTypesFromAbi(createInitialTypes(), abi);
    const actions = new Map();
    for (const { name, type } of abi.actions) {
        actions.set(name, getType(types, type));
    }
    return { types, actions };
}
