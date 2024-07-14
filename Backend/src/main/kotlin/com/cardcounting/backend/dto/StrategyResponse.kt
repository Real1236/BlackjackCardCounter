package com.cardcounting.backend.dto

data class StrategyResponse(
    val betSize: Int,
    val hardTable: Map<String, String>,
    val softTable: Map<String, String>,
    val splitTable: Map<String, String>
)
