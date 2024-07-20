import { useEffect, useRef, useState } from "react";
import "./App.css";
import Settings from "./Settings";
import DeckComposition from "./DeckComposition";
import StrategyTables from "./StrategyTables";
import BetSize from "./BetSize";
import CardTracker from "./CardTracker";

function App() {
  // Controller for aborting fetch requests
  const controller = useRef();

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

  // Card tracker state
  const [cardsDealt, setCardsDealt] = useState([]);

  // On mount, add event listener to decrement card count when key is pressed
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Ignore key presses that are not numbers
      if (isNaN(Number(event.key))) return;

      // Decrement card count based on key pressed
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

      // Add card to cardsDealt state
      if (event.key === "1") {
        setCardsDealt((prevCards) => ["A", ...prevCards]);
      } else if (event.key === "0") {
        setCardsDealt((prevCards) => ["10", ...prevCards]);
      } else {
        setCardsDealt((prevCards) => [event.key, ...prevCards]);
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
      // Abort previous fetch requests if they are still pending
      if (controller.current) controller.current.abort();

      controller.current = new AbortController();
      const signal = controller.current.signal;

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
        signal,
      };

      try {
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
      } catch (error) {
        /* empty */
      }
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
    <>
      <h1>Blackjack Card Counter</h1>
      <Settings
        dealerStandsOn17={dealerStandsOn17}
        setDealerStandsOn17={setDealerStandsOn17}
        minBetSize={minBetSize}
        setMinBetSize={setMinBetSize}
      />
      <div className="flex-container">
        <div className="left-column">
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

          <BetSize betSize={betSize} />

          <StrategyTables
            hardTable={hardTable}
            softTable={softTable}
            splitTable={splitTable}
          />
        </div>

        <div className="right-column">
          <CardTracker cardsDealt={cardsDealt} />
        </div>
      </div>
    </>
  );
}

export default App;
