// scripts/loadAllowList.js
const fs = require("fs");
const { ethers } = require("ethers");
require("dotenv").config();

async function main() {
  // Read and parse the allow list file
  const data = fs.readFileSync(process.env.ALLOWLIST_FILE, "utf8");
  const addresses = data.split(",").map(addr => addr.trim()).filter(addr => addr);

  console.log("Loaded addresses:", addresses);

  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const contractAddress = process.env.MOJO_CLAIM_CONTRACT_ADDRESS;
  const abi = [
    "function addMultipleToAllowList(address[] calldata users) external"
  ];

  const contract = new ethers.Contract(contractAddress, abi, wallet);

  const tx = await contract.addMultipleToAllowList(addresses);
  console.log("Transaction sent. Waiting for confirmation...");
  await tx.wait();
  console.log("Allow list loaded successfully!");
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error("Error loading allow list:", error);
    process.exit(1);
  });