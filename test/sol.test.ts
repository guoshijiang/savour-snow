import {
    generateMnemonic,
    mnemonicToSeed
} from "../wallet/bip/bip";
import {
    createAddress,
    signTransaction
} from "../wallet/sol";

/*
9HttLy5NXkH1fnLr3aJywNRVVXS29qKuP5BQRui6VKTY
83d66bbcb698e745e906c6366cf80e087a21070915d669498129c979de4655a37b3174875cac82d2a530bee0aa38f8587634bfb7d1899416195da8dc0dcbc2db
 */
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

    test('signTransaction',  async () => {
        const params =  {
            amount: "1",
            to: "9HttLy5NXkH1fnLr3aJywNRVVXS29qKuP5BQRui6VKTY",
            nonce: "EzktKfV35J6ogsfwQhDftTZxxTDLnJ5vctgFnWhvisup",
            decimal: 9,
            privateKey: "147908be03cee4057ba306da2ea1c3afd26a79f6da5390ab41ebddcda350c7a2bf8047b999003ac1a26acc858d5ee4da64621099a558919e4e330c01ca291da7"
        }
        let tx_msg = await signTransaction(params)
        console.log("tx_msg===", tx_msg)
    });
});