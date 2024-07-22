import PropTypes from "prop-types";
import "./DeckComposition.css";

DeckComposition.propTypes = {
  aceCount: PropTypes.number.isRequired,
  twoCount: PropTypes.number.isRequired,
  threeCount: PropTypes.number.isRequired,
  fourCount: PropTypes.number.isRequired,
  fiveCount: PropTypes.number.isRequired,
  sixCount: PropTypes.number.isRequired,
  sevenCount: PropTypes.number.isRequired,
  eightCount: PropTypes.number.isRequired,
  nineCount: PropTypes.number.isRequired,
  tenCount: PropTypes.number.isRequired,
};

function DeckComposition({
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
}) {
  return (
    <>
      <h2>Deck composition</h2>
      <div className="deck-composition">
        <label>Ace: {aceCount}</label>
        <br />
        <label>2: {twoCount}</label>
        <br />
        <label>3: {threeCount}</label>
        <br />
        <label>4: {fourCount}</label>
        <br />
        <label>5: {fiveCount}</label>
        <br />
        <label>6: {sixCount}</label>
        <br />
        <label>7: {sevenCount}</label>
        <br />
        <label>8: {eightCount}</label>
        <br />
        <label>9: {nineCount}</label>
        <br />
        <label>10: {tenCount}</label>
      </div>
    </>
  );
}

export default DeckComposition;
