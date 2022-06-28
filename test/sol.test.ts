import {
    generateMnemonic,
    mnemonicToSeed
} from "../wallet/bip/bip";
import {
    createAddress
} from "../wallet/sol/index";


describe('solana unit test case', () => {
    test('createAddress',  () => {
        const params = {
            number: 12,
            language: "english"
        }
        const mnemonic = generateMnemonic(params);
        const params_1 = {
            mnemonic: mnemonic,
            password: ""
        }
        const seed = mnemonicToSeed(params_1)
        const account = createAddress(seed.toString("hex"))
        console.log(account)
    });
});