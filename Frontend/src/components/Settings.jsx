import PropTypes from "prop-types";

Settings.propTypes = {
  dealerStandsOn17: PropTypes.bool.isRequired,
  setDealerStandsOn17: PropTypes.func.isRequired,
  minBetSize: PropTypes.number.isRequired,
  setMinBetSize: PropTypes.func.isRequired,
  numDecks: PropTypes.number.isRequired,
  setNumDecks: PropTypes.func.isRequired,
};

function Settings({
  dealerStandsOn17,
  setDealerStandsOn17,
  minBetSize,
  setMinBetSize,
  numDecks,
  setNumDecks,
}) {
  return (
    <>
      <h2>Settings</h2>
      <form>
        <label>
          Dealer stands on 17:
          <input
            type="checkbox"
            checked={dealerStandsOn17}
            onChange={(e) => setDealerStandsOn17(e.target.checked)}
          />
        </label>
        <br />
        <label>
          Minimum bet size:
          <input
            type="number"
            value={minBetSize}
            onChange={(e) => setMinBetSize(Math.max(Number(e.target.value), 0))}
          />
        </label>
        <br />
        <label>
          Number of decks:
          <input
            type="number"
            value={numDecks}
            onChange={(e) => setNumDecks(Math.max(Number(e.target.value), 1))}
          />
        </label>
      </form>
    </>
  );
}

export default Settings;
