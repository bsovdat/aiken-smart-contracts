import {
    Lucid,
  } from "https://deno.land/x/lucid@0.8.3/mod.ts";

  const lucid = await Lucid.new(
    undefined,
    "Preview"
  );

  const privateKeyOwner = lucid.utils.generatePrivateKey();
  const privateKeyBeneficiary = lucid.utils.generatePrivateKey();

  await Deno.writeTextFile("owner.sk", privateKeyOwner);
  await Deno.writeTextFile("beneficiary.sk", privateKeyBeneficiary);

  const addressOwner = await lucid
  .selectWalletFromPrivateKey(privateKeyOwner)
  .wallet.address();

  const addressBeneficiary = await lucid
  .selectWalletFromPrivateKey(privateKeyBeneficiary)
  .wallet.address();

  await Deno.writeTextFile("owner.addr", addressOwner);
  await Deno.writeTextFile("beneficiary.addr", addressBeneficiary);
