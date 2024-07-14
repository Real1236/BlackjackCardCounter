package com.cardcounting.backend.controller

import com.cardcounting.backend.dto.StrategyRequest
import com.cardcounting.backend.dto.StrategyResponse
import com.cardcounting.backend.service.StrategyService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/strategy")
class StrategyController(private val strategyService: StrategyService) {
    @PostMapping
    fun getStrategy(@RequestBody request: StrategyRequest): StrategyResponse {
        return strategyService.getStrategy(
            request.deckComposition,
            request.standsOnSoft17,
            request.bankroll,
            request.minBetSize
        )
    }

    @PostMapping("/test")
    fun getEV(@RequestBody request: StrategyRequest): Double {
        return strategyService.getEV(
            request.deckComposition,
            request.standsOnSoft17,
            request.bankroll,
            request.minBetSize
        )
    }
}