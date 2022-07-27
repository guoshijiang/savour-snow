import {
    // generateMnemonic,
    mnemonicToSeed
} from "../wallet/bip/bip";
import {
    createAddress,
    signTransaction
} from "../wallet/eth/index";


describe('eth unit test case', () => {
    test('createAddress', () => {
        const mnemonic = "chief unit purity initial lock stamp buzz nerve wisdom flush venture fun";
        const params_1 = {
            mnemonic: mnemonic,
            password: ""
        }
        const seed = mnemonicToSeed(params_1)
        console.log(seed);
        const account = createAddress(seed.toString("hex"))
        console.log(account)
    });

    test('sign', async () => {
        const mnemonic = "chief unit purity initial lock stamp buzz nerve wisdom flush venture fun";
        const params_1 = {
            mnemonic: mnemonic,
            password: ""
        }
        const seed = mnemonicToSeed(params_1)
        const account = createAddress(seed.toString("hex"))
        const rawHex = await signTransaction({
            "privateKey": JSON.parse(account).privateKey.replace("0x", ""),
            "nonce": 0,
            "from": "0x6a5527BD42cf4b73c789B051c9bf5D244e3Cf9Ef",
            "to": "0x36FCde42B307915a94542132AbE5b273bFfF4376",
            "gasLimit": 21000,
            "amount": "0.1",
            "gasPrice": 750000000000,
            "decimal": 18,
            "chainId": 3,
            "tokenAddress": "0x00"
        })
        console.log(rawHex)
    });
});