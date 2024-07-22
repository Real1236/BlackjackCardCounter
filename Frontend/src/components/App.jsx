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
  const [numDecks, setNumDecks] = useState(8);

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

  // Reset deck composition when the number of decks changes
  useEffect(() => {
    setAceCount(4 * numDecks);
    setTwoCount(4 * numDecks);
    setThreeCount(4 * numDecks);
    setFourCount(4 * numDecks);
    setFiveCount(4 * numDecks);
    setSixCount(4 * numDecks);
    setSevenCount(4 * numDecks);
    setEightCount(4 * numDecks);
    setNineCount(4 * numDecks);
    setTenCount(16 * numDecks);
    setCardsDealt([]);
  }, [numDecks]);

  // Add event listener to decrement card count when key is pressed
  useEffect(() => {
    // Mapping of key presses to card information
    const keyToCardMapping = {
      1: { setter: setAceCount, label: "A", count: aceCount },
      2: { setter: setTwoCount, label: "2", count: twoCount },
      3: { setter: setThreeCount, label: "3", count: threeCount },
      4: { setter: setFourCount, label: "4", count: fourCount },
      5: { setter: setFiveCount, label: "5", count: fiveCount },
      6: { setter: setSixCount, label: "6", count: sixCount },
      7: { setter: setSevenCount, label: "7", count: sevenCount },
      8: { setter: setEightCount, label: "8", count: eightCount },
      9: { setter: setNineCount, label: "9", count: nineCount },
      0: { setter: setTenCount, label: "10", count: tenCount },
    };

    const handleKeyPress = (event) => {
      const cardInfo = keyToCardMapping[event.key];
      if (cardInfo && cardInfo.count > 0) {
        // Decrement the count and add the card to the dealt list
        cardInfo.setter((prevCount) => Math.max(prevCount - 1, 0));
        setCardsDealt((prevCards) => [cardInfo.label, ...prevCards]);
      }
    };

    // Add event listener when component mounts
    window.addEventListener("keydown", handleKeyPress);

    // Cleanup event listener when component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [
    aceCount,
    eightCount,
    fiveCount,
    fourCount,
    nineCount,
    sevenCount,
    sixCount,
    tenCount,
    threeCount,
    twoCount,
  ]);

  // When any card count changes, get strategy tables from the server
  useEffect(() => {
    async function fetchStrategy() {
      // Abort previous fetch requests if they are still pending
      if (controller.current) controller.current.abort();

      controller.current = new AbortController();
      const signal = controller.current.signal;

      const requestOptions = {
        method: "POST",
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
        numDecks={numDecks}
        setNumDecks={setNumDecks}
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
