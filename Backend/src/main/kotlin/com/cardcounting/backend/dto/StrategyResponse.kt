package com.cardcounting.backend.dto

data class StrategyResponse(
    val betSize: Double,
    val hardTable: Map<String, String>,
    val softTable: Map<String, String>,
    val splitTable: Map<String, String>
)
