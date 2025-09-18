package com.example.journey_planner;

import com.fasterxml.jackson.annotation.JsonProperty;

public class RouteRequest {

    @JsonProperty("fromCity")
    private String startCity;

    @JsonProperty("toCity")
    private String destinationCity;

    @JsonProperty("days")
    private int tripDays;

    private String startDate;
    private String endDate;

    // Getters and setters

    public String getStartCity() {
        return startCity;
    }

    public void setStartCity(String startCity) {
        this.startCity = startCity;
    }

    public String getDestinationCity() {
        return destinationCity;
    }

    public void setDestinationCity(String destinationCity) {
        this.destinationCity = destinationCity;
    }

    public int getTripDays() {
        return tripDays;
    }

    public void setTripDays(int tripDays) {
        this.tripDays = tripDays;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }
}
