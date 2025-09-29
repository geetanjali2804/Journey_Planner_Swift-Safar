package com.example.journey_planner;

public class RouteRequest {
    private String source;
    private String destination;
    private int days;

    // Getters and setters
    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }

    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }

    public int getDays() { return days; }
    public void setDays(int days) { this.days = days; }
}
