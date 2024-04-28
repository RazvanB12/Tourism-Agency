from django.db import models

# Create your models here.

class Destinations(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    price = models.IntegerField()
    numberOfPersons = models.IntegerField()
    sale = models.IntegerField()


class Users(models.Model):
    id = models.AutoField(primary_key=True)
    firstName = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    role = models.CharField(max_length=100)


class Reservations(models.Model):
    id = models.AutoField(primary_key=True)
    userId = models.IntegerField()
    destinationId = models.IntegerField()
    startDate = models.DateField()
    endDate = models.DateField()
    price = models.IntegerField()