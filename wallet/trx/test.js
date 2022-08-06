const { importTrxAddress } = require("../../dist/wallet/trx/index");

const addr = importTrxAddress({
    privateKey: "aa5032fb3ddde7e8906055ac475901cc3a264ed872fbf34472ea897ee822e334"
})

console.log(addr);