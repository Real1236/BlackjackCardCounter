import { useEffect, useState } from "react";
import "./App.css";
import Settings from "./Settings";
import Card from "./Card";
import StrategyTables from "./StrategyTables";

function App() {
  // Settings state
  const [dealerStandsOn17, setDealerStandsOn17] = useState(true);
  const [minBetSize, setMinBetSize] = useState(0);

  // Deck composition state
  const [aceCount, setAceCount] = useState(4);
  const [twoCount, setTwoCount] = useState(4);
  const [threeCount, setThreeCount] = useState(4);
  const [fourCount, setFourCount] = useState(4);
  const [fiveCount, setFiveCount] = useState(4);
  const [sixCount, setSixCount] = useState(4);
  const [sevenCount, setSevenCount] = useState(4);
  const [eightCount, setEightCount] = useState(4);
  const [nineCount, setNineCount] = useState(4);
  const [tenCount, setTenCount] = useState(16);

  // Strategy tables state
  const [hardTable, setHardTable] = useState({});
  const [softTable, setSoftTable] = useState({});
  const [splitTable, setSplitTable] = useState({});

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
          minBetSize: 10, // TODO: Implement minBetSize
        }),
      };

      const res = await fetch(
        "http://localhost:3000/api/strategy",
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

      <h2>Deck composition</h2>
      <Card value="Ace" count={aceCount} setCount={setAceCount} />
      <Card value="2" count={twoCount} setCount={setTwoCount} />
      <Card value="3" count={threeCount} setCount={setThreeCount} />
      <Card value="4" count={fourCount} setCount={setFourCount} />
      <Card value="5" count={fiveCount} setCount={setFiveCount} />
      <Card value="6" count={sixCount} setCount={setSixCount} />
      <Card value="7" count={sevenCount} setCount={setSevenCount} />
      <Card value="8" count={eightCount} setCount={setEightCount} />
      <Card value="9" count={nineCount} setCount={setNineCount} />
      <Card value="10" count={tenCount} setCount={setTenCount} />

      <StrategyTables
        hardTable={hardTable}
        softTable={softTable}
        splitTable={splitTable}
      />
    </div>
  );
}

export default App;
