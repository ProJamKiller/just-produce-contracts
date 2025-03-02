import React, { useState } from "react";
import {
  useAddress,
  useConnect,
  useContract,
  useContractWrite,
  Web3Button,
} from "@thirdweb-dev/react";
import styles from "../styles/ClaimPage.module.css";

interface ImportMeta {
  env: {
    VITE_CLAIM_CONTRACT_ADDRESS: string;
  };
}

const CLAIM_CONTRACT_ADDRESS = import.meta.env.VITE_CLAIM_CONTRACT_ADDRESS || "";
const LOGO_URL =
  "https://bafybeig6dpytw3q4v7vzdy6sb7q4x3apqgrvfi3zsbvb3n6wvs5unfr36i.ipfs.dweb.link?filename=480.gif";
const BACKGROUND_URL =
  "https://bafybeieypdtrkynr24g2enemwxssni7ug26zwvcz7mwkl6zmhlax4kvrfm.ipfs.dweb.link?filename=mojoclaimbackground.jpeg";

const ClaimPage: React.FC = () => {
  const address = useAddress();
  const connect = useConnect();
  const { contract } = useContract(CLAIM_CONTRACT_ADDRESS);
  const { mutate: claim, isLoading } = useContractWrite(
    contract,
    "claim",
  );

  const [claimStatus, setClaimStatus] = useState<
    string | null
  >(null);

  const handleClaim = async () => {
    try {
      await claim({});
      setClaimStatus("Successfully claimed tokens!");
    } catch (error) {
      setClaimStatus(
        "Claim failed. Check your eligibility.",
      );
      console.error(error);
    }
  };

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: `url(${BACKGROUND_URL})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className={styles.overlay}>
        <div className={styles.claimBox}>
          <img
            src={LOGO_URL}
            alt="Mojo Claim Logo"
            className={styles.logo}
          />
          <h1>MOJO Token Claim</h1>

          {!address ? (
           <Web3Button
           contractAddress={CLAIM_CONTRACT_ADDRESS}
           action={handleClaim}
           connectWallet={{}}
           className={styles.connectButton}
         >
           Connect Wallet
         </Web3Button>
         
          ) : (
            <div className={styles.claimSection}>
              <Web3Button
                contractAddress={CLAIM_CONTRACT_ADDRESS}
                action={handleClaim}
                className={styles.claimButton}
              >
                {isLoading ? "Claiming..." : "Claim Tokens"}
              </Web3Button>

              {claimStatus && (
                <p className={styles.statusMessage}>
                  {claimStatus}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClaimPage;
