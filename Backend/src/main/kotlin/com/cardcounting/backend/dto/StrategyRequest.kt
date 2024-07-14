package com.cardcounting.backend.dto

data class StrategyRequest(
    val deckComposition: DeckComposition,
    val standsOnSoft17: Boolean,
    val bankroll: Int,
    val minBetSize: Int
)
