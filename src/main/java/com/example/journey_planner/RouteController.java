package com.example.journey_planner;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/routes")
@CrossOrigin(origins = "*") 
public class RouteController {

    @Autowired
    private RouteService routeService;

    @PostMapping("/cheap-options")
    public Map<String, Object> getCheapOptions(@RequestBody RouteRequest request) {
        return routeService.findCheapOptions(request);
    }
}
