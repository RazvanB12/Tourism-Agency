from django.urls import re_path
from TourismAgencyApp import views

urlpatterns = [
    re_path(r'destinations$', views.destinationsApi),
    re_path(r'destinations/([0-9]+)$', views.destinationsApi),

    re_path(r'users$', views.usersApi),
    re_path(r'users/([0-9]+)$', views.usersApi),

    re_path(r'^login$', views.loginApi),

    re_path(r'reservations$', views.reservationsApi),
    re_path(r'reservations/([0-9]+)$', views.reservationsApi),

    re_path(r'availability$', views.availabilityApi),
    re_path(r'availability/([0-9]+)$', views.availabilityApi)
]
