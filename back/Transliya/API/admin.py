# admin.py

from django.contrib import admin
from API import models 



class Person(admin.ModelAdmin):
    list_display = ('username', 'email', 'phonenumberp', 'is_deleted_p', 'first_name', 'last_name', 'is_staff', 'is_active', 'date_joined')
    search_fields = ('username', 'email', 'phonenumberp', 'first_name', 'last_name')

class Employer(admin.ModelAdmin):
    list_display = ('id_employer', 'driving_license', 'ta9yim_employer', 'is_allowed', 'is_working', 'created_at')
    search_fields = ('id_employer__username', 'driving_license')

class CarType(admin.ModelAdmin):
    list_display = ('id_car_type', 'name_car_type', 'Kerya_prix_car_type', 'Tewsila_prix_car_type')
    search_fields = ('name_car_type',)

class Service(admin.ModelAdmin):
    list_display = ('id_service', 'name_service')
    search_fields = ('name_service',)

class CarEmployer(admin.ModelAdmin):
    list_display = ('id_employer', 'id_type_car', 'matricule_car', 'is_deleted_CarEmployer')
    search_fields = ('id_employer__id_employer__username', 'id_type_car__name_car_type', 'matricule_car')

class Tewsila(admin.ModelAdmin):
    list_display = ('id_Tewsila', 't_started', 't_ended', 'from_lon' , 'from_lat' , 'to_lon' , 'to_lat' , 'distention' , 'matricule_car', 'id_zaboun', 'comment_Tewsila', 'ta9yim_Tewsila')
    search_fields = ('id_Tewsila', 'matricule_car__id_employer__id_employer__username', 'id_zaboun__username', 'comment_Tewsila')


class CarService(admin.ModelAdmin):
    list_display = ('id_car', 'id_service')
    search_fields = ('id_car__id_employer__id_employer__username', 'id_service__name_service')

class Kerya(admin.ModelAdmin):
    list_display = ('id_Kerya', 't_started', 't_ended', 'id_car_employer', 'id_zaboun', 'comment_Kerya', 'ta9yim_Kerya')
    search_fields = ('id_Kerya', 'id_car_employer__id_employer__id_employer__username', 'id_zaboun__username', 'comment_Kerya')

class Admin(admin.ModelAdmin):
    list_display = ('id_admin', 'id_super')
    search_fields = ('id_admin__username', 'id_super__id_admin__username')

class Salahiyat(admin.ModelAdmin):
    list_display = ('id_salahiya', 'name_salahiya')
    search_fields = ('name_salahiya',)

class AdminSalahiyat(admin.ModelAdmin):
    list_display = ('id_admin', 'id_salahiya')
    search_fields = ('id_admin__id_admin__username', 'id_salahiya__name_salahiya')

class GetPayed(admin.ModelAdmin):
    list_display = ('id_employer', 'prix')
    search_fields = ('id_employer__id_employer__username', 'prix')

class NotificationType(admin.ModelAdmin):
    list_display = ('id_notification_type', 'name_notification_type')
    search_fields = ('name_notification_type',)

class Notify(admin.ModelAdmin):
    list_display = ('id_notify', 'id_from', 'id_to', 'id_notification_type', 'time', 'is_readed')
    search_fields = ('id_from__username', 'id_to__username', 'id_notification_type__name_notification_type')

admin.site.register(models.Person, Person)
admin.site.register(models.Employer, Employer)
admin.site.register(models.CarType, CarType)
admin.site.register(models.Service, Service)
admin.site.register(models.CarEmployer, CarEmployer)
admin.site.register(models.Tewsila, Tewsila)
admin.site.register(models.CarService, CarService)
admin.site.register(models.Kerya, Kerya)
admin.site.register(models.GetPayed, GetPayed)
admin.site.register(models.NotificationType, NotificationType)
admin.site.register(models.Notify, Notify)

