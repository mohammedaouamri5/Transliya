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
        
        
        
        
class CarSerializer_serchByname(serializers.ModelSerializer):
    class Meta:
        model = models.CarEmployer
        fields = ['matricule_car', 'id_type_car']

class EmployerSerializer_serchByname(serializers.ModelSerializer):
    cars = CarSerializer_serchByname(source='caremployer_set', many=True, read_only=True)  # Corrected field name

    class Meta:
        model = models.Employer
        fields = ['id_employer', 'cars']

        
        
class FullPersonSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()  # Serializer method field for User data
    employer = serializers.SerializerMethodField()  # Serializer method field for Employer data

    class Meta:
        model = models.Person
        fields = '__all__'  # Include all fields from Person model

    def get_user(self, obj):
        user_data = User.objects.get(pk=obj.pk)
        user_serializer = UserSerializer(instance=user_data)
        return user_serializer.data

    def get_employer(self, obj):
        try:
            employer_data = models.Employer.objects.get(id_employer=obj)
            employer_serializer = EmpoyerSerializer(instance=employer_data)
            return employer_serializer.data
        except models.Employer.DoesNotExist:
            return None




class UserSerializer____(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ['password']  # Exclude the password field for security reasons

class EmployerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Employer
        fields = '__all__'  # Include all fields from Employer model
class CarEmployerSerializer(serializers.ModelSerializer):
    id_type_car = serializers.PrimaryKeyRelatedField(queryset=models.CarType.objects.all())

    class Meta:
        model = models.CarEmployer
        fields = '__all__'  # Include all fields from CarEmployer model
class FullPersonSerializer(serializers.ModelSerializer):
    user = UserSerializer____(source='id_employer', read_only=True)  # Include related User data
    employer = EmployerSerializer(   read_only=True)  # Include related Employer data
    car_employers = CarEmployerSerializer(many=True, read_only=True)

    class Meta:
        model = models.Person
        fields = '__all__'  # Include all fields from Person model plus 'user' and 'employer'