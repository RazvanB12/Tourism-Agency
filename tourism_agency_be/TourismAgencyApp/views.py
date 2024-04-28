from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser 
from django.http.response import JsonResponse
from django.db.models import Q, Count

from TourismAgencyApp.models import Destinations, Users, Reservations
from TourismAgencyApp.serializers import DestinationSerializer, UserSerializer, ReservationSerializer
from django.core.exceptions import ObjectDoesNotExist

import jwt
from datetime import datetime, timedelta
from django.conf import settings

# Create your views here.

@csrf_exempt
def destinationsApi(request,id=0):
    access_role, expiration_string = decodeToken(request)
    expiration_date = datetime.strptime(expiration_string, "%Y-%m-%dT%H:%M:%SZ")

    if request.method=='GET':
        access = checkAllRoles(access_role, expiration_date)
        if access:
            return access
        if id=='0':
            destinations = Destinations.objects.all()
            destinations_serializer = DestinationSerializer(destinations,many=True)
            return JsonResponse(destinations_serializer.data,safe=False)
        else:
            try:
                destination = Destinations.objects.get(id=id)
                destinations_serializer = DestinationSerializer(destination,many=False)
                return JsonResponse(destinations_serializer.data, safe=False)
            except ObjectDoesNotExist:
                return JsonResponse({'error': 'Destination ' + id + ' Not Found'}, status=404)
    
    elif request.method=='POST':
        access = checkAgentRole(access_role, expiration_date)
        if access:
            return access
        destination_data=JSONParser().parse(request)
        destination_serializer=DestinationSerializer(data=destination_data)
        if destination_serializer.is_valid():
            destination_serializer.save()
            return JsonResponse('Destination added successfully',safe=False)
        return JsonResponse('Fail to add destination',safe=False)
    
    elif request.method=='PUT':
        access = checkAgentRole(access_role, expiration_date)
        if access:
            return access
        try:
            destination_data=JSONParser().parse(request)
            destination=Destinations.objects.get(id=id)
            destination_serializer=DestinationSerializer(destination,data=destination_data)
            if destination_serializer.is_valid():
                destination_serializer.save()
                return JsonResponse('Destination updated successfully',safe=False)
            return JsonResponse('Fail to update destination',safe=False)
        except ObjectDoesNotExist:
            return JsonResponse({'error': 'Destination ' + id +' Not Found'}, status=404)
    
    elif request.method=='DELETE':
        access = checkAgentRole(access_role, expiration_date)
        if access:
            return access
        try:
            destination=Destinations.objects.get(id=id)
            destination.delete()
            return JsonResponse('Destination deleted successfully',safe=False)
        except ObjectDoesNotExist:
            return JsonResponse({'error': 'Destination ' + id +' Not Found'}, status=404)
        
        
@csrf_exempt
def usersApi(request, id=0):
    if request.method == 'GET':
        if id == '0':
            users = Users.objects.all()
            users_serializer = UserSerializer(users, many=True)
            return JsonResponse(users_serializer.data, safe=False)
        else:
            try:
                user = Users.objects.get(id=id)
                user_serializer = UserSerializer(user, many=False)
                return JsonResponse(user_serializer.data, safe=False)
            except ObjectDoesNotExist:
                return JsonResponse({'error': 'User ' + id + ' Not Found'}, status=404)
    
    elif request.method == 'POST':
        user_data = JSONParser().parse(request)
        user_serializer = UserSerializer(data=user_data)
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse('User added successfully', safe=False)
        return JsonResponse('Fail to add user', safe=False)
    
    elif request.method == 'PUT':
        try:
            user_data = JSONParser().parse(request)
            user = Users.objects.get(id=id)
            user_serializer = UserSerializer(user, data=user_data)
            if user_serializer.is_valid():
                user_serializer.save()
                return JsonResponse('User updated successfully', safe=False)
            return JsonResponse('Fail to update user', safe                          =False)
        except ObjectDoesNotExist:
            return JsonResponse({'error': 'User ' + id + ' Not Found'}, status=404)
    
    elif request.method == 'DELETE':
        try:
            user = Users.objects.get(id=id)
            user.delete()
            return JsonResponse('User deleted successfully', safe=False)
        except ObjectDoesNotExist:
            return JsonResponse({'error': 'User ' + id + ' Not Found'}, status=404)
        
@csrf_exempt
def loginApi(request):
    if request.method == 'POST':
        user_data = JSONParser().parse(request)
        try:
            user = Users.objects.get(email=user_data.get('email'))
            if (user_data.get('password') != user.password):
                return JsonResponse({'error': 'User ' + user_data.get('email') + ' Not Found'}, status=404)
            token = generateToken(user.role)
            return JsonResponse({'token': token, 'role': user.role, 'id': user.id}, status = 200)
        except ObjectDoesNotExist:
            return JsonResponse({'error': 'Not Found'}, status=404)
        

def generateToken(role):
    time = datetime.utcnow() + timedelta(hours=6)
    expiration = time.strftime("%Y-%m-%dT%H:%M:%SZ")
    payload = {
        "role": role,
        "expiration": expiration 
    }
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")
    return token


def getToken(request):
    auth_header = request.headers.get('Authorization')
    if auth_header and auth_header.startswith('Bearer '):
        token = auth_header.split(' ')[1]
        return token
    return None


def decodeToken(request):
    token = getToken(request)
    if token is None:
        return None
    token = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
    role = token.get('role')
    expiration = token.get('expiration')
    return role, expiration

def checkAgentRole(role, expiration):
    if role != 'AGENT' or expiration < datetime.utcnow():
        return JsonResponse({"error": "Forbidden Access"}, status=403)
    
    
def checkClientRole(role, expiration):
    if role != 'CLIENT' or expiration < datetime.utcnow():
        return JsonResponse({"error": "Forbidden Access"}, status=403)


def checkAllRoles(role, expiration):
    if (role != 'AGENT' and role != 'CLIENT') or expiration < datetime.utcnow():
        return JsonResponse({"error": "Forbidden Access"}, status=403)
    

@csrf_exempt
def reservationsApi(request, id=0):
    access_role, expiration_string = decodeToken(request)
    expiration_date = datetime.strptime(expiration_string, "%Y-%m-%dT%H:%M:%SZ")

    if request.method == 'GET':
        access = checkAllRoles(access_role, expiration_date)
        if access:
            return access
        if id == '0':
            reservations = Reservations.objects.all()
            reservations_serializer = ReservationSerializer(reservations, many=True)
            return JsonResponse(reservations_serializer.data, safe=False)
        else:
            reservations = Reservations.objects.all().filter(destinationId=id).order_by('startDate')
            reservations_serializer = ReservationSerializer(reservations, many=True)
            return JsonResponse(reservations_serializer.data, safe=False)

    elif request.method == 'POST':
        access = checkAllRoles(access_role, expiration_date)
        if access:
            return access
        reservation_data = JSONParser().parse(request)
        
        start_date = datetime.strptime(reservation_data['startDate'], "%m/%d/%Y").date()
        end_date = datetime.strptime(reservation_data['endDate'], "%m/%d/%Y").date()

        if start_date >= end_date:
            return JsonResponse({"error": "Invalid period"}, status=400)
        
        reservation_data['startDate'] = start_date
        reservation_data['endDate'] = end_date
        
        reservation_serializer = ReservationSerializer(data=reservation_data)
        if reservation_serializer.is_valid():
            reservation_serializer.save()
            return JsonResponse('Reservation added successfully', safe=False)
        return JsonResponse('Fail to add reservation', safe=False)

    elif request.method == 'DELETE':
        access = checkAllRoles(access_role, expiration_date)
        if access:
            return access
        try:
            reservation = Reservations.objects.get(id=id)
            reservation.delete()
            return JsonResponse('Reservation deleted successfully', safe=False)
        except ObjectDoesNotExist:
            return JsonResponse({'error': 'Reservation ' + id + ' Not Found'}, status=404)


@csrf_exempt
def availabilityApi(request, id=0):
    access_role, expiration_string = decodeToken(request)
    expiration_date = datetime.strptime(expiration_string, "%Y-%m-%dT%H:%M:%SZ")
    response_data = []

    if request.method == 'GET':
        access = checkAgentRole(access_role, expiration_date)
        if access:
            return access
        
        for month in range(1, 13):
            reservations_count = Reservations.objects.filter(
                Q(destinationId=id) & (Q(startDate__month=month) | Q(endDate__month=month))
            ).count()
            response_data.append({'month': month, 'reservations': reservations_count})

        return JsonResponse(response_data, safe=False)
        

    elif request.method == 'POST':
        access = checkAllRoles(access_role, expiration_date)
        if access:
            return access

        reservation_data = JSONParser().parse(request)
        start_date = datetime.strptime(reservation_data.get('startDate', ''), "%m/%d/%Y").date()
        end_date = datetime.strptime(reservation_data.get('endDate', ''), "%m/%d/%Y").date()

        all_destinations = Destinations.objects.values_list('id', flat=True).distinct()
        for destination_id in all_destinations:
            reservations_overlap = Reservations.objects.filter(
                destinationId=destination_id,
                startDate__lte=end_date,
                endDate__gte=start_date
            ).exists()
            response_data.append({'destinationId': destination_id, 'available': not reservations_overlap})

        return JsonResponse(response_data, safe=False)