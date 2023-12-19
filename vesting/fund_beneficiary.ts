import {
    Blockfrost,
    C,
    Data,
    Lucid,
    SpendingValidator,
    TxHash,
    fromHex,
    toHex,
  } from "https://deno.land/x/lucid@0.8.3/mod.ts";
  import * as cbor from "https://deno.land/x/cbor@v1.4.1/index.js";
   
const lucid = await Lucid.new(
    new Blockfrost(
      "https://cardano-preview.blockfrost.io/api/v0",
      Deno.env.get("BLOCKFROST_API_KEY"),
    ),
    "Preview",
  );
   
lucid.selectWalletFromPrivateKey(await Deno.readTextFile("./owner.sk"));

const recieverAddress = await Deno.readTextFile("./beneficiary.addr");

const tx = await lucid.newTx()
    .payToAddress(recieverAddress, {lovelace: 100000000n})
    .complete();

const signedTx = await tx.sign().complete();

const txHash = await signedTx.submit();

console.log(`Transaction hash: ${txHash}`);

