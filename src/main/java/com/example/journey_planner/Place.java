package com.example.journey_planner;

import java.util.Objects;

public class Place {
    private String state;
    private String city;
    private String popular_destination;
    private double latitude;
    private double longitude;
    private String interest;
    private double google_rating;
    private double price_fare;

    public Place() {}

    public String getState() {
        return state;
    }
    public void setState(String state) {
        this.state = state;
    }

    public String getCity() {
        return city;
    }
    public void setCity(String city) {
        this.city = city;
    }

    public String getPopular_destination() {
        return popular_destination;
    }
    public void setPopular_destination(String popular_destination) {
        this.popular_destination = popular_destination;
    }

    public double getLatitude() {
        return latitude;
    }
    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }
    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public String getInterest() {
        return interest;
    }
    public void setInterest(String interest) {
        this.interest = interest;
    }

    public double getGoogle_rating() {
        return google_rating;
    }
    public void setGoogle_rating(double google_rating) {
        this.google_rating = google_rating;
    }

    public double getPrice_fare() {
        return price_fare;
    }
    public void setPrice_fare(double price_fare) {
        this.price_fare = price_fare;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Place)) return false;
        Place place = (Place) o;
        return Double.compare(place.latitude, latitude) == 0 &&
               Double.compare(place.longitude, longitude) == 0 &&
               Objects.equals(city, place.city) &&
               Objects.equals(popular_destination, place.popular_destination);
    }

    @Override
    public int hashCode() {
        return Objects.hash(city, popular_destination, latitude, longitude);
    }
}
