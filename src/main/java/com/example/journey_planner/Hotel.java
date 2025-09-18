package com.example.journey_planner;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true) // Ignore any extra fields not mapped here
public class Hotel {

     @JsonProperty("Hotel Name")
        private String hotelName;

        @JsonProperty("Rating")
        private double rating;

        @JsonProperty("Rating Description")
        private String ratingDescription;

        @JsonProperty("Price")
        private String price;

        @JsonProperty("Tax")
        private String tax;

        // getters
        public String getHotelName() { return hotelName; }
        public double getRating() { return rating; }
        public String getRatingDescription() { return ratingDescription; }
        public String getPrice() { return price; }
        public String getTax() { return tax; }
    }

