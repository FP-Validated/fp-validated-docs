import { aptos } from "./client";

const address = process.argv[2] ?? "0x1";
const account = await aptos.getAccountInfo({ accountAddress: address });
const resources = await aptos.getAccountResources({ accountAddress: address });
console.log(JSON.stringify({ account, resourceCount: resources.length }, null, 2));
