package com.example.journey_planner;
import com.example.journey_planner.TripRequest;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;


class TripRequestTest {

    @Test
    void testSettersAndGetters() {
        TripRequest tripRequest = new TripRequest();

        // You can use any sample value here
        String testCity = "Bangalore";
        int testDays = 5;

        // Set values
        tripRequest.setCity(testCity);
        tripRequest.setDays(testDays);

        // Verify values using getters
        assertEquals(testCity, tripRequest.getCity());
        assertEquals(testDays, tripRequest.getDays());
    }

    @Test
    void testDefaultValues() {
        TripRequest tripRequest = new TripRequest();

        // Ensure default constructor sets default values
        assertNull(tripRequest.getCity());
        assertEquals(0, tripRequest.getDays());
    }
}
