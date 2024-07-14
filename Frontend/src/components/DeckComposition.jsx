import PropTypes from "prop-types";

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
  setAceCount: PropTypes.func.isRequired,
  setTwoCount: PropTypes.func.isRequired,
  setThreeCount: PropTypes.func.isRequired,
  setFourCount: PropTypes.func.isRequired,
  setFiveCount: PropTypes.func.isRequired,
  setSixCount: PropTypes.func.isRequired,
  setSevenCount: PropTypes.func.isRequired,
  setEightCount: PropTypes.func.isRequired,
  setNineCount: PropTypes.func.isRequired,
  setTenCount: PropTypes.func.isRequired,
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
  setAceCount,
  setTwoCount,
  setThreeCount,
  setFourCount,
  setFiveCount,
  setSixCount,
  setSevenCount,
  setEightCount,
  setNineCount,
  setTenCount,
}) {
  return (
    <>
      <h2>Deck composition</h2>
      <label>
        Ace
        <input
          type="number"
          value={aceCount}
          onChange={(e) => setAceCount(Number(e.target.value))}
        />
      </label>
      <br />
      <label>
        2
        <input
          type="number"
          value={twoCount}
          onChange={(e) => setTwoCount(Number(e.target.value))}
        />
      </label>
      <br />
      <label>
        3
        <input
          type="number"
          value={threeCount}
          onChange={(e) => setThreeCount(Number(e.target.value))}
        />
      </label>
      <br />
      <label>
        4
        <input
          type="number"
          value={fourCount}
          onChange={(e) => setFourCount(Number(e.target.value))}
        />
      </label>
      <br />
      <label>
        5
        <input
          type="number"
          value={fiveCount}
          onChange={(e) => setFiveCount(Number(e.target.value))}
        />
      </label>
      <br />
      <label>
        6
        <input
          type="number"
          value={sixCount}
          onChange={(e) => setSixCount(Number(e.target.value))}
        />
      </label>
      <br />
      <label>
        7
        <input
          type="number"
          value={sevenCount}
          onChange={(e) => setSevenCount(Number(e.target.value))}
        />
      </label>
      <br />
      <label>
        8
        <input
          type="number"
          value={eightCount}
          onChange={(e) => setEightCount(Number(e.target.value))}
        />
      </label>
      <br />
      <label>
        9
        <input
          type="number"
          value={nineCount}
          onChange={(e) => setNineCount(Number(e.target.value))}
        />
      </label>
      <br />
      <label>
        10
        <input
          type="number"
          value={tenCount}
          onChange={(e) => setTenCount(Number(e.target.value))}
        />
      </label>
    </>
  );
}

export default DeckComposition;
