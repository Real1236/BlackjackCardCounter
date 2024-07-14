package com.cardcounting.backend.service

import com.cardcounting.backend.dto.DeckComposition
import com.cardcounting.backend.dto.StrategyResponse
import org.apache.poi.ss.usermodel.Workbook
import org.apache.poi.ss.usermodel.WorkbookFactory
import org.apache.poi.ss.util.CellAddress
import org.springframework.stereotype.Service

import java.io.FileInputStream
import kotlin.reflect.full.memberProperties

@Service
class StrategyService {
    fun getStrategy(
        deckComposition: DeckComposition,
        standsOnSoft17: Boolean,
        bankroll: Int,
        minBetSize: Int
    ): StrategyResponse {
        val filePath = getFilePath(standsOnSoft17)
        val workbook = WorkbookFactory.create(FileInputStream(filePath))
        updateDeckComposition(workbook, deckComposition)
        workbook.creationHelper.createFormulaEvaluator().evaluateAll()
        val (hardTable, softTable, splitTable) = getStrategyTables(workbook)
        val betSizeRounded = getBetSize(workbook, minBetSize)

        return StrategyResponse(
            hardTable = hardTable,
            softTable = softTable,
            splitTable = splitTable,
            betSize = betSizeRounded
        )
    }

    fun getEV(
        deckComposition: DeckComposition,
        standsOnSoft17: Boolean,
        bankroll: Int,
        minBetSize: Int
    ): Double {
        val filePath = getFilePath(standsOnSoft17)
        val workbook = WorkbookFactory.create(FileInputStream(filePath))
        updateDeckComposition(workbook, deckComposition)
        workbook.creationHelper.createFormulaEvaluator().evaluateAll()
        return getEvFromExcel(workbook)
    }

    private fun getFilePath(standsOnSoft17: Boolean): String {
        var filePath = "src/main/resources/excel/"
        filePath += if (standsOnSoft17) "StandsSoft17_CCC.xlsx" else "HitsSoft17_CCC.xlsx"
        return filePath
    }

    private fun updateDeckComposition(
        workbook: Workbook,
        deckComposition: DeckComposition
    ) {
        val cardValueToCell = mapOf(
            "A" to "B2", "2" to "C2", "3" to "D2", "4" to "E2", "5" to "F2",
            "6" to "G2", "7" to "H2", "8" to "I2", "9" to "J2", "10" to "K2"
        )

        val deckSheet = workbook.getSheet("Deck")
        for (card in DeckComposition::class.memberProperties) {
            val cellAddress = CellAddress(cardValueToCell[card.name])
            val cell = deckSheet.getRow(cellAddress.row).getCell(cellAddress.column)
            cell.setCellValue(card.get(deckComposition).toString().toDouble())
        }
    }

    private fun getStrategyTables(workbook: Workbook): Triple<Map<String, String>, Map<String, String>, Map<String, String>> {
        val hardTable = extractTable(workbook, "Hard", 2, 2, 19, 11)
        val softTable = extractTable(workbook, "Soft", 2, 2, 11, 11)
        val splitTable = extractTable(workbook, "Split", 2, 2, 11, 11)
        return Triple(hardTable, softTable, splitTable)
    }

    private fun extractTable(workbook: Workbook, sheetName: String, startRow: Int, startCol: Int, endRow: Int, endCol: Int): Map<String, String> {
        val sheet = workbook.getSheet(sheetName)
        val table = mutableMapOf<String, String>()
        for (i in startRow..endRow) {
            for (j in startCol..endCol) {
                val cellAddress = CellAddress(i - 1, j - 1)
                val cell = sheet.getRow(cellAddress.row).getCell(cellAddress.column)
                table["$i,$j"] = cell.stringCellValue
            }
        }
        return table
    }

    private fun getBetSize(workbook: Workbook, minBetSize: Int): Int {
        val evSheet = workbook.getSheet("ev")
        val playerEdge = evSheet.getRow(44).getCell(1).numericCellValue
        val betMultiple = 1000 * playerEdge + 1
        val betSize = betMultiple * minBetSize
        val betSizeRounded = maxOf((betSize / 5).toInt() * 5, minBetSize)
        return betSizeRounded
    }

    private fun getEvFromExcel(workbook: Workbook): Double {
        val evSheet = workbook.getSheet("ev")
        val playerEdge = evSheet.getRow(44).getCell(1).numericCellValue
        return playerEdge
    }
}