const ethers = require("ethers");
const bip39 = require('bip39');


// (async function () {
//     const mnemonic = "chief unit purity initial lock stamp buzz nerve wisdom flush venture fun";
//     const seed =  bip39.mnemonicToSeedSync(mnemonic);//.then(bytes => bytes.toString('hex')).then(console.log)
//     const hdNode = ethers.utils.HDNode.fromSeed(seed);
//     const hd = hdNode.derivePath("m/44'/60'/0'/0/0");
//     console.log(hd);
// })();


(async function () {
    const wallet = new ethers.Wallet(Buffer.from("9615abb43a2995bb9716c65e3386681981e71cd19b8e73ebe82779b633e16e5b", "hex"));

    const a = await wallet.signTransaction({});

    console.log(a);

    console.log(wallet.checkTransaction({}));



    // let transaction = {
    //     nonce: 0,
    //     gasLimit: 21000,
    //     gasPrice: 20000000000,
    //     to: "0x88a5C2d9919e46F883EB62F7b8Dd9d0CC45bc290",
    //     // ... or supports ENS names
    //     // to: "ricmoo.firefly.eth",
    //     value: 1,
    //     data: "0x",
    //     // This ensures the transaction cannot be replayed on different networks
    //     chainId: 3
    // }
    // let signPromise = wallet.sign(transaction)

    // signPromise.then((signedTransaction) => {

    //     console.log(signedTransaction);
    //     // "0xf86c808504a817c8008252089488a5c2d9919e46f883eb62f7b8dd9d0cc45bc2
    //     //    90880de0b6b3a76400008025a05e766fa4bbb395108dc250ec66c2f88355d240
    //     //    acdc47ab5dfaad46bcf63f2a34a05b2cb6290fd8ff801d07f6767df63c1c3da7
    //     //    a7b83b53cd6cea3d3075ef9597d5"

    //     // This can now be sent to the Ethereum network
    //     let provider = ethers.getDefaultProvider()
    //     provider.sendTransaction(signedTransaction).then((tx) => {

    //         console.log(tx);
    //         // {
    //         //    // These will match the above values (excluded properties are zero)
    //         //    "nonce", "gasLimit", "gasPrice", "to", "value", "data", "chainId"
    //         //
    //         //    // These will now be present
    //         //    "from", "hash", "r", "s", "v"
    //         //  }
    //         // Hash:
    //     });
    // })
})();

// const seed = mnemonicToSeed(params_1)

// const seed = ethers.utils.mnemonicToSeed("chief unit purity initial lock stamp buzz nerve wisdom flush venture fun")

// const hdNode = ethers.utils.HDNode.fromMnemonic("chief unit purity initial lock stamp buzz nerve wisdom flush venture fun");

