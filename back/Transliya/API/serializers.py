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
        

class NotifySerializer(serializers.ModelSerializer):
    id_notification_type = serializers.IntegerField(source='id_notification_type.id_notification_type')
    name_notification_type = serializers.CharField(source='id_notification_type.name_notification_type')

    class Meta:
        model = models.Notify
        fields = [
            'id_notify',
            'id_from',
            'id_to',
            'id_notification_type',
            'name_notification_type',
            'time',
            'is_readed'
        ]