const ethers = require("ethers");
/**
 * Get address from seed
 * @param seedHex 
 * @returns 
 */
export function createAddress(seedHex: string) {
    const hdNode = ethers.utils.HDNode.fromSeed(Buffer.from(seedHex, "hex"));
    const {
        privateKey,
        publicKey,
        address
    } = hdNode.derivePath("m/44'/60'/0'/0/0");
    return JSON.stringify({
        privateKey,
        publicKey,
        address,
    })
}

/**
 * sign transaction 
 * @param privateKeyHex 
 * @param tx 
 * @returns 
 */
export async function sign(privateKeyHex: string, tx: object): Promise<string> {
    // remove 0x
    const wallet = new ethers.Wallet(Buffer.from(privateKeyHex, "hex"));
    return await wallet.signTransaction(tx);
}