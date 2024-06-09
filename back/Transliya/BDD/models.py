from django.contrib.gis.db import models as gis_models
from django.db import models
from django.contrib.auth.hashers import make_password

class Person(models.Model):
    id_p = models.AutoField(primary_key=True)
    asm_p = models.CharField(max_length=255)
    lo9ma_p = models.CharField(max_length=255)
    is_deleted_p = models.BooleanField(default=False)
    email_p = models.EmailField(max_length=255)
    phone_number_p = models.BigIntegerField()
    mot_de_pass_p = models.CharField(max_length=64)

    # def save(self, *args, **kwargs):
    #     if not self.pk:
    #         self.mot_de_pass_p = make_password(self.mot_de_pass_p)
    #     super().save(*args, **kwargs)


class Employer(models.Model):
    id_employer = models.OneToOneField(Person, on_delete=models.CASCADE, primary_key=True)
    driving_license = models.IntegerField(unique=True)
    # id_employer = models.AutoField()
    ta9yim_employer = models.FloatField()
    # is_working = models.BooleanField(default=True)
    is_allowed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)


class CarType(models.Model):
    id_car_type = models.AutoField(primary_key=True)
    name_car_type = models.CharField(max_length=255)
    Kerya_prix_car_type = models.FloatField()
    Tewsila_prix_car_type = models.FloatField()  # CALCULABEL


class Car5adam(models.Model):
    id_employer = models.ForeignKey(Employer, on_delete=models.CASCADE)
    id_type_car = models.ForeignKey(CarType, on_delete=models.CASCADE)
    matricule = models.IntegerField(primary_key=True)
    is_deleted = models.BooleanField(default=False)

class Tewsila(models.Model):
    id_Tewsila = models.AutoField(primary_key=True)
    t_started = models.TimeField()
    t_ended = models.TimeField()
    from_location = gis_models.PointField(geography=True)
    to_location = gis_models.PointField(geography=True)
    id_car_employer = models.ForeignKey(Car5adam, on_delete=models.CASCADE)
    id_zaboun = models.ForeignKey(Person, on_delete=models.CASCADE)
    comment_Tewsila = models.TextField()
    ta9yim_Tewsila = models.FloatField()


class Kerya(models.Model):
    id_Kerya = models.AutoField(primary_key=True)
    t_started = models.TimeField()
    t_ended = models.TimeField()
    id_car_employer = models.ForeignKey(Car5adam, on_delete=models.CASCADE)
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
