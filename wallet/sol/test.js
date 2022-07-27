const wallet = require("../../dist/wallet/sol")

async function testSign() {
    const params = {
        amount: "1",
        to: "9HttLy5NXkH1fnLr3aJywNRVVXS29qKuP5BQRui6VKTY",
        nonce: "EzktKfV35J6ogsfwQhDftTZxxTDLnJ5vctgFnWhvisup",
        decimal: 9,
        privateKey: "147908be03cee4057ba306da2ea1c3afd26a79f6da5390ab41ebddcda350c7a2bf8047b999003ac1a26acc858d5ee4da64621099a558919e4e330c01ca291da7"
    }
    let tx_msg = await wallet.signTransaction(params)
    console.log("tx_msg===", tx_msg)
}

testSign()


