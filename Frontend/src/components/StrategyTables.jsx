import PropTypes from "prop-types";

StrategyTables.propTypes = {
  hardTable: PropTypes.object.isRequired,
  softTable: PropTypes.object.isRequired,
  splitTable: PropTypes.object.isRequired,
};

function StrategyTables({ hardTable, softTable, splitTable }) {
  // Create rows for tables
  const dealerUpcards = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const hardRows = [];
  for (let playerTotal = 4; playerTotal <= 21; playerTotal++) {
    const cells = dealerUpcards.map((dealerUpcard) => {
      const key = `${playerTotal},${dealerUpcard}`;
      return <td key={key}>{hardTable[key] || "-"}</td>;
    });

    hardRows.push(
      <tr key={playerTotal}>
        <td>{playerTotal}</td>
        {cells}
      </tr>
    );
  }

  const softRows = [];
  for (let playerTotal = 12; playerTotal <= 21; playerTotal++) {
    const cells = dealerUpcards.map((dealerUpcard) => {
      const key = `${playerTotal},${dealerUpcard}`;
      return <td key={key}>{softTable[key] || "-"}</td>;
    });

    softRows.push(
      <tr key={playerTotal}>
        <td>{playerTotal}</td>
        {cells}
      </tr>
    );
  }

  const splitRows = [];
  for (let playerTotal = 2; playerTotal <= 11; playerTotal++) {
    const cells = dealerUpcards.map((dealerUpcard) => {
      const key = `${playerTotal},${dealerUpcard}`;
      return <td key={key}>{splitTable[key] || "-"}</td>;
    });

    splitRows.push(
      <tr key={playerTotal}>
        <td>{playerTotal}</td>
        {cells}
      </tr>
    );
  }

  return (
    <>
      <h2>Hard Table</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            {dealerUpcards.map((dealerUpcard) => (
              <th key={dealerUpcard}>{dealerUpcard}</th>
            ))}
          </tr>
        </thead>
        <tbody>{hardRows}</tbody>
      </table>

      <h2>Soft Table</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            {dealerUpcards.map((dealerUpcard) => (
              <th key={dealerUpcard}>{dealerUpcard}</th>
            ))}
          </tr>
        </thead>
        <tbody>{softRows}</tbody>
      </table>

      <h2>Split Table</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            {dealerUpcards.map((dealerUpcard) => (
              <th key={dealerUpcard}>{dealerUpcard}</th>
            ))}
          </tr>
        </thead>
        <tbody>{splitRows}</tbody>
      </table>
    </>
  );
}

export default StrategyTables;
