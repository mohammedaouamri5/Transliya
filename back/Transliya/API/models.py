from django.contrib.gis.db import models as gis_models
from django.db import models
from django.contrib.auth.hashers import make_password

from django.contrib.auth.models import User

class Person(User):
    is_deleted_p = models.BooleanField(default=False)
    phonenumberp = models.BigIntegerField(unique=True)
    def save(self, *args, **kwargs):
        if not self.pk:
            self.set_password(self.password)  # Hash the password when saving
        super().save(*args, **kwargs)



class Employer(models.Model):
    id_employer = models.OneToOneField(Person, on_delete=models.CASCADE, primary_key=True)
    driving_license = models.IntegerField(unique=True)
    ta9yim_employer = models.IntegerField(default=10)
    
    is_allowed = models.BooleanField(default=False)
    is_working = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)

class CarType(models.Model):
    id_car_type = models.AutoField(primary_key=True)
    name_car_type = models.CharField(max_length=255)
    Kerya_prix_car_type = models.FloatField()
    Tewsila_prix_car_type = models.FloatField()  # CALCULABEL

class Service(models.Model):
    id_service = models.AutoField(primary_key=True)
    name_service = models.CharField(max_length=255)

class CarEmployer(models.Model):
    id_employer = models.ForeignKey(Employer, on_delete=models.CASCADE)
    id_type_car = models.ForeignKey(CarType, on_delete=models.CASCADE)
    matricule_car = models.IntegerField(primary_key=True)
    is_deleted_CarEmployer = models.BooleanField(default=False)



class Tewsila(models.Model):
    id_Tewsila = models.AutoField(primary_key=True)
    
    t_started = models.TimeField()
    t_ended = models.TimeField() # ! <===
    
    from_location = gis_models.PointField(geography=True)
    to_location = gis_models.PointField(geography=True)
    
    matricule_car = models.ForeignKey(CarEmployer, on_delete=models.CASCADE)
    
    id_zaboun = models.ForeignKey(Person, on_delete=models.CASCADE)
    
    comment_Tewsila = models. TextField() # ! <===
    ta9yim_Tewsila = models.FloatField() # ! <===


class CarService(models.Model):
    id_car = models.ForeignKey(CarEmployer, on_delete=models.CASCADE)
    id_service = models.ForeignKey(Service, on_delete=models.CASCADE)

class Kerya(models.Model):
    id_Kerya = models.AutoField(primary_key=True)
    t_started = models.TimeField()
    t_ended = models.TimeField()
    id_car_employer = models.ForeignKey(CarEmployer, on_delete=models.CASCADE)
    id_zaboun = models.ForeignKey(Person, on_delete=models.CASCADE)
    comment_Kerya = models.TextField()
    ta9yim_Kerya = models.FloatField()


class Admin(models.Model):
    id_admin = models.OneToOneField(Person, on_delete=models.CASCADE, primary_key=True, related_name='admin_person')
    id_super = models.ForeignKey('self', null=True, blank=True, on_delete=models.SET_NULL, related_name='admin_super')


class Salahiyat(models.Model):
    id_salahiya = models.AutoField(primary_key=True)
    name_salahiya = models.CharField(max_length=255)

class AdminSalahiyat(models.Model):
    id_admin = models.ForeignKey(Admin, on_delete=models.CASCADE)
    id_salahiya = models.ForeignKey(Salahiyat, on_delete=models.CASCADE)


class GetPayed(models.Model):
    id_employer = models.ForeignKey(Employer, on_delete=models.CASCADE)
    prix = models.FloatField()



class NotificationType(models.Model):
    id_notification_type = models.AutoField(primary_key=True)
    name_notification_type = models.CharField(max_length=255)    

class Notify(models.Model): 
    id_notify = models.AutoField(primary_key=True)
    
    id_from = models.ForeignKey(
        Person, 
        on_delete=models.CASCADE, 
        related_name='notifications_sent'
    )
    id_to = models.ForeignKey(
        Person, 
        on_delete=models.CASCADE, 
        related_name='notifications_received'
    )
    
    id_notification_type = models.ForeignKey(
        NotificationType, 
        on_delete=models.CASCADE, 
        related_name='notification_types'
    )
    
    time = models.DateTimeField(auto_now_add=True)
    
    is_readed = models.BooleanField(default=False)