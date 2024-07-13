import { useState } from "react";

const hardTableData = {
  "4,2": "H",
  "4,3": "H",
  "4,4": "H",
  "4,5": "H",
  "4,6": "H",
  "4,7": "H",
  "4,8": "H",
  "4,9": "H",
  "4,10": "H",
  "4,11": "H",
  "5,2": "H",
  "5,3": "H",
  "5,4": "H",
  "5,5": "H",
  "5,6": "H",
  "5,7": "H",
  "5,8": "H",
  "5,9": "H",
  "5,10": "H",
  "5,11": "H",
  "6,2": "H",
  "6,3": "H",
  "6,4": "H",
  "6,5": "H",
  "6,6": "H",
  "6,7": "H",
  "6,8": "H",
  "6,9": "H",
  "6,10": "H",
  "6,11": "H",
  "7,2": "H",
  "7,3": "H",
  "7,4": "H",
  "7,5": "H",
  "7,6": "H",
  "7,7": "H",
  "7,8": "H",
  "7,9": "H",
  "7,10": "H",
  "7,11": "H",
  "8,2": "H",
  "8,3": "H",
  "8,4": "H",
  "8,5": "H",
  "8,6": "H",
  "8,7": "H",
  "8,8": "H",
  "8,9": "H",
  "8,10": "H",
  "8,11": "H",
  "9,2": "H",
  "9,3": "D",
  "9,4": "D",
  "9,5": "D",
  "9,6": "D",
  "9,7": "H",
  "9,8": "H",
  "9,9": "H",
  "9,10": "H",
  "9,11": "H",
  "10,2": "D",
  "10,3": "D",
  "10,4": "D",
  "10,5": "D",
  "10,6": "D",
  "10,7": "D",
  "10,8": "D",
  "10,9": "D",
  "10,10": "H",
  "10,11": "H",
  "11,2": "D",
  "11,3": "D",
  "11,4": "D",
  "11,5": "D",
  "11,6": "D",
  "11,7": "D",
  "11,8": "D",
  "11,9": "D",
  "11,10": "D",
  "11,11": "H",
  "12,2": "H",
  "12,3": "H",
  "12,4": "S",
  "12,5": "S",
  "12,6": "S",
  "12,7": "H",
  "12,8": "H",
  "12,9": "H",
  "12,10": "H",
  "12,11": "H",
  "13,2": "S",
  "13,3": "S",
  "13,4": "S",
  "13,5": "S",
  "13,6": "S",
  "13,7": "H",
  "13,8": "H",
  "13,9": "H",
  "13,10": "H",
  "13,11": "H",
  "14,2": "S",
  "14,3": "S",
  "14,4": "S",
  "14,5": "S",
  "14,6": "S",
  "14,7": "H",
  "14,8": "H",
  "14,9": "H",
  "14,10": "H",
  "14,11": "H",
  "15,2": "S",
  "15,3": "S",
  "15,4": "S",
  "15,5": "S",
  "15,6": "S",
  "15,7": "H",
  "15,8": "H",
  "15,9": "H",
  "15,10": "R",
  "15,11": "H",
  "16,2": "S",
  "16,3": "S",
  "16,4": "S",
  "16,5": "S",
  "16,6": "S",
  "16,7": "H",
  "16,8": "H",
  "16,9": "R",
  "16,10": "R",
  "16,11": "R",
  "17,2": "S",
  "17,3": "S",
  "17,4": "S",
  "17,5": "S",
  "17,6": "S",
  "17,7": "S",
  "17,8": "S",
  "17,9": "S",
  "17,10": "S",
  "17,11": "S",
  "18,2": "S",
  "18,3": "S",
  "18,4": "S",
  "18,5": "S",
  "18,6": "S",
  "18,7": "S",
  "18,8": "S",
  "18,9": "S",
  "18,10": "S",
  "18,11": "S",
  "19,2": "S",
  "19,3": "S",
  "19,4": "S",
  "19,5": "S",
  "19,6": "S",
  "19,7": "S",
  "19,8": "S",
  "19,9": "S",
  "19,10": "S",
  "19,11": "S",
  "20,2": "S",
  "20,3": "S",
  "20,4": "S",
  "20,5": "S",
  "20,6": "S",
  "20,7": "S",
  "20,8": "S",
  "20,9": "S",
  "20,10": "S",
  "20,11": "S",
  "21,2": "S",
  "21,3": "S",
  "21,4": "S",
  "21,5": "S",
  "21,6": "S",
  "21,7": "S",
  "21,8": "S",
  "21,9": "S",
  "21,10": "S",
  "21,11": "S",
};

function StrategyTables() {
  const [hardTable] = useState(hardTableData);

  const rows = [];
  const dealerUpcards = new Set();

  // Get all unique dealer upcards and sort them
  Object.keys(hardTable).forEach((key) => {
    const [, dealerUpcard] = key.split(",");
    dealerUpcards.add(parseInt(dealerUpcard, 10));
  });
  const sortedDealerUpcards = Array.from(dealerUpcards).sort((a, b) => a - b);

  // Create rows for each player total from 4 to 21
  for (let playerTotal = 4; playerTotal <= 21; playerTotal++) {
    const cells = sortedDealerUpcards.map((dealerUpcard) => {
      const key = `${playerTotal},${dealerUpcard}`;
      return <td key={key}>{hardTable[key] || "-"}</td>;
    });

    rows.push(
      <tr key={playerTotal}>
        <td>{playerTotal}</td>
        {cells}
      </tr>
    );
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Player Total / Dealer Upcard</th>
          {sortedDealerUpcards.map((dealerUpcard) => (
            <th key={dealerUpcard}>{dealerUpcard}</th>
          ))}
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export default StrategyTables;
