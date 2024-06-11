from rest_framework import serializers
from django.contrib.auth.models import User
import API.models  as models 
class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = models.User 
        fields = ['id', 'username', 'password', 'email']
        
class PersonSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = models.Person
        fields = '__all__'
        
        
class EmpoyerSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = models.Employer
        fields = '__all__'

class CarTypeSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = models.CarType
        fields = '__all__'


class ServiceSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = models.Service
        fields = '__all__'

class CarEmployerSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = models.CarEmployer
        fields = '__all__'
        
        
        
class TewsilaSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = models.Tewsila
        fields = '__all__'
class CarServiceSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = models.CarService
        fields = '__all__'


class KeryaSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = models.Kerya
        fields = '__all__'

class NotificationTypeSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = models.NotificationType
        fields = '__all__'
class NotifySerializer(serializers.ModelSerializer):
    class Meta(object):
        model = models.Notify 
        fields = '__all__'