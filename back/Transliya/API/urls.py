from django.urls import re_path
from django.urls import path
from . import views

urlpatterns = [
    re_path('signup', views.signup),
    re_path('login', views.login),
    re_path('test_token', views.test_token),
    
    re_path('get_person', views.get_person),
    re_path('get_persons_services', views.get_persons_services),
    
    
    re_path('create_employer', views.create_employer),
    re_path('create_car_type', views.create_car_type),
    re_path('create_caremployer', views.create_caremployer),
    re_path('create_service', views.create_service),
]
