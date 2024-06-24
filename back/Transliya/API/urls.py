from django.urls import include, re_path
from django.urls import path
from . import views
from . import views_pdf


from django.contrib import admin


urlpatterns = [
    re_path('signup', views.signup),
    re_path('signemployer', views.signup_employer),
    re_path('login', views.login),
    re_path('test_token', views.test_token),
    re_path('test_end_point', views.test_end_point),

    re_path('get_person', views.get_person),
    re_path('get_persons_services', views.get_persons_services),

    re_path('get_my_notification', views.get_my_notification),
    re_path('get_my_cars', views.get_my_cars),

    re_path('get_my_img', views.get_my_img),
    path('get-pay', views.get_pay),

    re_path('mark_as_readed', views.mark_as_readed),

    re_path('create_car_type', views.create_car_type),
    re_path('create_caremployer', views.create_caremployer),
    re_path('create_service', views.create_service),
    re_path('create_notificationtype', views.create_notificationtype),
    re_path('create_notification', views.create_notification),

      path('car/<str:matricule_car>/', views.get_car_by_matricule, name='get_car_by_matricule'),
    path('employer/<int:id_employer_id>/', views.get_employer_by_id, name='get_employer_by_id'),

    re_path('create_tewsila', views.create_tawsila),
    re_path('add_ta9yym_to_tewsila', views.add_ta9yym_to_tewsila),

  path('tawsila_pdf/', views_pdf.tawsila_pdf, name='tawsila_pdf'),
    path('kerya_pdf/', views_pdf.kerya_pdf, name='kerya_pdf'),

    re_path('create_kerya', views.create_kerya),
    re_path('add_ta9yym_to_kerya', views.add_ta9yym_to_kerya),


    re_path('get_all_car_type', views.get_all_car_type),


    re_path('search_by_name', views.search_by_name),
    re_path('add_to_is_abonner', views.add_to_is_abonner),
    re_path('is_person_in_abonner', views.is_person_in_abonner),



    path('car-employers/', views.CarEmployerCreateView.as_view(),
         name='car_employer_create'),
    
    
]
