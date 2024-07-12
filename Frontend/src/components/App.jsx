import { useState } from "react";
import "./App.css";
import Settings from "./Settings";

function App() {
  // State and handlers are now in the parent component
  const [dealerStandsOn17, setDealerStandsOn17] = useState(true);
  const [minBetSize, setMinBetSize] = useState(0);

  return (
    <div>
      <h1>Blackjack Card Counter</h1>
      <Settings
        dealerStandsOn17={dealerStandsOn17}
        setDealerStandsOn17={setDealerStandsOn17}
        minBetSize={minBetSize}
        setMinBetSize={setMinBetSize}
      />
      {/* Other components or content that might need the state */}
    </div>
  );
}

export default App;
