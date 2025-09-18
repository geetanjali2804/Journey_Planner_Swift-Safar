package com.example.journey_planner;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trip")
public class TripController {

    @Autowired
    private PlacesService placesService;

    @PostMapping("/less-walking-plan")
    public ResponseEntity<List<Place>> getLessWalkingPlan(@RequestBody TripRequest request) {
        List<Place> plan = placesService.getLessWalkingPlan(
            request.getCity(), request.getDays()
        );
        return ResponseEntity.ok(plan);
    }
}