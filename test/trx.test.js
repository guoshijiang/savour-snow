const { createAddress, sign } = require("../dist/wallet/trx/index");
const { mnemonicToSeed } = require("../dist/wallet/bip/bip");

const mnemonic = "chief unit purity initial lock stamp buzz nerve wisdom flush venture fun";
const params_1 = {
    mnemonic: mnemonic,
    password: ""
}
const seed = mnemonicToSeed(params_1)
const account = createAddress(seed.toString("hex"))
console.log(account)