import { Account, Ed25519PrivateKey } from "@aptos-labs/ts-sdk";
import { aptos } from "./client";

const privateKeyHex = process.env.APTOS_PRIVATE_KEY;
const recipient = process.env.APTOS_RECIPIENT;
if (!privateKeyHex || !recipient) throw new Error("Set APTOS_PRIVATE_KEY and APTOS_RECIPIENT");

const sender = Account.fromPrivateKey({ privateKey: new Ed25519PrivateKey(privateKeyHex) });
const transaction = await aptos.transaction.build.simple({
  sender: sender.accountAddress,
  data: {
    function: "0x1::aptos_account::transfer",
    functionArguments: [recipient, 1_000],
  },
});
const committed = await aptos.signAndSubmitTransaction({ signer: sender, transaction });
const executed = await aptos.waitForTransaction({ transactionHash: committed.hash });
console.log(JSON.stringify(executed, null, 2));
