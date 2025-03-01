require("dotenv").config();
const { ThirdwebSDK } = require("@thirdweb-dev/sdk");
const fs = require("fs");

async function loadAllowlist() {
  const sdk = new ThirdwebSDK("optimism", {
    secretKey: process.env.THIRDWEB_SECRET_KEY
  });

  const contract = await sdk.getContract(process.env.CLAIM_CONTRACT_ADDRESS);
  const allowlist = JSON.parse(fs.readFileSync("../allowlist.json", "utf8"));

  console.log(`Adding ${allowlist.length} addresses to allowlist...`);

  const batchSize = 50;
  for (let i = 0; i < allowlist.length; i += batchSize) {
    const batch = allowlist.slice(i, i + batchSize);
    const tx = await contract.call("addMultipleToAllowList", [batch]);
    console.log(`Batch ${i/batchSize + 1} added - Tx Hash: ${tx.receipt.transactionHash}`);
  }

  console.log("Allowlist loading complete!");
}

loadAllowlist().catch(console.error);