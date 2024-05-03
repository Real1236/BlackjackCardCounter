const XLSX = require('xlsx');
const XLSX_CALC = require('xlsx-calc');
const fs = require('fs');

// Convert indices to Excel-style cell address for 1-based indexing
function getCellAddress(row, col) {
    const colLetter = String.fromCharCode(64 + col); // 64 is the ASCII value for 'A' - 1
    return colLetter + row;
}

exports.createStrategyInteractor = async ({deckComposition, standsOnSoft17, bankroll, minBetSize}) => {
    // Map card value to cell
    const cardValueToCell = {
        'A': 'B2',
        '2': 'C2',
        '3': 'D2',
        '4': 'E2',
        '5': 'F2',
        '6': 'G2',
        '7': 'H2',
        '8': 'I2',
        '9': 'J2',
        '10': 'K2'
    };

    // Update deck composition and store result in a new file
    const workbook = XLSX.readFile('./Excel/HitsSoft17_CCC.xlsx');
    Object.entries(deckComposition).forEach(([card, count]) => {
        workbook.Sheets['Deck'][cardValueToCell[card]].v = count;
    });
    XLSX_CALC(workbook);

    // Get Hard
    const hardWorksheet = workbook.Sheets['Hard'];
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

    console.log(hardTable);
}