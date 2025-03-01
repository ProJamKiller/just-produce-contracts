import React from "react";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import ClaimPage from "./components/claimpage";

function App() {
  return (
    <ThirdwebProvider
      activeChain="optimism"
      clientId={process.env.REACT_APP_THIRDWEB_CLIENT_ID}
    >
      <ClaimPage />
    </ThirdwebProvider>
  );
}

export default App;
