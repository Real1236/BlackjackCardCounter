const XLSX = require("xlsx");
const XLSX_CALC = require("xlsx-calc");

// Convert indices to Excel-style cell address for 1-based indexing
function getCellAddress(row, col) {
  const colLetter = String.fromCharCode(64 + col); // 64 is the ASCII value for 'A' - 1
  return colLetter + row;
}

exports.createStrategyInteractor = ({
  deckComposition,
  standsOnSoft17,
  minBetSize,
}) => {
  /* Update deck composition */
  const cardValueToCell = {
    A: "B2",
    2: "C2",
    3: "D2",
    4: "E2",
    5: "F2",
    6: "G2",
    7: "H2",
    8: "I2",
    9: "J2",
    10: "K2",
  };

  let workbook;
  if (standsOnSoft17 === false) {
    workbook = XLSX.readFile("./Excel/HitsSoft17_CCC.xlsx");
  } else {
    workbook = XLSX.readFile("./Excel/StandsSoft17_CCC.xlsx");
  }
  Object.entries(deckComposition).forEach(([card, count]) => {
    workbook.Sheets["Deck"][cardValueToCell[card]].v = count;
  });
  XLSX_CALC(workbook);

  /* Get strategy tables */
  // Get Hard
  const hardWorksheet = workbook.Sheets["Hard"];
  const hardTable = {};

  // All these values are 1-based index
  let startRow = 2;
  let startCol = 2;
  let endRow = 19;
  let endCol = 11;
  for (let i = startRow; i <= endRow; i++) {
    for (let j = startCol; j <= endCol; j++) {
      const cell = hardWorksheet[getCellAddress(i, j)];
      hardTable[`${i + 2},${j}`] = cell.v;
    }
  }

  // Get Soft
  const softWorksheet = workbook.Sheets["Soft"];
  const softTable = {};
  startRow = 2;
  startCol = 2;
  endRow = 11;
  endCol = 11;
  for (let i = startRow; i <= endRow; i++) {
    for (let j = startCol; j <= endCol; j++) {
      const cell = softWorksheet[getCellAddress(i, j)];
      softTable[`${i + 10},${j}`] = cell.v;
    }
  }

  // Get Split
  const splitWorksheet = workbook.Sheets["Split"];
  const splitTable = {};
  startRow = 2;
  startCol = 2;
  endRow = 11;
  endCol = 11;
  for (let i = startRow; i <= endRow; i++) {
    for (let j = startCol; j <= endCol; j++) {
      const cell = splitWorksheet[getCellAddress(i, j)];
      splitTable[`${i},${j}`] = cell.v;
    }
  }

  /* Get bet size */
  const playerEdge = Number(workbook.Sheets["ev"][getCellAddress(45, 2)].w); // For some reason, `w` works for negative but not `v`
  const betMultiple = 1000 * playerEdge + 1;
  const betSize = betMultiple * minBetSize;
  const betSizeRounded = Math.max(Math.floor(betSize / 5) * 5, minBetSize); // TODO: Make rounding increments dynamic
  // TODO: have some bankroll management strategy here

  return {
    betSize: betSizeRounded,
    hardTable: hardTable,
    softTable: softTable,
    splitTable: splitTable,
  };
};
