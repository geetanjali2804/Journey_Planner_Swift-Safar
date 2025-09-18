package com.example.journey_planner;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true) // Ignore any extra fields not mapped here
public class Bus {

    @JsonProperty("Agency")
        private String agency;

        @JsonProperty("Source")
        private String source;

        @JsonProperty("Destination")
        private String destination;

        @JsonProperty("Bus Type")
        private String busType;

        @JsonProperty("Fare Price (INR)")
        private Double farePrice;

        @JsonProperty("Duration (hours)")
        private Double duration;

        // Safe getter
        public double getFarePriceSafe() {
            return farePrice != null ? farePrice : Double.MAX_VALUE;
        }

        // getters
        public String getAgency() { return agency; }
        public String getSource() { return source; }
        public String getDestination() { return destination; }
        public String getBusType() { return busType; }
        public double getDuration() { return duration != null ? duration : 0; }
}
