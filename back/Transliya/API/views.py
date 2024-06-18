
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

from .serializers import EmpoyerSerializer, UserSerializer , PersonSerializer

from API.views_creat import * 

@api_view(['POST'])
def login(request):
    #  TODO : PHONE NUMBER
    user = get_object_or_404(Person, email=request.data['email'])
    if not user.check_password(request.data['password']):
        return Response("missing user", status=status.HTTP_404_NOT_FOUND)
    token, created = Token.objects.get_or_create(user=user)
    serializer = PersonSerializer(user)
    return Response({'token': token.key, 'user': serializer.data})

    # #  TODO : send the Employer
    # person_serializer = PersonSerializer(person)
    try:
        id_person = serializer.data
        employer = models.Employer.objects.get(id_employer=id_person) 
        employer_serializer = EmpoyerSerializer(employer)
    except:
        return Response({'token': token.key, 'user': serializer.data})
        # return Response({
        #     'person': person_serializer.data ,
        #              } , status=status.HTTP_200_OK)
    
    
    return Response({
        'person': person_serializer.data ,
        "Employer":  employer_serializer.data 
                     } , status=status.HTTP_200_OK)




@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request:Request):
    print("request")
    print("request")
    print(request.data)
    return Response({"data":request.data } , status=status.HTTP_200_OK)

@api_view(['POST'])
def test_end_point(request:Request):
    print(request.data)
    return Response({"data":request.data } , status=status.HTTP_200_OK)



@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_person(request:Request):
    print("request")
    if "phonenumberp" in request.data:
        person = get_object_or_404(Person, phonenumberp=request.data['phonenumberp'])
    elif "email" in request.data:
        person = get_object_or_404(Person, email=request.data['email'])
    else:
        return Response({"error":"you must enter one of  (phonenumber, email)" } , status=status.HTTP_400_BAD_REQUEST)
    
    person_serializer = PersonSerializer(person)
    try:
        id_person = person_serializer.data['id']
        employer = Employer.objects.get(id_employer=id_person) 
        employer_serializer = EmpoyerSerializer(employer)
    except:
        return Response({
            'person': person_serializer.data ,
                     } , status=status.HTTP_200_OK)
    
    
    return Response({
        'person': person_serializer.data ,
        "Employer":  employer_serializer.data 
                     } , status=status.HTTP_200_OK)



@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_persons_services(request: Request):
    employer = Employer.objects.filter(id_employer=id).values()
    # Convert the QuerySet to a list
    employer_list = list(employer)
    # Return the list as JSON response
    return JsonResponse(employer_list, safe=False)



@api_view(['GET'])
def get_my_notification(request: Request):
    try : 
        notifications = models.Notify.objects.filter(id_to=request.data['id']).select_related('id_notification_type')
        serializer = NotifySerializer(notifications, many=True)
        return Response({"notification" : serializer.data} , status=status.HTTP_200_OK)
    except Exception as e : 
        if DEBUG:
            return Response({"error": f"{e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def search_by_name(request):
    
    # Fetching filters from request data
    name_filter = request.data.get('name')
    car_id_filter = request.data.get('cars_type_id')

    # Filtering persons based on the given name and car ID
    persons_username = Person.objects.filter(
        username__icontains=name_filter,
        employer__caremployer__id_type_car__in=car_id_filter
    )
    persons_first_name = Person.objects.filter(
        first_name__icontains=name_filter,
        employer__caremployer__id_type_car__in=car_id_filter
    )
    persons_last_name = Person.objects.filter(
        last_name__icontains=name_filter,
        employer__caremployer__id_type_car__in=car_id_filter
    )

    # Serializing the filtered querysets
    serializer_first_name = FullPersonSerializer(persons_first_name, many=True)
    serializer_last_name = FullPersonSerializer(persons_last_name, many=True)
    serializer_username = FullPersonSerializer(persons_username, many=True)
    
    # Filter the serialized data to include only specific fields
    def filter_fields(data, fields):
        return [{field: item[field] for field in fields} for item in data]

    fields_to_include = ['id', 'username', 'first_name', 'last_name', 'phonenumberp']
    
    result_first_name = filter_fields(serializer_first_name.data, fields_to_include)
    result_last_name = filter_fields(serializer_last_name.data, fields_to_include)
    result_username = filter_fields(serializer_username.data, fields_to_include)
    
    # Combining the filtered serialized data
    result = result_first_name + result_last_name + result_username
    
    return Response({"result": result}, status=status.HTTP_200_OK)
    return Response({"result": result['id' , 'username', 'first_name', 'last_name' , 'phonenumberp' ] }, status=status.HTTP_200_OK)






@api_view(['GET'])
def get_all_car_type(request:Request):
    car_type = models.CarType.objects.all()
    car_type_serializer = CarTypeSerializer(car_type, many=True)
    return Response({"car_type" : car_type_serializer.data} , status=status.HTTP_200_OK)





@api_view(['GET'])
def get_my_cars(request:Request):
    id_ = request.data.get('id')
    employer = get_object_or_404(models.Employer, id_employer=id_)
    cars = models.CarEmployer.objects.filter(id_employer=employer)
    cars_serializer = CarEmployerSerializer(cars, many=True)
    return Response({"cars" : cars_serializer.data} , status=status.HTTP_200_OK)









 