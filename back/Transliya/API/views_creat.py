from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status

from django.shortcuts import get_object_or_404

from django.contrib.auth.models import User

from API.models import Employer, Person

from rest_framework.authtoken.models import Token

from API.serializers  import * 

import API.models as models


DEBUG = True


@api_view(['POST'])
def signup(request):
    serializer = PersonSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        person = models.Person.objects.get(username=request.data['username'])
        person.set_password(request.data['password'])
        person.save()
        token = Token.objects.create(user=person)
        return Response({'token': token.key, 'person': serializer.data})
    return Response(serializer.errors, status=status.HTTP_200_OK)



@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_employer(request):

    def get_object(request):
        if "phonenumberp" in request.data:
            return get_object_or_404(Person, phonenumberp=request.data['phonenumberp'])
        elif "email" in request.data:
            return get_object_or_404(Person, email=request.data['email'])
        elif "id" in request.data:
            return get_object_or_404(Person, id=request.data['id'])
        else:
            return Response({"error":"you must enter one of  (phonenumber, email, id)" } , status=status.HTTP_400_BAD_REQUEST)
    employer = models.Employer(
        id_employer=get_object(request),
        driving_license=request.data['driving_license']
    )
    employer.save()
    return Response(status=status.HTTP_201_CREATED)



# ? TODO : test this shit
# ? TODO : and auth0 shit
@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_notification(request: Request):
    data = request.data
    
    try:
        # Retrieve related objects using get_object_or_404
        id_from = get_object_or_404(models.Person, id=data['id_from'])
        id_to = get_object_or_404(models.Person, id=data['id_to'])
        id_notification_type = get_object_or_404(models.NotificationType, id_notification_type=data['id_notification_type'])

        # Create a new Notify instance
        notification = models.Notify(
            id_from=id_from,
            id_to=id_to,
            id_notification_type=id_notification_type
        )
        notification.save()

        # Return a success response
        return Response({"success": "Notification created successfully"}, status=status.HTTP_201_CREATED)
    except KeyError as e:
        return Response({"error": f"Missing key: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def mark_as_readed(request):
    
    
    try : 
        data = request.data
        
        # Check for required parameters

        if not ("id_notification" in data): 
            return Response({"error": "you must enter (id_notification)"}, status=status.HTTP_400_BAD_REQUEST)
        
        id_person = data["id_person"]
        id_notification = data["id_notification"]
        
        try:
            # Retrieve the notification
            notification = models.Notify.objects.get(id_notify=id_notification, id_to=id_person)
        except models.Notify.DoesNotExist:
            return Response({"error": "Notification not found"}, status=status.HTTP_404_NOT_FOUND)
        
        # Update the is_readed field
        notification.is_readed = True
        notification.save()
        
        return Response({"success": "Notification marked as read"}, status=status.HTTP_200_OK)
    except Exception as e : 
        if DEBUG:
            return Response({"error": f"{e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
# FIXME : THIS JUST FOR THE ADMIN 




@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_service(request):
    serializer = ServiceSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'service': serializer.data}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_car_type(request):
    car_type = models.CarType(
        name_car_type=request.data['name_car_type'],
        Kerya_prix_car_type=request.data['Kerya_prix_car_type'],
        Tewsila_prix_car_type=request.data['Tewsila_prix_car_type']
    )
    car_type.save()
    return Response(status=status.HTTP_201_CREATED)


@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_caremployer(request):
    serializer = CarEmployerSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'CarEmployer': serializer.data}, status=status.HTTP_201_CREATED )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_carservice(request):
    serializer = CarEmployerSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'CarEmployer': serializer.data}, status=status.HTTP_201_CREATED )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_notificationtype(request):
    serializer = NotificationTypeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'NotificationType': serializer.data}, status=status.HTTP_201_CREATED )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
