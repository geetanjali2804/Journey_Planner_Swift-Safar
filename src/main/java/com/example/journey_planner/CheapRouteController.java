package com.example.journey_planner;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/api/trips")
public class CheapRouteController {

    @Autowired
    private CheapRouteService tripService;

    @GetMapping("/cheapest")
    public Map<String, Object> getCheapestTrip(
            @RequestParam String fromCity,
            @RequestParam String toCity,
            @RequestParam String travelDate,
            @RequestParam int days
    ) {
        LocalDate date = LocalDate.parse(travelDate);
        Map<String, Object> result = tripService.getCheapestTrip(fromCity, toCity, date, days);
        if (result == null) throw new RuntimeException("No trip found for given cities or date");
        return result;
    }
}
