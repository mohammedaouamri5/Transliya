from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Person
class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User 
        fields = ['id', 'username', 'password', 'email']
        
class PersonSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = Person
        fields = '__all__'