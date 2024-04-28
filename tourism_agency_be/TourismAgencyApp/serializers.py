from rest_framework import serializers
from TourismAgencyApp.models import Destinations, Users, Reservations


class DestinationSerializer(serializers.ModelSerializer):
    class Meta:
        model=Destinations
        fields=('id', 'title', 'description', 'location', 'price', 'numberOfPersons', 'sale')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=Users
        fields=('id', 'firstName', 'lastName', 'email', 'password', 'role')


class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model=Reservations
        fields=('id', 'userId', 'destinationId', 'startDate', 'endDate', 'price')