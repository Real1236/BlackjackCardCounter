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
  const [deckComposition, setDeckComposition] = useState({
    1: 32,
    2: 32,
    3: 32,
    4: 32,
    5: 32,
    6: 32,
    7: 32,
    8: 32,
    9: 32,
    0: 128,
  });

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
    setDeckComposition({
      1: 4 * numDecks,
      2: 4 * numDecks,
      3: 4 * numDecks,
      4: 4 * numDecks,
      5: 4 * numDecks,
      6: 4 * numDecks,
      7: 4 * numDecks,
      8: 4 * numDecks,
      9: 4 * numDecks,
      0: 16 * numDecks,
    });
    setCardsDealt([]);
  }, [numDecks]);

  // Add event listener to decrement card count when key is pressed
  useEffect(() => {
    const handleKeyPress = (event) => {
      let card = Number(event.key);
      if (!isNaN(card) && deckComposition[card] > 0) {
        // Update the deck composition by decrementing the count of the dealt card
        setDeckComposition((prevComposition) => ({
          ...prevComposition,
          [card]: Math.max(prevComposition[card] - 1, 0),
        }));

        // Add the card to the dealt list
        setCardsDealt((prevCards) => {
          if (card === 0) {
            return [10, ...prevCards];
          } else if (card === 1) {
            return ["A", ...prevCards];
          }
          return [card, ...prevCards];
        });
      }
    };

    // Add event listener when component mounts
    window.addEventListener("keydown", handleKeyPress);

    // Cleanup event listener when component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [deckComposition]); // Ensure effect runs when deckComposition changes

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
            A: deckComposition[1],
            2: deckComposition[2],
            3: deckComposition[3],
            4: deckComposition[4],
            5: deckComposition[5],
            6: deckComposition[6],
            7: deckComposition[7],
            8: deckComposition[8],
            9: deckComposition[9],
            10: deckComposition[0],
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
  }, [deckComposition, minBetSize]);

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
          <DeckComposition deckComposition={deckComposition} />
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
