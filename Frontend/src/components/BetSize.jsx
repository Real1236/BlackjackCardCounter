import PropTypes from "prop-types";

BetSize.propTypes = {
  betSize: PropTypes.number.isRequired,
};

function BetSize({ betSize }) {
  return (
    <div>
      <p>Bet Size: {betSize}</p>
    </div>
  );
}

export default BetSize;
