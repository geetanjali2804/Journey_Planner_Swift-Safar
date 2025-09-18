package com.example.journey_planner;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.io.InputStream;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class PlacesService {

    private List<Place> allPlaces = new ArrayList<>();

    @PostConstruct
    public void loadPlaces() {
        try {
            ObjectMapper mapper = new ObjectMapper();
            InputStream is = getClass().getResourceAsStream("/places.json");
            allPlaces = mapper.readValue(is, new TypeReference<List<Place>>() {});
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public List<Place> getLessWalkingPlan(String city, int days) {
    List<Place> cityPlaces = allPlaces.stream()
        .filter(p -> p.getCity().equalsIgnoreCase(city))
        .collect(Collectors.toList());

    if (cityPlaces.isEmpty()) return Collections.emptyList();

    Place[] current = new Place[1];
    current[0] = cityPlaces.get(0);

    List<Place> plan = new ArrayList<>();
    Set<Place> visited = new HashSet<>();
    plan.add(current[0]);
    visited.add(current[0]);

    for (int i = 1; i < Math.min(days, cityPlaces.size()); i++) {
        Place next = cityPlaces.stream()
            .filter(p -> !visited.contains(p))
            .min(Comparator.comparingDouble(p -> distance(current[0], p)))
            .orElse(null);

        if (next == null) break; 

        plan.add(next);
        visited.add(next);
        current[0] = next;  
    }

    return plan;
}

    private double distance(Place a, Place b) {
        double R = 6371;
        double dLat = Math.toRadians(b.getLatitude() - a.getLatitude());
        double dLon = Math.toRadians(b.getLongitude() - a.getLongitude());
        double lat1 = Math.toRadians(a.getLatitude());
        double lat2 = Math.toRadians(b.getLatitude());
        double aVal = Math.sin(dLat/2) * Math.sin(dLat/2) +
                      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
        double c = 2 * Math.atan2(Math.sqrt(aVal), Math.sqrt(1-aVal));
        return R * c;
    }
}