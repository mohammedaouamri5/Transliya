from django.urls import include, re_path
from django.urls import path
from . import views


from django.contrib import admin



urlpatterns = [
    re_path('signup', views.signup),
    re_path('signemployer', views.signup_employer),
    re_path('login', views.login),
    re_path('test_token', views.test_token),
    re_path('test_end_point', views.test_end_point),
    
    re_path('get_person', views.get_person),
    re_path('get_my_notification', views.get_my_notification),
    
    re_path('mark_as_readed', views.mark_as_readed),
    
    re_path('create_car_type', views.create_car_type),
    re_path('create_caremployer', views.create_caremployer),
    re_path('create_service', views.create_service),
    re_path('create_notificationtype', views.create_notificationtype),
    re_path('create_notification', views.create_notification),
    
    re_path('create_tewsila', views.create_tawsila),
    re_path('add_ta9yym_to_tewsila', views.add_ta9yym_to_tewsila),
    

    re_path('create_kerya', views.create_kerya),
    re_path('add_ta9yym_to_kerya', views.add_ta9yym_to_kerya),
    
    
    re_path('get_all_car_type', views.get_all_car_type),
    
    
    re_path('search_by_name', views.search_by_name),
    


 


]
