import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";

// Choose the chain based on your .env (example: Optimism)
const activeChain = process.env.REACT_APP_CHAIN?.toLowerCase() === "optimism" ? "optimism" : "ethereum";

// Alternatively, you can explicitly set the chain with ChainId. For example, Optimism's chain ID is 10.
ReactDOM.render(
  <React.StrictMode>
    <ThirdwebProvider desiredChainId={10} clientId={process.env.REACT_APP_THIRDWEB_API_KEY}>
      <App />
    </ThirdwebProvider>
  </React.StrictMode>,
  document.getElementById("root")
);