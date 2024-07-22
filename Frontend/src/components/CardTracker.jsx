import PropTypes from "prop-types";
import "./CardTracker.css";

CardTracker.propTypes = {
  cardsDealt: PropTypes.array.isRequired,
};

function CardTracker({ cardsDealt }) {
  return (
    <>
      <h2>Cards Dealt</h2>
      <p>Press &apos;-&apos; to undo and &apos;+&apos; to redo</p>
      <div className="cards-dealt">
        {cardsDealt.map((card, index) => (
          <div key={index}>{card}</div>
        ))}
      </div>
    </>
  );
}

export default CardTracker;
