
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q , F 
from .models import Person
from .serializers import FullPersonSerializer
from django.shortcuts import get_object_or_404

from django.contrib.auth.models import User

from API.models import Employer, Person

from rest_framework.authtoken.models import Token

from .serializers import EmpoyerSerializer, UserSerializer , PersonSerializer


from API.views_creat import * 
from API.views_pdf import * 

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

@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def search_by_name(request):
    name_filter = request.data.get('name', "")
    car_id_filter = request.data.get('cars_type_id', [])
    cars = models.CarEmployer.objects.filter(id_car_type__in=car_id_filter)
    cars = cars.select_related('id_employer')
    print(len(cars))
    cars = cars.filter(
            Q(id_employer__id_employer__username__icontains=name_filter) |
            Q(id_employer__id_employer__first_name__icontains=name_filter) |
            Q(id_employer__id_employer__last_name__icontains=name_filter)
            )
    print(len(cars))
    # Assuming CarEmployerEmployerSerializer is a serializer combining CarEmployer and Employer data
    serializer = CarEmployerrEmployerPersonSerializerSerializer(cars, many=True)
    
    response_data = {
        "cars_with_employer_info": serializer.data,
    }
    
    # Return the serialized data in the response
    return Response(serializer.data)
    # Fetching filters from request data
    name_filter = request.data.get('name')
    car_id_filter = request.data.get('cars_type_id')
    car_id_filter = request.data.get('cars_type_id', [])  # Assuming 'cars_type_id' is a list in the POST data
    cars = models.CarEmployer.objects.filter(id_car_type__in=car_id_filter)
    cars_with_employer_info = cars.select_related('id_employer')  # This performs a JOIN on id_employer
    serializer = CarEmployerrEmployerSerializer(cars_with_employer_info, many=True)
    
    response_data = {
        "WOW": serializer.data,
        "additional_info": "This is additional information you want to include."
    }
    return Response(response_data)
    queryset = Person.objects.filter(
        Q(username__icontains=name_filter) |
        Q(first_name__icontains=name_filter) |
        Q(last_name__icontains=name_filter)
    ).filter(
        employer__car=F('id')
        )
    
    for obj in queryset:
        print(obj.__dict__)
        return Response(obj.__dict__)
    # Serialize the queryset using FullPersonSerializer
    serializer = FullPersonSerializer(queryset, many=True)

    # Return the serialized data in the response
    return Response(serializer.data)


@api_view(['GET'])
def get_all_car_type(request:Request):
    car_type = models.CarType.objects.all()
    car_type_serializer = CarTypeSerializer(car_type, many=True)
    return Response({"car_type" : car_type_serializer.data} , status=status.HTTP_200_OK)





@api_view(['GET'])
def get_my_cars(request):
    id_ = request.query_params.get('id')
    if not id_:
        return Response({"error": "ID parameter is required"}, status=status.HTTP_400_BAD_REQUEST)
    
    employer = get_object_or_404(models.Employer, id_employer=id_)
    cars = models.CarEmployer.objects.filter(id_employer=employer)
    cars_serializer = CarEmployerSerializer(cars, many=True)
    return Response({"cars": cars_serializer.data}, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_my_img(request:Request):
    matricule = request.data.get('matricule')
    car = get_object_or_404(models.CarEmployer, matricule_car=matricule)
    cars_serializer = CarEmployerSerializer(car)
    return Response({"cars" : cars_serializer.data} , status=status.HTTP_200_OK)



class CarEmployerCreateView(APIView):
    def post(self, request, *args, **kwargs):
        print(request.data)
        print(request.data["image"])
        serializer = CarEmployerSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


 


 
