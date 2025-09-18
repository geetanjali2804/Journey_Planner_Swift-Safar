package com.example.journey_planner;

public class TripRequest {
    private String city;
    private int days;

    public TripRequest() {}

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public int getDays() {
        return days;
    }

    public void setDays(int days) {
        this.days = days;
    }
}