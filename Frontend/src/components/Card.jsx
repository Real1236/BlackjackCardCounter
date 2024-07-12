import PropTypes from "prop-types";

Card.propTypes = {
    value: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    setCount: PropTypes.func.isRequired,
};

function Card({value, count, setCount}) {
  return (
    <>
      <form>
        <label>{value}</label>
        <br />
        <label>
          Card count:
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          />
        </label>
      </form>
    </>
  );
}

export default Card;
