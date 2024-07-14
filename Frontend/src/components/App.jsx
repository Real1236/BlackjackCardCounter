import { useEffect, useState } from "react";
import "./App.css";
import Settings from "./Settings";
import DeckComposition from "./DeckComposition";
import StrategyTables from "./StrategyTables";
import BetSize from "./BetSize";

function App() {
  // Settings state
  const [dealerStandsOn17, setDealerStandsOn17] = useState(true);
  const [minBetSize, setMinBetSize] = useState(5);

  // Deck composition state
  const [aceCount, setAceCount] = useState(16);
  const [twoCount, setTwoCount] = useState(16);
  const [threeCount, setThreeCount] = useState(16);
  const [fourCount, setFourCount] = useState(16);
  const [fiveCount, setFiveCount] = useState(16);
  const [sixCount, setSixCount] = useState(16);
  const [sevenCount, setSevenCount] = useState(16);
  const [eightCount, setEightCount] = useState(16);
  const [nineCount, setNineCount] = useState(16);
  const [tenCount, setTenCount] = useState(64);

  // Strategy tables state
  const [hardTable, setHardTable] = useState({});
  const [softTable, setSoftTable] = useState({});
  const [splitTable, setSplitTable] = useState({});

  // Bet size state
  const [betSize, setBetSize] = useState(0);

  // On mount, add event listener to decrement card count when key is pressed
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "1") {
        setAceCount((prevCount) => prevCount - 1);
      }
      if (event.key === "2") {
        setTwoCount((prevCount) => prevCount - 1);
      }
      if (event.key === "3") {
        setThreeCount((prevCount) => prevCount - 1);
      }
      if (event.key === "4") {
        setFourCount((prevCount) => prevCount - 1);
      }
      if (event.key === "5") {
        setFiveCount((prevCount) => prevCount - 1);
      }
      if (event.key === "6") {
        setSixCount((prevCount) => prevCount - 1);
      }
      if (event.key === "7") {
        setSevenCount((prevCount) => prevCount - 1);
      }
      if (event.key === "8") {
        setEightCount((prevCount) => prevCount - 1);
      }
      if (event.key === "9") {
        setNineCount((prevCount) => prevCount - 1);
      }
      if (event.key === "0") {
        setTenCount((prevCount) => prevCount - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // When any card count changes, get strategy tables from the server
  useEffect(() => {
    async function fetchStrategy() {
      const requestOptions = {
        method: "POST", // Specify the method
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deckComposition: {
            A: aceCount,
            2: twoCount,
            3: threeCount,
            4: fourCount,
            5: fiveCount,
            6: sixCount,
            7: sevenCount,
            8: eightCount,
            9: nineCount,
            10: tenCount,
          },
          standsOnSoft17: true,
          bankroll: 10000, // TODO: Implement bankroll
          minBetSize: minBetSize,
        }),
      };

      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/strategy`,
        requestOptions
      );

      if (!res.ok)
        throw new Error(
          `Failed to fetch strategy: ${res.status} ${res.statusText}`
        );

      const data = await res.json();
      setHardTable(data.hardTable);
      setSoftTable(data.softTable);
      setSplitTable(data.splitTable);
      setBetSize(data.betSize);
    }
    fetchStrategy();
  }, [
    aceCount,
    twoCount,
    threeCount,
    fourCount,
    fiveCount,
    sixCount,
    sevenCount,
    eightCount,
    nineCount,
    tenCount,
    minBetSize,
  ]);

  return (
    <div>
      <h1>Blackjack Card Counter</h1>
      <Settings
        dealerStandsOn17={dealerStandsOn17}
        setDealerStandsOn17={setDealerStandsOn17}
        minBetSize={minBetSize}
        setMinBetSize={setMinBetSize}
      />

      <DeckComposition
        aceCount={aceCount}
        twoCount={twoCount}
        threeCount={threeCount}
        fourCount={fourCount}
        fiveCount={fiveCount}
        sixCount={sixCount}
        sevenCount={sevenCount}
        eightCount={eightCount}
        nineCount={nineCount}
        tenCount={tenCount}
        setAceCount={setAceCount}
        setTwoCount={setTwoCount}
        setThreeCount={setThreeCount}
        setFourCount={setFourCount}
        setFiveCount={setFiveCount}
        setSixCount={setSixCount}
        setSevenCount={setSevenCount}
        setEightCount={setEightCount}
        setNineCount={setNineCount}
        setTenCount={setTenCount}
      />

      <StrategyTables
        hardTable={hardTable}
        softTable={softTable}
        splitTable={splitTable}
      />

      <BetSize betSize={betSize} />
    </div>
  );
}

export default App;
