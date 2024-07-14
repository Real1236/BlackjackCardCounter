import PropTypes from "prop-types";

BetSize.propTypes = {
  betSize: PropTypes.number.isRequired,
};

function BetSize({ betSize }) {
  return (
    <div>
      <h2>Bet Size: {betSize}</h2>
    </div>
  );
}

export default BetSize;
