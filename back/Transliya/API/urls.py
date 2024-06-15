from django.urls import re_path
from django.urls import path
from . import views

    re_path('signup', views.signup),
urlpatterns = [
    re_path('login', views.login),
    re_path('test_token', views.test_token),
    re_path('get_person', views.get_person),
    re_path('creat_employer', views.creat_employer),
    re_path('get_persons_services', views.get_persons_services),
    re_path('create_car', views.create_car),
]
