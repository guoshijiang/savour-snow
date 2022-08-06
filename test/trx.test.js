const { createTrxAddress, signTrxTransaction ,verifyTrxAddress,importTrxAddress} = require("../dist/wallet/trx/index");
const { mnemonicToSeed } = require("../dist/wallet/bip/bip");

(async function () {

    const mnemonic = "chief unit purity initial lock stamp buzz nerve wisdom flush venture fun";
    const params_1 = {
        mnemonic: mnemonic,
        password: ""
    }
    const seed = mnemonicToSeed(params_1)
    const account = createTrxAddress(seed.toString("hex"),"1")
    console.log(account)

    console.log(JSON.parse(account).privateKey);
    const data = {
        "privateKey": JSON.parse(account).privateKey,
        "from": "TKTcQznYKjAy4cZVyFwmAr2SLpUibdpB8q",
        "to": "TQdXLerrxuzwgcvVGewiaaG69CK5N2Fw9n",
        "amount": "1000",
        "energyPrice": 280,
        "energyLimit": 21000,
        "tokenAddress": "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
        "refBlock": {
            "blockHash": "0000000002712ce015f7533a23ce9e0417ab47dac91628f1dcc9ee415b79658c",
            "blockNumHex": "2712ce0"
        }
    }
    const rawHex = await signTrxTransaction(data);
    console.log(rawHex);

    console.log(verifyTrxAddress({
        address: "TKTcQznYKjAy4cZVyFwmAr2SLpUibdpB8q",
    }));

    console.log(importTrxAddress({
        "privateKey": JSON.parse(account).privateKey,
    }));
})();