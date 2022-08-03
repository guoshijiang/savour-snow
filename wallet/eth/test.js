
const { signEthTransaction, verifyEthAddress, importEthAddress } = require("../../dist/wallet/eth/index");
const ethers = require("ethers");
const { privateToAddress } = require("ethereumjs-util");
async function testSign() {
    const params = {
        "privateKey": "9615abb43a2995bb9716c65e3386681981e71cd19b8e73ebe82779b633e16e5b",
        "nonce": 0,
        "from": "0x6a5527BD42cf4b73c789B051c9bf5D244e3Cf9Ef",
        "to": "0x36FCde42B307915a94542132AbE5b273bFfF4376",
        "gasLimit": 21000,
        "amount": "0.1",
        "gasPrice": 750000000000,
        "decimal": 18,
        "chainId": 3,
        "tokenAddress": "0x00"
    }
    const rawHex = await signEthTransaction(params);
    console.log(rawHex);
}
testSign();

console.log(verifyEthAddress({
    address: "sdasd"
}));

console.log("privkey to address:", privateToAddress("0x9615abb43a2995bb9716c65e3386681981e71cd19b8e73ebe82779b633e16e5b").toString("hex"))


console.log("addr:",importEthAddress({ privateKey: "0x9615abb43a2995bb9716c65e3386681981e71cd19b8e73ebe82779b633e16e5b" }))