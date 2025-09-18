package com.example.journey_planner;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class RouteService {  

    private Map<String, List<Hotel>> hotelData = new HashMap<>();
    private List<Bus> buses = new ArrayList<>();

    private final ObjectMapper mapper;

    public RouteService(ObjectMapper mapper) {
        this.mapper = mapper;
    }

    @PostConstruct
    public void loadData() {
        try {
            hotelData.put("Bangalore", Arrays.asList(mapper.readValue(new ClassPathResource("bangalore.json").getFile(), Hotel[].class)));
            hotelData.put("Delhi", Arrays.asList(mapper.readValue(new ClassPathResource("delhi.json").getFile(), Hotel[].class)));
            hotelData.put("Chennai", Arrays.asList(mapper.readValue(new ClassPathResource("chennai.json").getFile(), Hotel[].class)));
            hotelData.put("Mumbai", Arrays.asList(mapper.readValue(new ClassPathResource("mumbai.json").getFile(), Hotel[].class)));

            buses = Arrays.asList(mapper.readValue(new ClassPathResource("buses_fare.json").getFile(), Bus[].class));

            System.out.println("Data loaded successfully.");
        } catch (IOException e) {
            e.printStackTrace();
            System.err.println("Error loading JSON files. Check file paths!");
        }
    }

    public Map<String, Object> findCheapOptions(RouteRequest request) {
        Map<String, Object> result = new HashMap<>();

        if (request == null || request.getStartCity() == null || request.getDestinationCity() == null) {
            result.put("hotels", Collections.emptyList());
            result.put("buses", Collections.emptyList());
            result.put("tripDays", 0);
            return result;
        }

        String startCity = capitalize(request.getStartCity());
        String destCity = capitalize(request.getDestinationCity());

        List<Hotel> hotels = hotelData.getOrDefault(destCity, Collections.emptyList());
        List<Hotel> sortedHotels = hotels.stream()
                .filter(h -> h.getPrice() != null && h.getTax() != null)
                .sorted(Comparator.comparingDouble(h -> safeParsePrice(h.getPrice()) + safeParsePrice(h.getTax())))
                .limit(5)
                .collect(Collectors.toList());

        List<Bus> filteredBuses = buses.stream()
                .filter(b -> b.getSource() != null && b.getDestination() != null)
                .filter(b -> b.getSource().equalsIgnoreCase(startCity) && b.getDestination().equalsIgnoreCase(destCity))
                .sorted(Comparator.comparingDouble(Bus::getFarePriceSafe))
                .limit(5)
                .collect(Collectors.toList());

        result.put("hotels", sortedHotels);
        result.put("buses", filteredBuses);
        result.put("tripDays", request.getTripDays());

        System.out.println("Returning " + sortedHotels.size() + " hotels and " + filteredBuses.size() + " buses.");
        return result;
    }

    private String capitalize(String str) {
        if (str == null || str.isEmpty()) return str;
        return str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase();
    }


    private double safeParsePrice(String priceStr) {
        if (priceStr == null || priceStr.isEmpty()) return 0;
        try {
            return Double.parseDouble(priceStr.replace(",", ""));
        } catch (NumberFormatException e) {
            e.printStackTrace();
            return 0;
        }
    }
}
