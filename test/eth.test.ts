import {
    // generateMnemonic,
    mnemonicToSeed
} from "../wallet/bip/bip";
import {
    createAddress,
    sign
} from "../wallet/eth/index";


describe('eth unit test case', () => {
    test('createAddress', () => {
        // const params = {
        //     number: 12,
        //     language: "english"
        // }
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

    test('sign', () => {
        const mnemonic = "chief unit purity initial lock stamp buzz nerve wisdom flush venture fun";
        const params_1 = {
            mnemonic: mnemonic,
            password: ""
        }
        const seed = mnemonicToSeed(params_1)
        console.log(seed);
        const account = sign("", {})
        console.log(account)
    });
});