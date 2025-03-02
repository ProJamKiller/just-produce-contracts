import React, { useState, useEffect } from "react";
import { useContract, useAddress } from "@thirdweb-dev/react";
 import styles from "../styles/ClaimPage.module.css";
function ClaimSection() {
  const address = useAddress();
  const { contract } = useContract(process.env.REACT_APP_CLAIM_CONTRACT_ADDRESS);
  const [isAllowed, setIsAllowed] = useState(false);
  const [hasClaimed, setHasClaimed] = useState(false);

  // Function to check if the connected address is on the allow list
  const checkAllowList = async () => {
    if (!contract || !address) return;
    try {
      const allowed = await contract.call("allowList", [address]);
      setIsAllowed(allowed);
    } catch (err) {
      console.error("Error checking allow list:", err);
    }
  };

  // Function to check if tokens have been claimed
  const checkClaimStatus = async () => {
    if (!contract || !address) return;
    try {
      const claimed = await contract.call("claimed", [address]);
      setHasClaimed(claimed);
    } catch (err) {
      console.error("Error checking claim status:", err);
    }
  };

  useEffect(() => {
    checkAllowList();
    checkClaimStatus();
  }, [contract, address]);

  const claimTokens = async () => {
    if (!contract) return;
    try {
      const tx = await contract.call("claim");
      console.log("Tokens claimed:", tx);
    } catch (err) {
      console.error("Claim failed:", err);
    }
  };

  return (
    <div>
      <h2>Claim Your Tokens</h2>
      {isAllowed ? (
        hasClaimed ? (
          <p>You have already claimed your tokens.</p>
        ) : (
          <button onClick={claimTokens}>Claim Tokens</button>
        )
      ) : (
        <p>Your address is not on the allow list.</p>
      )}
    </div>
  );
}

export default ClaimSection;