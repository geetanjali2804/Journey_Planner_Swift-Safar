package com.example.journey_planner;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CheapRouteService {

    @Autowired
    private BusRepository busRepository;

    @Autowired
    private HotelRepository hotelRepository;

    public Map<String, Object> getCheapestTrip(String fromCity, String toCity, LocalDate travelDate, int days) {
        // Find all buses for the route on that date
        List<Bus> buses = busRepository.findBySourceIgnoreCaseAndDestinationIgnoreCaseAndTravelDate(fromCity, toCity, travelDate);
        if (buses.isEmpty()) return null;

        Bus cheapestBus = buses.stream().min(Comparator.comparingDouble(Bus::getFare)).orElse(null);

        // Find all hotels in destination
        List<Hotel> hotels = hotelRepository.findByCityIgnoreCase(toCity);
        if (hotels.isEmpty()) return null;

        Hotel cheapestHotel = hotels.stream().min(Comparator.comparingDouble(Hotel::getPricePerNight)).orElse(null);

        // Total cost
        double totalCost = cheapestBus.getFare() + (cheapestHotel.getPricePerNight() * days);

        Map<String, Object> result = new HashMap<>();
        result.put("bus", cheapestBus);
        result.put("hotel", cheapestHotel);
        result.put("totalCost", totalCost);

        return result;
    }
}
