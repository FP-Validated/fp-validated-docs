import { aptos } from "./client";

const functionId = process.argv[2] ?? "0x1::coin::name";
const typeArg = process.argv[3] ?? "0x1::aptos_coin::AptosCoin";
const result = await aptos.view({
  payload: { function: functionId as `${string}::${string}::${string}`, typeArguments: [typeArg], functionArguments: [] },
});
console.log(JSON.stringify(result, null, 2));
