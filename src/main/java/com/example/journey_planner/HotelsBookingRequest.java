package com.example.journey_planner;

public class HotelsBookingRequest {
    private String userEmail;
    private Long hotelId;
    private int days;

    // getters & setters
    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }

    public Long getHotelId() { return hotelId; }
    public void setHotelId(Long hotelId) { this.hotelId = hotelId; }

    public int getDays() { return days; }
    public void setDays(int days) { this.days = days; }
}
