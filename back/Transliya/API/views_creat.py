from django.forms import ValidationError
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status



from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction
from django.core.exceptions import ValidationError
from rest_framework.authtoken.models import Token



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
        return Response({'token': token.key, 'person': serializer.data}, status=status.HTTP_201_CREATED)
    print(serializer.errors)
    print(request.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def signup_employer(request):
    person_data = request.data.get('person')
    driving_license = request.data.get('driving_license')

    if not person_data or driving_license is None:
        return Response({'error': 'Person data and driving license are required'}, status=status.HTTP_400_BAD_REQUEST)

    # Check if the driving license already exists
    if models.Employer.objects.filter(driving_license=driving_license).exists():
        return Response({'error': 'Driving license already exists'}, status=status.HTTP_400_BAD_REQUEST)

    person_serializer = PersonSerializer(data=person_data)
    if not person_serializer.is_valid():
        return Response(person_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    try:
        # Save the person
        person = person_serializer.save()

        # Create the employer
        employer_data = {
            'id_employer': person.id,
            'driving_license': driving_license
        }
        employer_serializer = EmployerSerializer(data=employer_data)
        if employer_serializer.is_valid():
            employer_serializer.save()
            token = Token.objects.create(user=person)
            return Response({
                                "employer" : employer_serializer.data,
                                "person" : person_serializer.data,
                                'token': token.key,
                                }, status=status.HTTP_201_CREATED)
        else:
            # If employer data is invalid, raise an exception to trigger a rollback
            raise ValueError(employer_serializer.errors)
    except Exception as e:
        # Return the error response if any exception is raised
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)






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

        info = data.get("info", None)
        # Create a new Notify instance
        notification = models.Notify(
            id_from=id_from,
            id_to=id_to,
            id_notification_type=id_notification_type,
            info=info
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
        return Response({'service': serializer.data}, status=status.HTTP_201_CREATED)
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



@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def start_working(request):
    try : 
        employer = get_object_or_404(Employer, id_employer=request.data['id'])
        employer.is_working = True
        employer.save()
        return Response(status=status.HTTP_200_OK)
    except Exception as e :
        if DEBUG:
            return Response({"error": f"{e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def stop_working(request):
    try : 
        employer = get_object_or_404(Employer, id_employer=request.data['id'])
        employer.is_working = False
        employer.save()
        return Response(status=status.HTTP_200_OK)
    except Exception as e :
        if DEBUG:
            return Response({"error": f"{e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)





@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_tawsila(request: Request): 
    serializer = TewsilaSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        print(serializer.data)
        return Response({'Tawsila': serializer.data}, status=status.HTTP_201_CREATED)
    print(serializer)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def add_ta9yym_to_tewsila(request: Request):
    ta9yym = request.data.get("ta9yym", 7)
    comment = request.data.get("comment", "W0W")
    id_tawsila = request.data.get('id')

    if not id_tawsila:
        return Response({'error': 'id_Tewsila is required'}, status=status.HTTP_400_BAD_REQUEST)

    tawsila = get_object_or_404(models.Tewsila, id_Tewsila=id_tawsila)

    if ta9yym is not None:
        tawsila.ta9yim_Tewsila = ta9yym

    if comment is not None:
        tawsila.comment_Tewsila = comment

    tawsila.save()

    serializer = TewsilaSerializer(tawsila)
    return Response({'Tawsila': serializer.data}, status=status.HTTP_200_OK)


@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_kerya(request: Request): 
    serializer = KeryaSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        print(serializer.data)
        return Response({'Tawsila': serializer.data}, status=status.HTTP_201_CREATED)
    print(serializer)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def add_ta9yym_to_kerya(request: Request):
    ta9yym = request.data.get("ta9yym", 7)
    comment = request.data.get("comment", "W0W")
    id_kerya = request.data.get('id')

    if not id_kerya:
        return Response({'error': 'id_Tewsila is required'}, status=status.HTTP_400_BAD_REQUEST)

    kerya = get_object_or_404(models.Kerya, id_Kerya=id_kerya)

    if ta9yym is not None:
        kerya.ta9yim_Kerya = ta9yym

    if comment is not None:
        kerya.comment_Kerya = comment

    kerya.save()

    serializer = KeryaSerializer(kerya)
    return Response({'Tawsila': serializer.data}, status=status.HTTP_200_OK)


@api_view(['POST'])
def add_to_is_abonner(request):
    try:
        # Retrieve the person object using the provided ID
        person = get_object_or_404(models.Person, id=request.data['id'])

        # Create a new isAbonner instance
        is_abonner_instance = models.isAbonner(is_zaboun=person)
        
        # Save the instance to the database
        is_abonner_instance.save()

        # Return a success response
        return Response({"message": "Person added to isAbonner successfully."}, status=status.HTTP_201_CREATED)

    except KeyError:
        # Handle the case where 'id' is not provided in the request data
        return Response({"error": "ID not provided in request data."}, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        # Handle any other exceptions
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
@api_view(['POST'])
def is_person_in_abonner(request):
    try:
        # Retrieve the person object using the provided ID
        person_id = request.data.get('id')
        if not person_id:
            return Response({"error": "ID not provided in request data."}, status=status.HTTP_400_BAD_REQUEST)
        
        person = get_object_or_404(models.Person, id=person_id)
        
        # Check if there is any isAbonner instance associated with this person
        is_abonner_exists = models.isAbonner.objects.filter(is_zaboun=person).exists()

        # Return a JSON response with the boolean result
        return Response({"is_abonner": is_abonner_exists}, status=status.HTTP_200_OK)

    except Exception as e:
        # Handle any other exceptions
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)