import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize the SDK with your secret key
const sdk = new ThirdwebSDK(process.env.CHAIN_NAME, {
  secretKey: process.env.THIRDWEB_SECRET_KEY,
});

class MojoClaimHandler {
  constructor() {
    this.claimContract = sdk.getContract(
      process.env.CLAIM_CONTRACT_ADDRESS,
    );
    this.mojoToken = sdk.getContract(
      process.env.MOJO_CONTRACT_ADDRESS,
    );
  }

  async checkAllowList(userAddress) {
    try {
      const contract = await this.claimContract;
      return await contract.call("allowList", [
        userAddress,
      ]);
    } catch (error) {
      console.error("Error checking allow list:", error);
      return false;
    }
  }

  async checkClaimed(userAddress) {
    try {
      const contract = await this.claimContract;
      return await contract.call("claimed", [userAddress]);
    } catch (error) {
      console.error("Error checking claim status:", error);
      return true;
    }
  }

  async claimTokens(walletAddress) {
    try {
      // Check if user is on allow list
      const isAllowed =
        await this.checkAllowList(walletAddress);
      if (!isAllowed) {
        throw new Error("Address not on allow list");
      }

      // Check if user has already claimed
      const hasClaimed =
        await this.checkClaimed(walletAddress);
      if (hasClaimed) {
        throw new Error("Tokens already claimed");
      }

      // Perform the claim
      const contract = await this.claimContract;
      const tx = await contract.call("claim");

      return {
        success: true,
        transactionHash: tx.transactionHash,
        message: "Tokens claimed successfully",
      };
    } catch (error) {
      console.error("Claim failed:", error);
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async addToAllowList(adminWallet, userAddresses) {
    try {
      const contract = await this.claimContract;

      // If single address, use single method
      if (typeof userAddresses === "string") {
        const tx = await contract.call("addToAllowList", [
          userAddresses,
        ]);
        return {
          success: true,
          transactionHash: tx.transactionHash,
        };
      }

      // If array of addresses, use multiple method
      const tx = await contract.call(
        "addMultipleToAllowList",
        [userAddresses],
      );
      return {
        success: true,
        transactionHash: tx.transactionHash,
      };
    } catch (error) {
      console.error("Error adding to allow list:", error);
      return { success: false, message: error.message };
    }
  }
}

// Example usage
async function main() {
  const handler = new MojoClaimHandler();

  // Check allow list for a specific address
  const isAllowed =
    await handler.checkAllowList("0x1234...");
  console.log("Is on allow list:", isAllowed);

  // Claim tokens for a specific address
  const claimResult =
    await handler.claimTokens("0x1234...");
  console.log(claimResult);

  // Add addresses to allow list (admin function)
  const addResult = await handler.addToAllowList(
    "0xADMIN_ADDRESS",
    ["0x5678...", "0x9012..."],
  );
  console.log(addResult);
}

// Uncomment to run
// main().catch(console.error);

export default MojoClaimHandler;
