











from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status

from django.shortcuts import get_object_or_404

from django.contrib.auth.models import User

from API import utile
from API.models import Employer, Person

from rest_framework.authtoken.models import Token

from .serializers import EmpoyerSerializer, UserSerializer , PersonSerializer
from API.views_creat import * 
@api_view(['POST'])
def login(request):
    #  TODO : PHONE NUMBER
    user = get_object_or_404(Person, username=request.data['username'])
    if not user.check_password(request.data['password']):
        return Response("missing user", status=status.HTTP_404_NOT_FOUND)
    token, created = Token.objects.get_or_create(user=user)
    serializer = PersonSerializer(user)
    return Response({'token': token.key, 'user': serializer.data})

@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request:Request):
    print("request")
    print("request")
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
    id_person = person_serializer.data['id']
    employer = Employer.objects.get(id_employer=id_person) 
    try:
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
    employer = Employer.objects.filter(id_employer=id).values()
@permission_classes([IsAuthenticated])
def get_persons_services(request: Request):
    # Convert the QuerySet to a list
    employer_list = list(employer)
    # Return the list as JSON response
    return JsonResponse(employer_list, safe=False)