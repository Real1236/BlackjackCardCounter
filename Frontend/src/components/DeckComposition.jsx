import PropTypes from "prop-types";
import "./DeckComposition.css";

DeckComposition.propTypes = {
  deckComposition: PropTypes.object.isRequired,
};

function DeckComposition({ deckComposition }) {
  return (
    <>
      <h2>Deck composition</h2>
      <div className="deck-composition">
        <label>Ace: {deckComposition[1]}</label>
        <br />
        <label>2: {deckComposition[2]}</label>
        <br />
        <label>3: {deckComposition[3]}</label>
        <br />
        <label>4: {deckComposition[4]}</label>
        <br />
        <label>5: {deckComposition[5]}</label>
        <br />
        <label>6: {deckComposition[6]}</label>
        <br />
        <label>7: {deckComposition[7]}</label>
        <br />
        <label>8: {deckComposition[8]}</label>
        <br />
        <label>9: {deckComposition[9]}</label>
        <br />
        <label>10: {deckComposition[0]}</label>
      </div>
    </>
  );
}

export default DeckComposition;
