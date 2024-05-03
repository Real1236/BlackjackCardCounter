const ExcelJS = require('exceljs');
const fs = require('fs');

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
    const workbook = new ExcelJS.Workbook();
    const randomId = Math.floor(Math.random() * 1000000);
    await workbook.xlsx.readFile('./Excel/HitsSoft17_CCC.xlsx').then(async () => {
        // Get Deck worksheet
        const deckWorksheet = workbook.getWorksheet('Deck');

        Object.entries(deckComposition).forEach(([card, count]) => {
            deckWorksheet.getCell(cardValueToCell[card]).value = count;
        });
       
        // Save workbook
        console.log('randomId: ' + randomId);
        await workbook.xlsx.writeFile('./Excel/HitsSoft17_CCC_' + randomId + '.xlsx').then(() => {
            console.log('Strategy updated');
        });
    });

    // Get strategy from the new file
    const newWorkbook = new ExcelJS.Workbook();
    console.log('randomId: ' + randomId);
    newWorkbook.xlsx.readFile('./Excel/HitsSoft17_CCC_' + randomId + '.xlsx').then(() => {
        // Get Hard
        const hardWorksheet = newWorkbook.getWorksheet('Hard');
        const hardTable = {};
        let startRow = 2;
        let startCol = 2;
        let endRow = 19;
        let endCol = 11;
        for (let i = startRow; i <= endRow; i++) {
            for (let j = startCol; j <= endCol; j++) {
                const cell = hardWorksheet.getCell(i, j);
                hardTable[`${i + 2},${j}`] = cell.value.result;
            }
        }

        console.log(hardTable);

        // Get Soft
        const softWorksheet = newWorkbook.getWorksheet('Soft');
        const softTable = {};

        // Delete the file
        // fs.unlinkSync('./Excel/HitsSoft17_CCC_' + randomId + '.xlsx');
    });
}