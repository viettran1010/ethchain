const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3"); //constructor
const { interface, bytecode } = require("../compile");

const provider = ganache.provider(); // ganache provider is an access to the local eth network
const web3 = new Web3(provider);

let accounts;
let inbox;
beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  // use one account to deploy contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ["Hi there"],
    })
    .send({ from: accounts[0], gas: "1000000" }); // send transaction to create a contract

  inbox.setProvider(provider);
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    assert.ok(inbox.options.address);
  });
});
