


const { createAddress, sign } = require("../dist/wallet/btc/index");
const { mnemonicToSeed } = require("../dist/wallet/bip/bip");

const mnemonic = "chief unit purity initial lock stamp buzz nerve wisdom flush venture fun";
const params_1 = {
    mnemonic: mnemonic,
    password: ""
}
const seed = mnemonicToSeed(params_1)
const account = createAddress(seed.toString("hex"), "testnet")
console.log(account)
const data = {
    inputs: [
        {
            address: "1H1oAqmdfTNECrrHFAJ4AhbTUyPcQjrf72",
            txid: "209706b97a9aed047df158bf57cfbdad94a5e9bd9ac5261034448ec4590bab8f",
            amount: 100000000,
            vout: 0,
        },
    ],
    outputs: [
        {
            amount: 100000000,
            address: "1H1oAqmdfTNECrrHFAJ4AhbTUyPcQjrf72",
        },
    ],
};
const rawHex = sign("2ca7c5e229cef6da216e75bec60e593d27c52ad68b05f80d300c2177b2d35953", data, "mainnet");
console.log(rawHex);